import React from "react";
import { Link, useParams } from "react-router-dom";

function SingleArticle({
  author,
  title,
  slug,
  description,
  taglist,
  createdAt,
}) {
  let params = useParams();

  return (
    <Link to={`/article/${slug}`}>
      <div className="border-solid border-2 border-gray-600 p-6">
        <div>
          <a href="#" className="inline-block">
            {taglist &&
              taglist.map((tag) => {
                return (
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-gray-500">
                    {tag}
                  </span>
                );
              })}
          </a>
        </div>
        <a href="#" className="block">
          <h3>{title}</h3>
          <p className="mt-3 text-base leading-6 text-gray-500">
            {description}
          </p>
        </a>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <img
                className="h-10 w-10 rounded-full"
                src={author.image}
                alt="image"
              ></img>
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm leading-5 font-medium text-gray-900">
              <a href="#">{author.username}</a>
            </p>
            <div className="flex text-sm leading-5 text-gray-500">
              <time>{createdAt}</time>
              <span className="mx-1">&middot;</span>
              <span>{Math.floor(Math.random() * 10)} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default SingleArticle;
