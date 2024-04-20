import React from "react";

const FeedbackLink = () => {
  const feedbackUrl = "https://forms.gle/WSWZQQxA5NAkJDz46";

  const linkStyle = {
    backgroundColor: "#6d61f5",
    color: "white",
    padding: "15px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const containerStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "1000",
    opacity: 0.8,
  };

  return (
    <div style={containerStyle}>
      <a href={feedbackUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
        Provide Feedback
      </a>
    </div>
  );
};

export default FeedbackLink;
