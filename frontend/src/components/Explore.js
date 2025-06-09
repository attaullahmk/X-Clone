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


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Explore() {
  const [posts, setPosts] = useState([]);  // Initialize as empty array
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    const fetchExplorePosts = async () => {
      try {
        const res = await axios.get(`/api/explore?sortBy=${sortBy}`);
        console.log('Explore API response:', res.data);

        // If response is an array, use it directly
        // Otherwise check if response has a posts array
        setPosts(Array.isArray(res.data) ? res.data : res.data.posts || []);
      } catch (err) {
        console.error('Error fetching explore posts:', err);
      }
    };

    fetchExplorePosts();
  }, [sortBy]);

  return (
    <div className="explore-page">
      <h2>Explore Posts</h2>

      <div>
        <button onClick={() => setSortBy('recent')}>Recent</button>
        <button onClick={() => setSortBy('popular')}>Popular</button>
      </div>

      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} className="post-card">
            <p><strong>{post.userId?.username || post.user?.username}</strong></p>
            <p>{post.content}</p>
            <p>Likes: {post.likes?.length || 0}</p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Explore;
