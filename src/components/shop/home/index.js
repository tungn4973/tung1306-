import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />
      <div className="container mx-auto px-4">
        {/* Category, Search & Filter Section */}
        <section className="my-6">
          <ProductCategory />
        </section>
        {/* Product Section */}
        <section className="my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SingleProduct />
        </section>
      </div>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
