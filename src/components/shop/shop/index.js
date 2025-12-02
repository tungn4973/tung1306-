import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../layout";
import { getAllProduct } from "../../admin/products/FetchApi";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { isWishReq, unWishReq, isWish } from "../home/Mixins";

const ShopComponent = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productRes, categoryRes] = await Promise.all([
        getAllProduct(),
        getAllCategory(),
      ]);
      if (productRes && productRes.Products) {
        setProducts(productRes.Products);
      }
      if (categoryRes && categoryRes.Categories) {
        setCategories(categoryRes.Categories);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Filter và sort products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.pCategory && p.pCategory._id === selectedCategory
      );
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.pPrice - b.pPrice);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.pPrice - a.pPrice);
    } else if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Tất cả sản phẩm</h1>

        {/* Filter & Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border px-4 py-2 rounded focus:outline-none"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.cName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-4 py-2 rounded focus:outline-none"
            >
              <option value="">Sắp xếp</option>
              <option value="newest">Mới nhất</option>
              <option value="price-low">Giá thấp đến cao</option>
              <option value="price-high">Giá cao đến thấp</option>
            </select>
            <span className="text-gray-600 text-sm">
              {filteredProducts.length} sản phẩm
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <img
                  onClick={() => history.push(`/products/${item._id}`)}
                  className="w-full h-48 md:h-56 lg:h-64 object-cover object-center cursor-pointer"
                  src={item.pImages[0]}
                  alt={item.pName}
                />
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-700 font-medium truncate">
                      {item.pName}
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg
                        className="w-4 h-4 fill-current text-yellow-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-gray-600 text-sm">
                        {item.pRatingsReviews.length}
                      </span>
                    </div>
                  </div>
                  <div className="text-red-500 font-bold mt-1">
                    ${item.pPrice}.00
                  </div>
                </div>
                {/* Wishlist */}
                <div className="absolute top-2 right-2">
                  <svg
                    onClick={(e) => isWishReq(e, item._id, setWlist)}
                    className={`${
                      isWish(item._id, wList) && "hidden"
                    } w-6 h-6 cursor-pointer text-yellow-700`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <svg
                    onClick={(e) => unWishReq(e, item._id, setWlist)}
                    className={`${
                      !isWish(item._id, wList) && "hidden"
                    } w-6 h-6 cursor-pointer text-yellow-700`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              Không tìm thấy sản phẩm
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const Shop = () => {
  return <Layout children={<ShopComponent />} />;
};

export default Shop;
