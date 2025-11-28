import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

// Upload nhiều ảnh lên Cloudinary
export const uploadImages = async (files, folder = "products") => {
  let formData = new FormData();
  for (const file of files) {
    formData.append("images", file);
  }
  formData.append("folder", folder);

  try {
    let res = await axios.post(`${apiURL}/api/upload/multiple`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
    return { error: "Upload failed" };
  }
};

export const getAllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/product/all-product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async ({
  pName,
  pDescription,
  pImages,
  pStatus,
  pCategory,
  pQuantity,
  pPrice,
  pOffer,
}) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/add-product`, {
      pName,
      pDescription,
      pImages,
      pStatus,
      pCategory,
      pQuantity,
      pPrice,
      pOffer,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/edit-product`, {
      pId: product.pId,
      pName: product.pName,
      pDescription: product.pDescription,
      pStatus: product.pStatus,
      pCategory: product.pCategory._id || product.pCategory,
      pQuantity: product.pQuantity,
      pPrice: product.pPrice,
      pOffer: product.pOffer,
      pImages: product.pImages,
      pImagesPublicIds: product.pImagesPublicIds,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (pId, pImagesPublicIds = []) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/delete-product`, { pId, pImagesPublicIds });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (catId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-category`, {
      catId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByPrice = async (price) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-price`, {
      price,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
