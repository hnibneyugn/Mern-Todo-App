import { useEffect, useState } from "react";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md"
import { FaSackDollar, FaTrash } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import { IoClipboardOutline } from "react-icons/io5"
import { MdOutlineDone } from "react-icons/md"
function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  // Add a todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  //
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get("/api/todos");
      setTodos(res.data);
    };

    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  }
  
  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`,{
        text: editedText
      });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)))
      setEditingTodo(null)
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.log("Erroe deleting todo:", error);
    }
  } 

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id)
      const response = await axios.patch(`/api/todos/${id}`, {
        completed: !todo.completed
      })
      setTodos(todo.map((t) => t._id === id ? response.data : t))
    } catch(error) {
      console.log("Error toggle todo:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        {/* Card chính */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden mb-4">
          {/* Header */}
          <div className="bg-slate-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Task Manager
            </h1>
          </div>

          {/* Add Todo */}
          <div className="p-6">
            <form onSubmit={addTodo} 
              className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Add Task
              </button>
            </form>
            <div className="text-white">
              {todos.length === 0 ? (
                <div></div>
              ) : (
                <div>
                  {todos.map((todo) => (
                    <div key={todo._id}>
                      {editingTodo === todo._id ? (
                        <div>
                          <input className="flex-1 p-3 border rounded-lg
                            border-gray-200 outline-none focus:ring-2
                            forcus:ring-blue-300 text-white shadow-inner"
                            type="text" value = {editedText} 
                            onChange={(e) => setEditedText(e.target.value)}
                          />
                          <div className="flex gap x-2">
                              <button onClick={() => saveEdit(todo._id)}
                              className="px-4- py-2 bg-green-500
                              text-white rounded-lg hover:bg-green-600 cursor-pointer">
                              <MdOutlineDone/>
                            </button>
                            <button onClick={() => setEditingTodo(todo)}
                              className="px-4- py-2 bg-red-500
                              text-white rounded-lg hover:bg-red-600 cursor-pointer">
                              <IoClose/>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex-items-center
                        justify-between">
                          <div className="flex items-center gap-x-4 overflow-hidden">
                            <button onClick={() => toggleTodo(todo._id)}
                              className={`flex-shrink-0 -h-6 w-6 border rounded-full
                              flex items-center justify-center ${todo.completed
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 hover: border-blue-400"}`}>
                              {!todo.completed && <MdOutlineDone/>}
                            </button>
                          </div>
                            <span className="text-gray font-medium truncate">{todo.text}</span>
                            <div className="flex gap-x-2">
                              <button className="p-2 text-blue-500
                                hover:text-blue-700 rounded-lg"
                                onClick={() => startEditing(todo)}>
                              <MdModeEditOutline/>
                              </button>
                              <button onClick={() => deleteTodo(todo._id)}
                                className="p-2 text-red-500
                                hover:text-red-700 rounded-lg">
                                <FaTrash/>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
