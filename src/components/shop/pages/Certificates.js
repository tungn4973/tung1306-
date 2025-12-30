import React, { useState } from "react";

const Certificates = () => {
  // State để quản lý danh sách chứng chỉ
  const [certificates, setCertificates] = useState([
    { id: 1, title: "Chứng chỉ chăm sóc người cao tuổi", org: "Học viện Y" },
    { id: 2, title: "Chứng chỉ dinh dưỡng lâm sàng", org: "Trung tâm Dinh dưỡng" },
    { id: 3, title: "Chứng chỉ sơ cấp cứu", org: "Hội Chữ thập đỏ" },
  ]);
  
  // State để quản lý chứng chỉ đang được chỉnh sửa
  const [editingCertificate, setEditingCertificate] = useState(null);
  
  // State để quản lý form thêm chứng chỉ mới
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCertificate, setNewCertificate] = useState({ title: "", org: "" });
  
  // State để quản lý lỗi validation
  const [errors, setErrors] = useState({});

  // Bắt đầu chỉnh sửa một chứng chỉ
  const handleEdit = (certificate) => {
    setEditingCertificate({ ...certificate });
    setErrors({});
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingCertificate(null);
    setErrors({});
  };

  // Lưu thay đổi chứng chỉ
  const handleSaveEdit = () => {
    // Validation
    const newErrors = {};
    if (!editingCertificate.title.trim()) {
      newErrors.title = "Vui lòng nhập tên chứng chỉ";
    }
    if (!editingCertificate.org.trim()) {
      newErrors.org = "Vui lòng nhập tổ chức cấp";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Cập nhật chứng chỉ trong danh sách
    setCertificates(certificates.map(certificate => 
      certificate.id === editingCertificate.id ? editingCertificate : certificate
    ));
    setEditingCertificate(null);
  };

  // Xóa một chứng chỉ
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chứng chỉ này?")) {
      setCertificates(certificates.filter(certificate => certificate.id !== id));
    }
  };

  // Thay đổi giá trị trong form chỉnh sửa
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCertificate({
      ...editingCertificate,
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

  // Thay đổi giá trị trong form thêm mới
  const handleNewCertificateChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate({
      ...newCertificate,
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

  // Thêm chứng chỉ mới
  const handleAddCertificate = () => {
    // Validation
    const newErrors = {};
    if (!newCertificate.title.trim()) {
      newErrors.title = "Vui lòng nhập tên chứng chỉ";
    }
    if (!newCertificate.org.trim()) {
      newErrors.org = "Vui lòng nhập tổ chức cấp";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Thêm chứng chỉ mới vào danh sách
    const newId = Math.max(...certificates.map(c => c.id), 0) + 1;
    setCertificates([...certificates, { ...newCertificate, id: newId }]);
    setNewCertificate({ title: "", org: "" });
    setShowAddForm(false);
  };

  // Hủy thêm chứng chỉ mới
  const handleCancelAdd = () => {
    setNewCertificate({ title: "", org: "" });
    setShowAddForm(false);
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Chứng chỉ</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Thêm chứng chỉ mới
        </button>
      </div>

      {/* Form thêm chứng chỉ mới */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-medium mb-4">Thêm chứng chỉ mới</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên chứng chỉ
              </label>
              <input
                type="text"
                name="title"
                value={newCertificate.title}
                onChange={handleNewCertificateChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tổ chức cấp
              </label>
              <input
                type="text"
                name="org"
                value={newCertificate.org}
                onChange={handleNewCertificateChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.org ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.org && (
                <p className="mt-1 text-sm text-red-500">{errors.org}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddCertificate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Lưu
              </button>
              <button
                onClick={handleCancelAdd}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Danh sách chứng chỉ */}
      <div className="space-y-4">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="p-4 bg-white rounded shadow">
            {editingCertificate && editingCertificate.id === certificate.id ? (
              // Form chỉnh sửa
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên chứng chỉ
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingCertificate.title}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tổ chức cấp
                  </label>
                  <input
                    type="text"
                    name="org"
                    value={editingCertificate.org}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errors.org ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.org && (
                    <p className="mt-1 text-sm text-red-500">{errors.org}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Lưu
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              // Hiển thị thông tin
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{certificate.title}</h3>
                  <p className="text-sm text-gray-600">{certificate.org}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(certificate)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(certificate.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Xóa
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                    Xem
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;