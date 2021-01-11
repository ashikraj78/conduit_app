import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { ROOT_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import UserContext from "./UserContext";

function Comments({ res, error }) {
  let context = useContext(UserContext);

  if (res) {
    return (
      <React.Fragment>
        <h1 className="font-bold mt-2 mb-2 text-2xl">All comments</h1>
        <ul>
          {res.comments.map(({ id, author, body }) => (
            <li key={id}>
              <div className="border-dashed border-2 border-gray-600 mt-8 p-6 flex justify-between">
                <p>{body}</p>
                {context.user.username === author.username ? (
                  <button
                    type="submit"
                    class="group relative  flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
  if (error) {
    return <h2>something went wrong</h2>;
  }
  return <h2>Loading ...</h2>;
}
export default Comments;
