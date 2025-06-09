// components/FollowingFeed.jsx
import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import Tweet from './Tweet'; // Your existing tweet component

const FollowingFeed = () => {
    const { user } = useSelector(store => store.user);
    const { refresh } = useSelector(store => store.tweet);

    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        fetchFollowingTweets();
    }, [refresh]);

    const fetchFollowingTweets = async () => {
        try {
            const res = await axios.get(`http://localhost:3080/api/v1/tweet/followingtweets/${user._id}`);
            setTweets(res.data); // Should return array of tweets
            console.log(res.data)
        } catch (error) {
            toast.error("Failed to load following feed");
            console.error(error);
        }
    };

    return (
        <div>
            <div className='flex items-center py-2'>
                <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                    <IoMdArrowBack size="24px" />
                </Link>
                <div className='ml-2'>
                    <h1 className='font-bold text-lg'>Following Feed</h1>
                </div>
            </div>

            {tweets.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No tweets from followed users</p>
            ) : (
                tweets.map(tweet => (
                    <Tweet key={tweet._id} tweet={tweet} />
                ))
            )}
        </div>
    );
};

export default FollowingFeed;
