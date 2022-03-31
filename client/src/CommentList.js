import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    let content;

    if(comment.status === 'approved'){
      content = comment.content;
    }
    else if(comment.status === 'pending'){
      content = 'Pending moderation';
    }
    else if(comment.status === 'rejected'){
      content = 'rejected comment';
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
