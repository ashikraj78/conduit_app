import React, { useContext } from "react";
import { useParams, NavLink } from "react-router-dom";

import Dialog from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";

import useFetch from "../hooks/useFetch";
import { ROOT_URL } from "../utils/constants";

import Comments from "./Comments";
import AddComment from "./AddComments";
import UserContext from "./UserContext";
import EditArticle from "./EditArticle";

function SingleArticlePage() {
  let context = useContext(UserContext);
  let params = useParams();
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);
  let [response, error, setArticle] = useFetch(
    ROOT_URL + `articles/${params.slug}`
  );
  let [allComments, commentError, setComments] = useFetch(
    ROOT_URL + `articles/${params.slug}/comments`
  );
  if (response) {
    return (
      <React.Fragment>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 container">
          <div>
            <div className=" flex justify-between">
              <h2 className="font-bold mt-2 mb-2 text-2xl">
                {response.article.title || ""}
              </h2>

              {response.article.author.username === context.user.username ? (
                <React.Fragment>
                  <button
                    onClick={open}
                    className="py-0 px-4 m-0 text-sm  font-medium rounded-md text-white bg-red-600 hover:bg-red-500"
                  >
                    Edit Article
                  </button>
                  <Dialog isOpen={showDialog} onDismiss={close}>
                    <button className="close-button" onClick={close}>
                      <VisuallyHidden>Close</VisuallyHidden>
                      <span aria-hidden>×</span>
                    </button>
                    <EditArticle setArticle={setArticle} close={close} />
                  </Dialog>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>
            <hr />
            <p>Tag: {response.article.tagList.join(",")}</p>
            <h4>{response.article.description}</h4>
            <p>{response.article.body}</p>
          </div>

          <AddComment setComments={setComments} allComments={allComments} />
          <Comments res={allComments} error={commentError} />
        </div>
      </React.Fragment>
    );
  }
  if (error) {
    return <h2>something went wrong</h2>;
  }
  return <h2>Loading ...</h2>;
}

export default SingleArticlePage;
