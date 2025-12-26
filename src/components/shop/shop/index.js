import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Layout from "../layout";

const ShopComponent = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center text-gray-700">
        <h2 className="text-2xl font-semibold">Shop</h2>
        <p className="mt-4">Sản phẩm đã được gỡ bỏ. Vui lòng kiểm tra lại sau.</p>
      </div>
    </div>
  );
};

const Shop = () => {
  return <Layout children={<ShopComponent />} />;
};

export default Shop;
