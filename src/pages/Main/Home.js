import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { toggle, toggleBrands } from "../../features/filter/filterSlice.js";
import { getProducts } from "../../features/product/productSlice.js";
const apiKey = process.env.URI;
const Home = () => {
  const filters = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const { brands, stock } = filters;
  // console.log("🚀 ~ file: Home.js:11 ~ Home ~ filters:", filters);
  const { products, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const activeClass = "text-white bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    content = (
      <div className="text-center flex flex-col justify-center align-middle justify-items-center">
        Server is Loading the data <br />{" "}
        <h1 className="text-red-700 font-extrabold text-7xl">Loading...</h1>
      </div>
    );
  }
// console.log(products);
  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }
  if (products.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })

      .map((product) => <ProductCard key={product.model} product={product} />);
  }
  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          onClick={() => dispatch(toggle())}
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrands("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          }`}
        >
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrands("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
