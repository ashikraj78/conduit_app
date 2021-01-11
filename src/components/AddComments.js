import React, { useContext } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { ROOT_URL } from "../utils/constants";
import UserContext from "./UserContext";

function validator(values) {
  const errors = {};
  if (!values.comment) {
    errors.comment = "*This field is required";
  }
  return errors;
}

function AddComment({ setComments, allComments }) {
  let context = useContext(UserContext);
  let params = useParams();
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validator,
    onSubmit: (values, actions) => {
      fetch(ROOT_URL + `articles/${params.slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${context.user.token}`,
        },
        body: JSON.stringify({
          comment: {
            body: values.comment,
          },
        }),
      })
        .then((res) => res.json())
        .then(({ comment }) => {
          actions.setSubmitting(false);
          setComments({ comments: [comment, ...allComments.comments] });
          actions.setValues({ comment: "" });
        });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="comment"
        value={values.comment}
        onChange={handleChange}
        placeholder="enter the comment"
        className="w-full h-56 border-solid border-2 border-gray-600 p-6"
      ></textarea>
      <small className="pb-10 text-red-700">{errors.comment}</small>

      <div className="mt-6">
        <button
          type="submit"
          className={`py-2 px-4  text-sm  font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 ${
            isSubmitting && "cursor-not-allowed"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Comment" : "Add Comment"}
        </button>
      </div>
    </form>
  );
}
export default AddComment;
