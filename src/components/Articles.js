import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { ROOT_URL } from "../utils/constants";
import SingleArticle from "./SingleArticle";
import { NavLink } from "react-router-dom";

function Articles() {
  let [response, error] = useFetch(ROOT_URL + "articles");

  if (response) {
    return (
      <div className="bg-white pt-2 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <NavLink to="/article" className="ml-20 mb-10">
          <button className="py-2 px-4  text-sm  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500">
            Add Article
          </button>
        </NavLink>
        <div className="relative max-w-6xl mx-auto lg:max-w-7xl">
          <div>
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Recent Article
            </h2>
            <p className="mt-3 text-xl leading-7 text-gray-500 sm:mt-4">
              Articles are words that define a noun as specific or unspecific.
              Consider the following examples: After the long day, the cup of
              tea tasted particularly good. By using the article the, we've
              shown that it was one specific day that was long and one specific
              cup of tea that tasted good.
            </p>
          </div>
          <div className="mt-12 grid gap-16 border-t-2 border-gray-100 pt-12 lg:grid-cols-3 lg:col-gap-5 lg:row-gap-12">
            {response &&
              response.articles.map((article) => {
                return <SingleArticle {...article} />;
              })}
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
export default Articles;
