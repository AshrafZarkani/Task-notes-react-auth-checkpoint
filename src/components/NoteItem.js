import React from "react";
import { Link } from "react-router-dom";

const NoteItem = ({ user, title, topic, _id }) => {
  return (
    <div className="bg-gray-800 rounded-md shadow-md p-4 mb-4 text-white min-w-[300px]">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-gray-400 mb-2">Created by: {user?.name}</p>
      <div className="flex flex-wrap">
        {topic?.map((topic) => (
          <span
            key={topic}
            className="inline-block bg-gray-600 text-gray-200 text-sm px-2 py-1 rounded-md mr-2 mb-2"
          >
            {topic}
          </span>
        ))}
      </div>
      <Link to={`/notes/${_id}`}>
        <button className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default NoteItem;
