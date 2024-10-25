import React from 'react';

const Comment = ({ comment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getInitials = (name) => {
    return name.split(' ').map((part) => part[0]).join('').toUpperCase();
  };

  const initials = getInitials(comment.commenter.name);

  return (
    <div className="flex border p-2 mb-2 shadow-sm border-gray-100">
      {comment.commenter.picture ? (
        <img src={comment.commenter.picture} alt="Commenter" className="w-8 h-8 rounded-full mr-2" />
      ) : (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white mr-2">
          {initials}
        </div>
      )}
      <div>
        {/* Commenter name and time */}
        <p className="text-gray-500">{comment.commenter.name} - {formatDate(comment.date)}</p>
        {/* Comment text */}
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;