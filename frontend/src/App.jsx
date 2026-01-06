import { useEffect, useState } from "react";
import axios from "axios";
import { MdModeEditOutline, MdOutlineDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";


function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");

  // ===== FETCH =====
  useEffect(() => {
    const fetchTodos = async () => {
    const res = await axios.get("/api/todos");
    setTodos(res.data);
  };
    fetchTodos();
  }, []);


  // ===== ADD =====
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const res = await axios.post("/api/todos", { text: newTodo });
    setTodos((prev) => [...prev, res.data]);
    setNewTodo("");
  };

  // ===== TOGGLE (FIX BUG) =====
  const toggleTodo = async (id) => {
    try {
      const current = todos.find((t) => t._id === id);
      const res = await axios.patch(`/api/todos/${id}`, {
        completed: !current.completed,
      });

      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (error) {
      console.log("Error toggle todo:", error);
    }
  };

  // ===== DELETE =====
  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  // ===== EDIT =====
  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    if (!editedText.trim()) return;

    const res = await axios.patch(`/api/todos/${id}`, {
      text: editedText,
    });

    setTodos((prev) =>
      prev.map((t) => (t._id === id ? res.data : t))
    );
    setEditingTodo(null);
    setEditedText("");
  };

  // ===== STATS =====
  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        {/* CARD */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* HEADER */}
          <div className="bg-slate-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white text-center">
              Task Manager
            </h1>
          </div>

          {/* CONTENT */}
          <div className="p-6">
            {/* ADD TODO */}
            <form onSubmit={addTodo} className="flex gap-2 mb-6">
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

            {/* TODO LIST */}
            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <button
                      onClick={() => toggleTodo(todo._id)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center
                      ${
                        todo.completed
                          ? "bg-green-500 border-green-500"
                          : "border-gray-400 hover:border-blue-400"
                      }`}
                    >
                      {todo.completed && (
                        <MdOutlineDone className="text-white text-sm" />
                      )}
                    </button>

                    {editingTodo === todo._id ? (
                      <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="bg-gray-700 text-white px-3 py-1 rounded-lg w-full outline-none"
                      />
                    ) : (
                      <span
                        className={`truncate ${
                          todo.completed
                            ? "line-through text-gray-500"
                            : "text-gray-200"
                        }`}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  {/* RIGHT */}
                  <div className="flex gap-2 ml-2">
                    {editingTodo === todo._id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="p-2 bg-green-500 rounded-lg hover:bg-green-600"
                        >
                          <MdOutlineDone className="text-white" />
                        </button>
                        <button
                          onClick={() => setEditingTodo(null)}
                          className="p-2 bg-red-500 rounded-lg hover:bg-red-600"
                        >
                          <IoClose className="text-white" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo)}
                          className="p-2 text-blue-400 hover:text-blue-600"
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {todos.length === 0 && (
                <p className="text-center text-gray-500 py-6">
                  No tasks yet
                </p>
              )}
            </div>

            {/* STATS */}
            {totalTasks > 0 && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">
                      {totalTasks}
                    </p>
                    <p className="text-xs text-gray-400">Total</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400">
                      {completedTasks}
                    </p>
                    <p className="text-xs text-gray-400">Completed</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-400">
                      {progress}%
                    </p>
                    <p className="text-xs text-gray-400">Progress</p>
                  </div>
                </div>

                <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
