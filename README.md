# 📝 Modern Todo Manager (MERN Stack)

Ứng dụng quản lý công việc (Task Management) hiện đại được xây dựng trên nền tảng **Fullstack MERN**. Ứng dụng hỗ trợ ghi nhớ, phân loại công việc và theo dõi tiến độ hoàn thành với giao diện đẹp mắt và tối ưu.

---

## ✨ Tính năng nổi bật

### 🎨 Frontend (React + Vite + Tailwind CSS)
- **Giao diện hiện đại**: Sử dụng **Tailwind CSS v4** cho giao diện chuyên nghiệp.
- **Hiệu ứng mượt mà**: Tích hợp **React Icons** giúp các thao tác trực quan hơn.
- **Quản lý trạng thái**: Sử dụng React Hooks để xử lý logic thêm/xóa/sửa công việc.
- **Tối ưu hiệu năng**: Xây dựng dựa trên **Vite** giúp khởi động và tải lại cực nhanh.

### ⚙️ Backend (Node.js + Express + MongoDB)
- **RESTful API**: Hệ thống API đầy đủ các thao tác CRUD (Thêm, Xem, Cập nhật, Xóa).
- **MongoDB Atlas**: Kết nối và quản lý dữ liệu linh hoạt thông qua **Mongoose**.
- **Production Ready**: Server Express được cấu hình để phục vụ cả Frontend sau khi build.

---

## 🛠 Công nghệ sử dụng

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,mongodb,axios" />
</p>

---

## 📁 Cấu trúc thư mục

Dưới đây là cấu trúc thực tế của dự án:

```text
.
├── backend/
│   ├── config/database.js     # Cấu hình kết nối MongoDB
│   ├── models/todo.model.js   # Schema dữ liệu Todo
│   ├── routes/todo.route.js   # Định nghĩa các API endpoints
│   └── server.js              # File khởi chạy server chính
├── frontend/
│   ├── src/App.jsx            # Giao diện và logic chính của React
│   ├── vite.config.js         # Cấu hình build cho Frontend
│   └── package.json           # Dependencies của Frontend
├── .env                       # Biến môi trường (PORT, MONGO_URI...)
├── package.json               # Scripts khởi chạy toàn dự án

```
---

## 🚀 Hướng dẫn cài đặt và chạy

### 1️⃣ Yêu cầu hệ thống
- Node.js (**khuyên dùng v18+**)
- Tài khoản **MongoDB Atlas** để lấy chuỗi kết nối

---

### 2️⃣ Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend/`:

```env
PORT=5001
MONGO_URI=YOUR_CONNECTION_STRING
NODE_ENV=production
```

---

### 3️⃣ Cài đặt Frontend

```bash
cd frontend
npm install
```

---

### 4️⃣ Khởi chạy ứng dụng

Mở **2 terminal riêng biệt**:

#### Terminal 1 – Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 – Frontend
```bash
cd frontend
npm run dev
```

🌐 Truy cập ứng dụng tại:
```
http://localhost:5173
```

---

## 🛣 Danh sách API (Endpoints)

| Phương thức | Đường dẫn | Mô tả |
| :--- | :--- | :--- |
| GET | `/api/todos` | Lấy danh sách tất cả công việc |
| POST | `/api/todos` | Tạo công việc mới |
| PUT | `/api/todos/:id` | Cập nhật trạng thái hoặc nội dung |
| DELETE | `/api/todos/:id` | Xóa công việc |

---

<p align="center">Giấy phép: Dự án này được phát hành dưới Giấy phép MIT.</p>
<p align="center"><em>Dự án được xây dựng nhằm phục vụ mục đích học tập</em></p>
