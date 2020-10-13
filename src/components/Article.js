import React from "react";

function Article({ author, title, slug, description, taglist, createdAt }) {
  console.log("taglist");
  return (
    <div>
      <div>
        <a href="#" className="inline-block">
          {taglist.map((tag) => {
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium">
              {tag}
            </span>;
          })}
        </a>
      </div>
      <a href="#" className="block">
        <h3>{title}</h3>
        <p className="mt-3 text-base leading-6 text-gray-500">{description}</p>
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
      </div>
      <div className="ml-3">
        <p className="text-sm leading-5 font-medium text-gray-900">
          <a href="#">{author.username}</a>
        </p>
        <div className="flex text-sm leading-5 text-gray-500">
          <time datetime="2020-03-10">{createdAt}</time>
          <span className="mx-1">&middot;</span>
          <span>{Math.floor(Math.random() * 10)}</span>
        </div>
      </div>
    </div>
  );
}
export default Article;
