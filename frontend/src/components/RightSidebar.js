// import React from 'react'
// import { CiSearch } from "react-icons/ci";
// import Avatar from "react-avatar";
// import { Link } from 'react-router-dom';


// const RightSidebar = ({ otherUsers }) => {

//   return (
//     <div className='w-[25%]'>
//       <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
//         <CiSearch size="20px" />
//         <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
//       </div>
//       <div className='p-4 bg-gray-100 rounded-2xl my-4'>
//         <h1 className='font-bold text-lg'>Who to follow</h1>
//         {
//           otherUsers?.map((user) => {
//             return (
//               <div key={user?._id} className='flex items-center justify-between my-3'>
//                 <div className='flex'>
//                   <div>
//                     <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
//                   </div>
//                   <div className='ml-2'>
//                     <h1 className='font-bold'>{user?.name}</h1>
//                     <p className='text-sm'>{`@${user?.username}`}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <Link to={`/profile/${user?._id}`}>
//                     <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
//                   </Link>
//                 </div>
//               </div>
//             )
//           })
//         }



//       </div>
//     </div>
//   )
// }

// export default RightSidebar

import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RightSidebar = ({ otherUsers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  // const handleSearch = async (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   if (!query.trim()) {
  //     setSearchResults([]);
  //     return;
  //   }

  //   try {
  //     // const res = await axios.get(`http://localhost:3080/api/v1/user/search?query=${query}`);
  //     const res = await axios.get(`http://localhost:3080/api/v1/user/search?name=${query}`);

  //     setSearchResults(res.data);
  //   } catch (err) {
  //     console.error("Search error", err);
  //   }
  // };
  // console.log("Search Results:", searchResults);

  const handleSearch = async (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (!query.trim()) {
    setSearchResults([]);
    return;
  }

  try {
    const res = await axios.get(`http://localhost:3080/api/v1/user/search?name=${query}`);
    setSearchResults(res.data.users); // ✅ correct access
  } catch (err) {
    console.error("Search error", err);
    setSearchResults([]);
  }
};


  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className='w-[25%]'>
      {/* Search Box */}
      <div className='relative'>
        <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
          <CiSearch size="20px" />
          <input
            type="text"
            className='bg-transparent outline-none px-2 w-full'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className='absolute z-10 bg-white border border-gray-200 rounded-lg mt-1 w-full shadow-md max-h-[200px] overflow-y-auto'>
            {searchResults.map(user => (
              <div
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
              >
                <Avatar name={user.name} size="35" round={true} />
                <div className='ml-2'>
                  <h1 className='font-semibold text-sm'>{user.name}</h1>
                  <p className='text-gray-500 text-sm'>@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Who to follow */}
      {/* <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg'>Who to follow</h1>
        {otherUsers?.map(user => (
          <div key={user._id} className='flex items-center justify-between my-3'>
            <div className='flex'>
              <Avatar name={user.name} size="40" round={true} />
              <div className='ml-2'>
                <h1 className='font-bold'>{user.name}</h1>
                <p className='text-sm'>@{user.username}</p>
              </div>
            </div>
            <Link to={`/profile/${user._id}`}>
              <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
            </Link>
          </div>
        ))}
      </div> */}
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
  <h1 className='font-bold text-lg mb-3'>Who to follow</h1>
  {otherUsers?.map(user => (
    <div key={user._id} className='flex items-center justify-between my-3'>
      <div className='flex items-center'>
        {user.profilePicture ? (
          <>
            <img 
              src={user.profilePicture} 
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* <Avatar 
              name={user.name} 
              size="40" 
              round={true} 
              className="hidden"
            /> */}
          </>
        ) : (
          <Avatar 
            name={user.name} 
            size="40" 
            round={true} 
          />
        )}
        <div className='ml-3'>
          <h1 className='font-bold'>{user.name}</h1>
          <p className='text-sm text-gray-600'>@{user.username}</p>
        </div>
      </div>
      <Link to={`/profile/${user._id}`}>
        <button className='px-4 py-1 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors'>
          View
        </button>
      </Link>
    </div>
  ))}
</div>
    </div>
  );
};

export default RightSidebar;
