import React, { useEffect, useState } from "react";
// import "./modal.css";
import createPost from '../../../fauna/createPost';
import { toast } from "react-toastify";

const AddPost = () => {

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [forum, setSelectedForum] = useState("");
  const [link, setSelectedLink] = useState("");
  const [user, setUser] = useState({});
  

  useEffect(() => {
    async function fetchData() {
      if (typeof window !== 'undefined') {
        const user =  JSON.parse(localStorage.getItem('user' || {}));
        setUser(user);
    }
    }
    fetchData();
  }, []);

  const openModal = () => {
    if(!user){
      window.location = '/api/auth/login';
      return;
    }
    setShowModal(true);
  };

  const containerStyle = {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    opacity: 0.99,
    zIndex: "1000",
  };

  const modalStyle = {
    animation: showModal ? "fadeIn .3s ease-in" : "",
    
  };


  const closeModal = () => {
    setShowModal(false);
    setTitle("");
    setContent("");
    setSelectedLink("");
    setSelectedForum("");
    // location.reload()
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleForumChange = (event) => {
    setSelectedForum(event.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleLinkChange = (e) => {
    setSelectedLink(e.target.value);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    
    try {
      const body = {
        title: title,
        forum: forum,
        id: Math.random().toString(36).substr(2, 9),
        user: {
          avatar: user.picture,
          name: user.name,
          id: user.sid
        },
        content: content,
        link: link,
        likes: 0,
        comments: [],
        date: new Date().toISOString()
      };
  
      const response = await createPost(body);
  
      if (response.ts) {
        toast.success("Post added successfully");
      } else {
        toast.error("Failed to add the course"); 
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while adding the post");
    }

    closeModal();
    location.reload()
  };


  return (

      
      <div style={containerStyle}>
        <button
          onClick={openModal}
          className="bg-white text-indigo-600 py-3 px-6 rounded-full shadow-md text-lg font-medium hover:bg-indigo-100 transition duration-300"
        >
          Add Post ✍️
        </button>
        {showModal && (
           <div className="flex justify-center items-center h-screen transition-opacity transition-transform duration-300" style={modalStyle}>
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg w-96 p-6">
              <h2 className="text-2xl font-semibold mb-4">Add Post</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="mt-1 p-2 w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm"
                    placeholder="Enter title"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Forum
                  </label>
                  <select
                    id="location"
                    name="forum"
                    value={forum}
                    onChange={handleForumChange}
                    className="mt-1 p-2 w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm"
                  >
                    <option value="">Select forum</option>
                    <option value="global">Global forum</option>
                    <option value="random">Random forum</option>
                    <option value="learning">Learning forum</option>
                    {user.email === "godfredakpan@gmail.com" && <option value="announcements">Announcements</option>}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={handleContentChange}
                    rows="3"
                    className="mt-1 p-2 w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm"
                    placeholder="Enter content"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    External Link?
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={link}
                    onChange={handleLinkChange}
                    className="mt-1 p-2 w-full border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm"
                    placeholder="Enter Link"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md mr-2 hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        )}
      </div>
   
  );
};

export default AddPost;
