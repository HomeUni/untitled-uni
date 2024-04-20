// pages/forums/components/ForumPost.js

import React, { useEffect, useState } from 'react';
import Comment from './Comment';

import {updateLikesInBackend, updateCommentsInBackend} from '../../../fauna/updatePosts';


const ForumPost = ({ post, user }) => {
    const postData = post.data;
    const [likes, setLikes] = useState(postData.likes);
    const [comments, setComments] = useState(postData.comments);
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false); // State to track comment section visibility

    const handleLike = () => {
        if (!liked) {
            const newLikes = likes + 1;
            setLikes(newLikes);
            updateLikesInBackend(newLikes, postData.id);
            setLiked(true);
        }
    };

    useEffect(() => {
        setLikes(postData.likes);
        setComments(postData.comments);
    }, [postData]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleComment = () => {
        if (commentText.trim() === '') return;
        const newComment = { id: comments.length + 1, commenter: {
            name: user.given_name,
            picture: user.picture,
            email: user.email,
            last_name: user.family_name
        }, text: commentText, date: new Date().toISOString() }; // change this to logged in user.
        const updatedComments = [...comments, newComment];
        setComments(updatedComments); // Add new comment
        updateCommentsInBackend(updatedComments, post.data.id); 
        setCommentText(''); // Clear comment input field
    };


    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const formatContent = (content) => {
        return content.split('.').map((sentence, index, array) => {
            if (sentence.trim() !== '') {
                return <p style={{ lineHeight: 2.4 }} key={index}>{sentence.trim()}{index !== array.length - 1 ? '.' : ''}</p>;
            }
            return null;
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
        return date.toLocaleDateString('en-US', options);
    };

    const commentCount = comments.length;


    return (
        <div className="border rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center">
                {/* User avatar */}
                <img src={postData.user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-light">{postData.title}</h2>
                    <p className="text-gray-600">@{postData.user.name}</p>
                </div>
            </div>
            <p style={{ fontSize: 12 }} className="text-gray-500">{formatDate(postData.date)}</p>

            <div className="mt-2">
                {formatContent(postData.content)}
            </div>
            {postData.link && (
            <div className="mt-2">
                <a className='text-indigo-500' target='_blank' href={postData.link} >{postData.link}</a>
            </div>
            )}
            <div className="flex items-center justify-between mt-4">
                <button onClick={handleLike} className={`text-indigo-500 ${liked && 'opacity-50 cursor-not-allowed'}`}>
                    {likes} Like{likes !== 1 && 's'}
                </button>
                <button onClick={toggleComments} className="text-indigo-500">{commentCount} Comment{commentCount !== 1 && 's'}</button>

            </div>
            {showComments && (
                <>
                    <div className="mt-4">
                        {user && (
                            <>
                            <textarea
                                type="text"
                                value={commentText}
                                onChange={handleCommentChange}
                                placeholder="Add a comment..."
                                className="border p-5 w-full" />
                                <button onClick={handleComment} className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                                    Comment
                                </button>
                            </>
                        )}
                        {!user && (
                            <p className="text-red-500">Please login to comment</p>
                        )}
                        
                    </div><div className="mt-4">
                        {/* Comments:  */}
                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ForumPost;
