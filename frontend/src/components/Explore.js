import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Tweet from './Tweet';

const Explore = () => {
    const { refresh } = useSelector(store => store.tweet);
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrendingTweets();
    }, [refresh]);

    const fetchTrendingTweets = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3080/api/v1/tweet/trending`);
            setTweets(res.data?.tweets || []);
        } catch (error) {
            toast.error("Failed to load trending tweets");
            console.error(error);
            setTweets([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <p>Loading trending tweets...</p>
            </div>
        );
    }



    console.log("Fetched Trending Tweets:", tweets); // For debugging
    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div className='flex items-center py-2 px-4 sticky top-0 bg-white z-10 border-b'>
                <Link to="/" className='p-2 rounded-full hover:bg-gray-100'>
                    <IoMdArrowBack size="24px" />
                </Link>
                <div className='ml-4'>
                    <h1 className='font-bold text-xl'>Explore</h1>
                </div>
            </div>

            {tweets.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-10'>
                    <p className="text-gray-500 text-lg">No trending tweets found</p>
                </div>
            ) : (
                tweets.map(tweet => (
                    <Tweet key={tweet._id} tweet={tweet} />
                ))
            )}
        </div>
    );
};

export default Explore;





















// //working
// import React, { useEffect, useState } from 'react';
// import { IoMdArrowBack } from "react-icons/io";
// import { Link, useParams } from 'react-router-dom';
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useSelector, useDispatch } from "react-redux";

// import Tweet from './Tweet'; // Make sure the path is correct

// const Explore = () => {
//     const { user } = useSelector(store => store.user);
//     const { refresh } = useSelector(store => store.tweet); // 👈 listen for refresh flag
//     const dispatch = useDispatch();

//     const [tweets, setTweets] = useState([]);

//     useEffect(() => {
//         fetchBookmarkedTweets();
//     }, [refresh]); // 👈 re-fetch tweets when refresh flag changes

//     const fetchBookmarkedTweets = async () => {
//         try {
//             const res = await axios.get(`http://localhost:3080/api/v1/tweet/trending`);
//             setTweets(res.data.tweets); // Should return populated tweet data
//         } catch (error) {
//             toast.error("Failed to load bookmarks");
//             console.error(error);
//         }
//     };
//  console.log("Fetched explore Tweets:", tweets); // 👈 for debugging
//     return (
//         <div>
//           <div className='flex items-center py-2'>
//                              <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
//                                  <IoMdArrowBack size="24px" />
//                              </Link>
//                              <div className='ml-2'>
//                                  <h1 className='font-bold text-lg'>Explore</h1>

//                              </div>
//                          </div>
//             {tweets.length === 0 ? (
//                 <p className="text-center text-gray-500 mt-10">No bookmarks found</p>
//             ) : (
//                 tweets.map(tweet => (
//                     <Tweet key={tweet._id} tweet={tweet} />
//                 ))
//             )}
//         </div>
//     );
// };

// export default Explore;


// You must import the Tweet component (your full tweet logic) where this is used:









































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Explore() {
//   const [posts, setPosts] = useState([]);
//   const [sortBy, setSortBy] = useState('recent');

//   useEffect(() => {
//     const fetchExplorePosts = async () => {
//       try {
//         const res = await axios.get(`/api/explore?sortBy=${sortBy}`);
//         setPosts(res.data);
//       } catch (err) {
//         console.error('Error fetching explore posts:', err);
//       }
//     };
//     fetchExplorePosts();
//   }, [sortBy]);

//   return (
//     <div className="explore-page">
//       <h2>Explore Posts</h2>

//       <div>
//         <button onClick={() => setSortBy('recent')}>Recent</button>
//         <button onClick={() => setSortBy('popular')}>Popular</button>
//       </div>

//       {posts.map(post => (
//         <div key={post._id} className="post-card">
//           <p><strong>{post.userId?.username}</strong></p>
//           <p>{post.content}</p>
//           <p>Likes: {post.likes.length}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Explore;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Explore() {
//   const [posts, setPosts] = useState([]);  // Initialize as empty array
//   const [sortBy, setSortBy] = useState('recent');

//   useEffect(() => {
//     const fetchExplorePosts = async () => {
//       try {
//         const res = await axios.get(`/api/explore?sortBy=${sortBy}`);
//         console.log('Explore API response:', res.data);

//         // If response is an array, use it directly
//         // Otherwise check if response has a posts array
//         setPosts(Array.isArray(res.data) ? res.data : res.data.posts || []);
//       } catch (err) {
//         console.error('Error fetching explore posts:', err);
//       }
//     };

//     fetchExplorePosts();
//   }, [sortBy]);

//   return (
//     <div className="explore-page">
//       <h2>Explore Posts</h2>

//       <div>
//         <button onClick={() => setSortBy('recent')}>Recent</button>
//         <button onClick={() => setSortBy('popular')}>Popular</button>
//       </div>

//       {Array.isArray(posts) && posts.length > 0 ? (
//         posts.map(post => (
//           <div key={post._id} className="post-card">
//             <p><strong>{post.userId?.username || post.user?.username}</strong></p>
//             <p>{post.content}</p>
//             <p>Likes: {post.likes?.length || 0}</p>
//           </div>
//         ))
//       ) : (
//         <p>No posts found.</p>
//       )}
//     </div>
//   );
// }

// export default Explore;
