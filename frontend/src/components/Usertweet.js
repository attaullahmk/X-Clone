// //working
// import React, { useEffect, useState } from 'react';
// import { IoMdArrowBack } from "react-icons/io";
// import { Link, useParams } from 'react-router-dom';
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useSelector, useDispatch } from "react-redux";

// import Tweet from './Tweet'; // Make sure the path is correct

// const Usertweet = () => {
//     const { user } = useSelector(store => store.user);
//     const { refresh } = useSelector(store => store.tweet); // 👈 listen for refresh flag
//     const dispatch = useDispatch();

//     const [tweets, setTweets] = useState([]);

//     useEffect(() => {
//         fetchBookmarkedTweets();
//     }, [refresh]); // 👈 re-fetch tweets when refresh flag changes

//     const fetchBookmarkedTweets = async () => {
//         try {
//             console.log("Fetching Bookmarked Tweets for User:", user._id); // 👈 for debugging
//             // const res = await axios.get(`http://localhost:3080/api/v1/bookmark/user/${user._id}`);
//              const res = await axios.get(`http://localhost:3080/api/v1/tweet/alltweetuser/${user._id}`);
//             setTweets(res); // Should return populated tweet data
//         } catch (error) {
//             toast.error("Failed to load bookmarks");
//             console.error(error);
//         }
//         console.log("Fetched Bookmarked Tweets:", tweets); // 👈 for debugging
//     };

//     //   fetchBookmarkedTweets();

//     return (
//         <div>
//           <div className='flex items-center py-2'>
//                              <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
//                                  <IoMdArrowBack size="24px" />
//                              </Link>
//                              <div className='ml-2'>
//                                  <h1 className='font-bold text-lg'>BookMark</h1>

//                              </div>
//                          </div>
//             {/* {tweets.length === 0 ? (
//                 <p className="text-center text-gray-500 mt-10">No bookmarks found</p>
//             ) : (
//                 tweets.map(tweet => (
//                     <Tweet key={tweet._id} tweet={tweet} />
//                 ))
//             )} */}
//         </div>
//     );
// };

// export default Usertweet;


// // You must import the Tweet component (your full tweet logic) where this is used:












import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

import Tweet from './Tweet'; // ✅ Make sure path is correct

const Usertweet = ( {userId}) => {
  const { user } = useSelector(store => store.user);
  const { refresh } = useSelector(store => store.tweet);
  const dispatch = useDispatch();
  const [tweets, setTweets] = useState([]);

  const { id } = useParams(); // 👈 In case you want to get tweets of a specific user by param (optional)
// console.log("User ID from Params:", userId); // 👈 for debugging
// console.log("Current User ID:", user._id); // 👈 for debugging
  useEffect(() => {
    fetchUserTweets();
  }, [refresh]);

  const fetchUserTweets = async () => {
    try {
      const res = await axios.get(`http://localhost:3080/api/v1/tweet/alltweetuser/${userId}`);
      // const res = await axios.get(`http://localhost:3080/api/v1/tweet/alltweetuser/${user._id}`);
      setTweets(res.data.tweets); // ✅ Set only the data part of response
    } catch (error) {
      toast.error("Failed to load tweets");
      console.error(error);
    }
  };
// console.log("Fetched User Tweets:", tweets); // 👈 for debugging
  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
      {/* Header */}
      {/* <div className='flex items-center py-2'>
        <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
          <IoMdArrowBack size="24px" />
        </Link>
        <div className='ml-2'>
          <h1 className='font-bold text-lg'>Tweets</h1>
        </div>
      </div> */}

      {/* Tweets List */}
      {tweets.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No tweets found</p>
      ) : (
        tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))
      )}
    </div>
  );
};

export default Usertweet;
