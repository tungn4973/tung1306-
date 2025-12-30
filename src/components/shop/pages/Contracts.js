import React, { useState } from "react";

const Contracts = () => {
  // State để quản lý danh sách hợp đồng
  const [contracts, setContracts] = useState([
    { id: 1, title: "Hợp đồng chăm sóc dài hạn", period: "1 năm" },
    { id: 2, title: "Hợp đồng chăm sóc ngắn hạn", period: "1 tháng" },
    { id: 3, title: "Hợp đồng dịch vụ y tế", period: "6 tháng" },
  ]);
  
  // State để quản lý hợp đồng đang được chỉnh sửa
  const [editingContract, setEditingContract] = useState(null);
  
  // State để quản lý form thêm hợp đồng mới
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContract, setNewContract] = useState({ title: "", period: "" });
  
  // State để quản lý lỗi validation
  const [errors, setErrors] = useState({});

  // Bắt đầu chỉnh sửa một hợp đồng
  const handleEdit = (contract) => {
    setEditingContract({ ...contract });
    setErrors({});
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingContract(null);
    setErrors({});
  };

  // Lưu thay đổi hợp đồng
  const handleSaveEdit = () => {
    // Validation
    const newErrors = {};
    if (!editingContract.title.trim()) {
      newErrors.title = "Vui lòng nhập tên hợp đồng";
    }
    if (!editingContract.period.trim()) {
      newErrors.period = "Vui lòng nhập thời hạn hợp đồng";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Cập nhật hợp đồng trong danh sách
    setContracts(contracts.map(contract => 
      contract.id === editingContract.id ? editingContract : contract
    ));
    setEditingContract(null);
  };

  // Xóa một hợp đồng
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hợp đồng này?")) {
      setContracts(contracts.filter(contract => contract.id !== id));
    }
  };

  // Thay đổi giá trị trong form chỉnh sửa
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingContract({
      ...editingContract,
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
  const handleNewContractChange = (e) => {
    const { name, value } = e.target;
    setNewContract({
      ...newContract,
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

  // Thêm hợp đồng mới
  const handleAddContract = () => {
    // Validation
    const newErrors = {};
    if (!newContract.title.trim()) {
      newErrors.title = "Vui lòng nhập tên hợp đồng";
    }
    if (!newContract.period.trim()) {
      newErrors.period = "Vui lòng nhập thời hạn hợp đồng";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Thêm hợp đồng mới vào danh sách
    const newId = Math.max(...contracts.map(c => c.id), 0) + 1;
    setContracts([...contracts, { ...newContract, id: newId }]);
    setNewContract({ title: "", period: "" });
    setShowAddForm(false);
  };

  // Hủy thêm hợp đồng mới
  const handleCancelAdd = () => {
    setNewContract({ title: "", period: "" });
    setShowAddForm(false);
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Hợp đồng</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Thêm hợp đồng mới
        </button>
      </div>

      {/* Form thêm hợp đồng mới */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-medium mb-4">Thêm hợp đồng mới</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên hợp đồng
              </label>
              <input
                type="text"
                name="title"
                value={newContract.title}
                onChange={handleNewContractChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời hạn
              </label>
              <input
                type="text"
                name="period"
                value={newContract.period}
                onChange={handleNewContractChange}
                placeholder="Ví dụ: 1 tháng, 6 tháng, 1 năm"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.period ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.period && (
                <p className="mt-1 text-sm text-red-500">{errors.period}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddContract}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
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

      {/* Danh sách hợp đồng */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contracts.map((contract) => (
          <div key={contract.id} className="p-4 bg-white rounded shadow">
            {editingContract && editingContract.id === contract.id ? (
              // Form chỉnh sửa
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên hợp đồng
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingContract.title}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời hạn
                  </label>
                  <input
                    type="text"
                    name="period"
                    value={editingContract.period}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.period ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.period && (
                    <p className="mt-1 text-sm text-red-500">{errors.period}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
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
              <>
                <h3 className="text-lg font-medium mb-2">{contract.title}</h3>
                <p className="text-sm text-gray-600 mb-4">Thời hạn: {contract.period}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(contract)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(contract.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracts;