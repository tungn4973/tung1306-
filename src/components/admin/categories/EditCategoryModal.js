import React, { Fragment, useContext, useState, useEffect } from "react";
import { CategoryContext } from "./index";
import { editCategory, getAllCategory, uploadImage } from "./FetchApi";

const EditCategoryModal = () => {
  const { data, dispatch } = useContext(CategoryContext);

  const [fData, setFdata] = useState({
    cId: "",
    cName: "",
    cDescription: "",
    cStatus: "",
    cImage: "",
    cImageFile: null,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (data.editCategoryModal.modal && data.editCategoryModal.category) {
      const cat = data.editCategoryModal.category;
      setFdata({
        cId: cat._id,
        cName: cat.cName,
        cDescription: cat.cDescription,
        cStatus: cat.cStatus,
        cImage: cat.cImage,
        cImageFile: null,
      });
    }
  }, [data.editCategoryModal.modal, data.editCategoryModal.category]);

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });

    try {
      let newImageUrl = null;

      if (fData.cImageFile) {
        setUploading(true);
        const uploadRes = await uploadImage(fData.cImageFile, "categories");
        setUploading(false);

        if (uploadRes.error) {
          dispatch({ type: "loading", payload: false });
          return;
        }
        newImageUrl = uploadRes.url;
      }

      let edit = await editCategory({
        cId: fData.cId,
        cName: fData.cName,
        cDescription: fData.cDescription,
        cStatus: fData.cStatus,
        cImage: newImageUrl,
      });

      if (edit.error) {
        console.log(edit.error);
        dispatch({ type: "loading", payload: false });
      } else if (edit.success) {
        dispatch({ type: "editCategoryModalClose" });
        setTimeout(() => {
          fetchData();
          dispatch({ type: "loading", payload: false });
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "loading", payload: false });
    }
  };

  return (
    <Fragment>
      <div
        onClick={() => dispatch({ type: "editCategoryModalClose" })}
        className={`${
          data.editCategoryModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      <div
        className={`${
          data.editCategoryModal.modal ? "" : "hidden"
        } fixed inset-0 m-4 flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 overflow-y-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Category
            </span>
            <span
              style={{ background: "#303031" }}
              onClick={() => dispatch({ type: "editCategoryModalClose" })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label>Category Name</label>
            <input
              value={fData.cName}
              onChange={(e) => setFdata({ ...fData, cName: e.target.value })}
              className="px-4 py-2 border focus:outline-none"
              type="text"
            />
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label>Category Description</label>
            <textarea
              value={fData.cDescription}
              onChange={(e) => setFdata({ ...fData, cDescription: e.target.value })}
              className="px-4 py-2 border focus:outline-none"
              cols={5}
              rows={5}
            />
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label>Category Image</label>
            {fData.cImage && (
              <img
                src={fData.cImage}
                alt="Current"
                className="w-20 h-20 object-cover mb-2"
              />
            )}
            <input
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setFdata({ ...fData, cImageFile: e.target.files[0] })}
              className="px-4 py-2 border focus:outline-none"
              type="file"
            />
            {uploading && <span className="text-blue-500 text-sm">Uploading...</span>}
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <label>Category Status</label>
            <select
              value={fData.cStatus}
              onChange={(e) => setFdata({ ...fData, cStatus: e.target.value })}
              className="px-4 py-2 border focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6">
            <button
              style={{ background: "#303031" }}
              onClick={() => submitForm()}
              className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
            >
              Update category
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditCategoryModal;
