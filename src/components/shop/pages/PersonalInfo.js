import React, { useState } from "react";

const PersonalInfo = () => {
  // State để quản lý thông tin người dùng
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123 456 789",
    address: "Hà Nội, Việt Nam",
  });
  
  // State để quản lý thông tin tạm thời khi chỉnh sửa
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  // State để quản lý chế độ xem/chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  
  // State để quản lý lỗi validation
  const [errors, setErrors] = useState({});

  // Bắt đầu chế độ chỉnh sửa
  const handleEdit = () => {
    setEditUser({ ...user });
    setIsEditing(true);
    setErrors({});
  };

  // Hủy chỉnh sửa
  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  // Lưu thông tin sau khi chỉnh sửa
  const handleSave = () => {
    // Validation đơn giản
    const newErrors = {};
    if (!editUser.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }
    if (!editUser.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!editUser.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    if (!editUser.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Cập nhật thông tin người dùng
    setUser({ ...editUser });
    setIsEditing(false);
  };

  // Xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({
      ...editUser,
      [name]: value,
    });
    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Thông tin cá nhân</h1>
      <div className="bg-white p-6 rounded shadow w-full">
        {isEditing ? (
          // Form chỉnh sửa
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={editUser.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={editUser.phone}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={editUser.address}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Lưu
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          // Chế độ xem thông tin
          <div>
            <p className="mb-3">
              <strong>Họ và tên:</strong> {user.name}
            </p>
            <p className="mb-3">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-3">
              <strong>Điện thoại:</strong> {user.phone}
            </p>
            <p className="mb-3">
              <strong>Địa chỉ:</strong> {user.address}
            </p>
            <div className="mt-4">
              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;