


import React, { useEffect, useState } from 'react';
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart, CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';
import { timeSince } from "../utils/constant";

const Tweet = ({ tweet }) => {
    // console.log(tweet ," this tweet props ")
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const [commentText, setCommentText] = useState("");
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0);
    const [bookmarked, setBookmarked] = useState(false);

    useEffect(() => {
        fetchCommentCount();
        checkIfBookmarked();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCommentCount = async () => {
        try {
            const res = await axios.get(`http://localhost:3080/api/v1/comment/get/${tweet._id}`);
            setCommentCount(res.data.length);
            // console.log("alluser ",res.data)
        } catch (error) {
            console.error("Error fetching comment count:", error);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:3080/api/v1/comment/get/${tweet._id}`);
            setComments(res.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
            toast.error("Failed to fetch comments");
        }
    };

    const toggleComments = async () => {
        const newState = !showCommentInput;
        setShowCommentInput(newState);
        if (newState) await fetchComments();
    };

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true
            });
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const deleteTweetHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const createCommentHandler = async () => {
        if (!commentText.trim()) return toast.error("Comment cannot be empty");

        try {
            await axios.post("http://localhost:3080/api/v1/comment/create", {
                tweetId: tweet._id,
                userId: user?._id,
                content: commentText
            }, { withCredentials: true });

            setCommentText("");
            fetchComments(); // Reload comments
            fetchCommentCount(); // Update comment count
            toast.success("Comment posted");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to comment");
        }
    };

    const toggleBookmarkHandler = async () => {
        try {
            console.log("Sending bookmark for user:", user?._id, "tweet:", tweet._id);

            const res = await axios.post(`http://localhost:3080/api/v1/bookmark/${tweet._id}`, { userId: user?._id });
            setBookmarked(prev => !prev);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to bookmark");
        }
    };

    const checkIfBookmarked = async () => {
        try {
            const res = await axios.get(`http://localhost:3080/api/v1/bookmark/check/${tweet._id}?userId=${user?._id}`);
            setBookmarked(res.data.bookmarked);
        } catch (error) {
            console.error("Error checking bookmark status:", error);
        }
    };

    // console.log("Tweet component rendered with tweet:", tweet.userId);
    // console.log("User in Tweet component:", user._id);
    return (
        <div className='border-b border-gray-200'>
            <div className='flex p-4'>
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                        <p className='text-gray-500 text-sm ml-1'>
                            @{tweet?.userDetails[0]?.username} · {timeSince(tweet?.createdAt)}
                        </p>
                    </div>
                    <p>{tweet?.description}</p>
                

{/* Display tweet images if available */}
{tweet?.images?.length > 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
    {tweet.images.map((imgUrl, index) => (
      <img
        key={index}
        src={imgUrl}
        alt={`Tweet ${index}`}
        className="w-full h-auto rounded-lg shadow-sm border"
        loading="lazy"
      />
    ))}
  </div>
)}


                    <div className='flex justify-between my-3'>
                        <div className='flex items-center cursor-pointer' onClick={toggleComments}>
                            <div className='p-2 hover:bg-green-200 rounded-full'>
                                <FaRegComment size="20px" />
                            </div>
                            <p className='ml-1'>{commentCount}</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
                                <CiHeart size="24px" />
                            </div>
                            <p>{tweet?.like?.length}</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={toggleBookmarkHandler} className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                                <CiBookmark size="24px" color={bookmarked ? "blue" : "black"} />
                            </div>
                            <p>{bookmarked ? 1 : 0}</p>
                        </div>
                        {user?._id === tweet?.userId && (
                            <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                    <MdOutlineDeleteOutline size="24px" />
                                </div>
                            </div>
                        )}
                    </div>

                    {showCommentInput && (
                        <div className="mt-2">
                            <input
                                type="text"
                                className="w-full border rounded-md p-2 text-sm"
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button
                                onClick={createCommentHandler}
                                className="bg-blue-500 text-white px-3 py-1 rounded mt-1 text-sm hover:bg-blue-600"
                            >
                                Post
                            </button>
                        </div>
                    )}

                    {showCommentInput && comments.length > 0 && (
                        <div className="mt-4 space-y-2 pl-4 border-l border-gray-300">
                            {comments.map((comment, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <Avatar name={comment?.userId?.username || "User"} size="30" round={true} />
                                    <div className="bg-gray-100 p-2 rounded-md w-full">
                                        <div className="text-sm font-medium">{comment?.userId?.username || "Unknown"}</div>
                                        <p className="text-sm text-gray-700">{comment?.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tweet;
