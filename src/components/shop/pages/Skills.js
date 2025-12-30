import React, { useState } from "react";

const Skills = () => {
  // State để quản lý danh sách kỹ năng
  const [skills, setSkills] = useState([
    { id: 1, title: "Kỹ năng hồi sức", desc: "Mô tả tóm tắt về kỹ năng hồi sức" },
    { id: 2, title: "Kỹ năng dinh dưỡng", desc: "Mô tả tóm tắt về dinh dưỡng cho người cao tuổi" },
    { id: 3, title: "Kỹ năng giao tiếp", desc: "Mô tả tóm tắt về giao tiếp và chăm sóc tinh thần" },
  ]);
  
  // State để quản lý kỹ năng đang được chỉnh sửa
  const [editingSkill, setEditingSkill] = useState(null);
  
  // State để quản lý form thêm kỹ năng mới
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ title: "", desc: "" });
  
  // State để quản lý lỗi validation
  const [errors, setErrors] = useState({});

  // Bắt đầu chỉnh sửa một kỹ năng
  const handleEdit = (skill) => {
    setEditingSkill({ ...skill });
    setErrors({});
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingSkill(null);
    setErrors({});
  };

  // Lưu thay đổi kỹ năng
  const handleSaveEdit = () => {
    // Validation
    const newErrors = {};
    if (!editingSkill.title.trim()) {
      newErrors.title = "Vui lòng nhập tên kỹ năng";
    }
    if (!editingSkill.desc.trim()) {
      newErrors.desc = "Vui lòng nhập mô tả kỹ năng";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Cập nhật kỹ năng trong danh sách
    setSkills(skills.map(skill => 
      skill.id === editingSkill.id ? editingSkill : skill
    ));
    setEditingSkill(null);
  };

  // Xóa một kỹ năng
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kỹ năng này?")) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  // Thay đổi giá trị trong form chỉnh sửa
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingSkill({
      ...editingSkill,
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
  const handleNewSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({
      ...newSkill,
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

  // Thêm kỹ năng mới
  const handleAddSkill = () => {
    // Validation
    const newErrors = {};
    if (!newSkill.title.trim()) {
      newErrors.title = "Vui lòng nhập tên kỹ năng";
    }
    if (!newSkill.desc.trim()) {
      newErrors.desc = "Vui lòng nhập mô tả kỹ năng";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Thêm kỹ năng mới vào danh sách
    const newId = Math.max(...skills.map(s => s.id), 0) + 1;
    setSkills([...skills, { ...newSkill, id: newId }]);
    setNewSkill({ title: "", desc: "" });
    setShowAddForm(false);
  };

  // Hủy thêm kỹ năng mới
  const handleCancelAdd = () => {
    setNewSkill({ title: "", desc: "" });
    setShowAddForm(false);
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Kỹ năng</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Thêm kỹ năng mới
        </button>
      </div>

      {/* Form thêm kỹ năng mới */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-medium mb-4">Thêm kỹ năng mới</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên kỹ năng
              </label>
              <input
                type="text"
                name="title"
                value={newSkill.title}
                onChange={handleNewSkillChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <textarea
                name="desc"
                value={newSkill.desc}
                onChange={handleNewSkillChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.desc ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.desc && (
                <p className="mt-1 text-sm text-red-500">{errors.desc}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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

      {/* Danh sách kỹ năng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 bg-white rounded shadow">
            {editingSkill && editingSkill.id === skill.id ? (
              // Form chỉnh sửa
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên kỹ năng
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editingSkill.title}
                    onChange={handleEditChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    name="desc"
                    value={editingSkill.desc}
                    onChange={handleEditChange}
                    rows="3"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.desc ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.desc && (
                    <p className="mt-1 text-sm text-red-500">{errors.desc}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
                <h3 className="text-lg font-medium mb-2">{skill.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{skill.desc}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
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

export default Skills;