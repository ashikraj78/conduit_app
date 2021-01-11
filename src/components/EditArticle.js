import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { ROOT_URL } from "../utils/constants";
import UserContext from "./UserContext";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function validator(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "*This field is required";
  }
  if (!values.description) {
    errors.description = "*This field is required";
  }
  if (!values.body) {
    errors.body = "*This field is required";
  }
  if (!values.tagList) {
    errors.tagList = "*This field is required";
  }

  return errors;
}

function EditArticle(props) {
  let context = useContext(UserContext);
  let history = useHistory();
  let params = useParams();

  let [articlesRes, error] = useFetch(ROOT_URL + `articles/${params.slug}`);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      title: articlesRes && articlesRes.article.title,
      description: articlesRes && articlesRes.article.description,
      body: articlesRes && articlesRes.article.body,
      tagList: articlesRes && articlesRes.article.tagList,
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    validate: validator,
    onSubmit: (values) => {
      fetch(ROOT_URL + `articles/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${context.user.token}`,
        },
        body: JSON.stringify({
          article: {
            title: values.title,
            description: values.description,
            body: values.body,
            tagList: values.tagList,
          },
        }),
      })
        .then((res) => res.json())
        .then(({ article }) => {
          // history.push(`article/${params.slug}`);
          props.setArticle({ article });
          props.close();
        });
    },
  });

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 editmodal ">
      <div className="max-w-md w-full bg-white p-10">
        <div>
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Edit Article
          </h2>
        </div>

        <form className="mt-8" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm">
            <div>
              <input
                aria-label="Title"
                name="title"
                onChange={handleChange}
                value={values.title}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 "
                placeholder="Title"
              />
              <small className="pb-10 text-red-700">{errors.title}</small>
            </div>
            <div className="-mt-px">
              <textarea
                aria-label="Description"
                name="description"
                type="text"
                onChange={handleChange}
                value={values.description}
                className="appearance-none rounded-none relative block w-full h-56 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 mt-2"
                placeholder="Description"
              />
              <small className="pb-10 text-red-700">{errors.description}</small>
            </div>
            <div className="-mt-px">
              <input
                aria-label="Body"
                name="body"
                type="text"
                onChange={handleChange}
                value={values.body}
                className="appearance-none rounded-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 mt-2"
                placeholder="Body"
              />
              <small className="pb-10 text-red-700">{errors.body}</small>
            </div>
            <div className="-mt-px">
              <input
                aria-label="Tag List"
                name="tagList"
                type="text"
                onChange={handleChange}
                value={values.tagList}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 mt-2"
                placeholder="Tag List"
              />
              <small className="pb-2 text-red-700">{errors.tagList}</small>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditArticle;
