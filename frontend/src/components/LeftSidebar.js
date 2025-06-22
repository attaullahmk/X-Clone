// import React, { useState, useEffect } from 'react';
// import { CiHome, CiHashtag, CiUser, CiBookmark } from "react-icons/ci";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { AiOutlineLogout } from "react-icons/ai";
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
// import { USER_API_END_POINT } from '../utils/constant';
// import toast from "react-hot-toast";
// import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';
// import './LeftSidebar.css';

// const LeftSidebar = () => {
//   const { user } = useSelector(store => store.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [view, setView] = useState('');
//   const [explorePosts, setExplorePosts] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);  // for notification badge count

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${USER_API_END_POINT}/logout`);
//       dispatch(getUser(null));
//       dispatch(getOtherUsers(null));
//       dispatch(getMyProfile(null));
//       navigate('/login');
//       toast.success(res.data.message);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (view === 'explore') {
//       const fetchExplore = async () => {
//         try {
//           const res = await axios.get('/api/explore');
//           setExplorePosts(res.data);
//         } catch (error) {
//           console.error('Error fetching explore posts:', error);
//           toast.error("Failed to load explore posts.");
//         }
//       };
//       fetchExplore();
//     }
//   }, [view]);

//   // Fetch unread notifications count on mount and when user changes
//   useEffect(() => {
//     const fetchUnreadNotifications = async () => {
//       try {
//         const res = await axios.get('/api/notifications/unreadCount'); // Adjust API path accordingly
//         setUnreadCount(res.data.unreadCount);
//       } catch (error) {
//         console.error('Failed to fetch unread notifications count:', error);
//       }
//     };
//     fetchUnreadNotifications();
//   }, [user]);

//   // Handler for Notifications click
//   const handleNotificationClick = () => {
//     setView('notifications');
//     navigate('/notifications');
//   };

//   return (
//     <div className='w-[20%]'>
//       <div>
//         <div>
//           <img className='ml-5' width={"40px"} src="../../logo2.jpg" alt="twitter-logo" />
//         </div>
//         <div className='my-4'>

//           <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//             <div><CiHome size="24px" /></div>
//             <h1 className='font-bold text-lg ml-2'>Home</h1>
//           </Link>

//           <div
//             onClick={() => setView('explore')}
//             className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ${view === 'explore' ? 'bg-gray-300' : ''}`}
//           >
//             <div><CiHashtag size="24px" /></div>
//             <h1 className='font-bold text-lg ml-2'>Explore</h1>
//           </div>

//           {/* Updated Notifications button */}
//           <div
//             onClick={handleNotificationClick}
//             className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ${view === 'notifications' ? 'bg-gray-300' : ''}`}
//             style={{ position: 'relative' }}
//           >
//             <div><IoIosNotificationsOutline size="24px" /></div>
//             <h1 className='font-bold text-lg ml-2'>Notifications</h1>
//             {unreadCount > 0 && (
//               <span
//                 style={{
//                   position: 'absolute',
//                   top: '8px',
//                   left: '36px',
//                   background: 'red',
//                   color: 'white',
//                   borderRadius: '50%',
//                   padding: '2px 6px',
//                   fontSize: '12px',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {unreadCount}
//               </span>
//             )}
//           </div>

//           <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//             <div><CiUser size="24px" /></div>
//             <h1 className='font-bold text-lg ml-2'>Profile</h1>
//           </Link>

         
//           <div
//   onClick={() => {
//     setView('bookmarks');
//     navigate('/bookmarks');
//   }}
//   className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ${view === 'bookmarks' ? 'bg-gray-300' : ''}`}
// >
//   <div><CiBookmark size="24px" /></div>
//   <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
// </div>


//           <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
//             <div><AiOutlineLogout size="24px" /></div>
//             <h1 className='font-bold text-lg ml-2'>Logout</h1>
//           </div>

//           <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button>
//         </div>

//         {/* Conditionally show Explore or Bookmarks content */}
//         {view === 'explore' && (
//           <div className="mt-4 px-4 max-h-[400px] overflow-auto">
//             <h2 className="font-bold text-lg mb-2">Explore Posts</h2>
//             {explorePosts.length === 0 && <p>No posts to show.</p>}
//             {explorePosts.map(post => (
//               <div key={post._id} className="mb-3 p-2 border rounded bg-white">
//                 <p><strong>{post.userId?.username || 'Unknown'}</strong></p>
//                 <p>{post.content}</p>
//                 <p className="text-sm text-gray-600">{post.likes?.length || 0} likes</p>
//               </div>
//             ))}
//           </div>
//         )}



//       </div>
//     </div>
//   );
// };

// export default LeftSidebar;
import React, { useState, useEffect } from 'react';
import { CiHome, CiHashtag, CiUser, CiBookmark } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const { user } = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [view, setView] = useState('');
  const [explorePosts, setExplorePosts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);  // for notification badge count

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      navigate('/login');
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (view === 'explore') {
      const fetchExplore = async () => {
        try {
          const res = await axios.get('/api/explore');
          // Ensure explorePosts is always an array to avoid map error
          setExplorePosts(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
          console.error('Error fetching explore posts:', error);
          toast.error("Failed to load explore posts.");
        }
      };
      fetchExplore();
    }
  }, [view]);

  // Fetch unread notifications count on mount and when user changes
  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const res = await axios.get('/api/notifications/unreadCount'); // Adjust API path accordingly
        setUnreadCount(res.data.unreadCount);
      } catch (error) {
        console.error('Failed to fetch unread notifications count:', error);
      }
    };
    fetchUnreadNotifications();
  }, [user]);

  // Handler for Notifications click
  const handleNotificationClick = () => {
    setView('notifications');
    navigate('/notifications');
  };

  return (
    <div className='w-[20%]'>
      <div>
        <div>
          <img className='ml-5' width={"40px"} src="../../logo2.jpg" alt="twitter-logo" />
        </div>
        <div className='my-4'>

          <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div><CiHome size="24px" /></div>
            <h1 className='font-bold text-lg ml-2'>Home</h1>
          </Link>

          {/* <div */}
          {/* // onClick={() => setView('explore')} */}
           <Link to="/explore" 
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ${view === 'explore' ? 'bg-gray-300' : ''}`}
          >
            <div><CiHashtag size="24px" /></div>
            <h1 className='font-bold text-lg ml-2'>Explore</h1>
          {/* </div> */}
          </Link>

          {/* Updated Notifications button */}
          <div
            onClick={handleNotificationClick}
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ${view === 'notifications' ? 'bg-gray-300' : ''}`}
            style={{ position: 'relative' }}
          >
            <div><IoIosNotificationsOutline size="24px" /></div>
            <h1 className='font-bold text-lg ml-2'>Notifications</h1>
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '36px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>

          <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div><CiUser size="24px" /></div>
            <h1 className='font-bold text-lg ml-2'>Profile</h1>
          </Link>

          <div
            onClick={() => {
              setView('bookmarks');
              navigate('/bookmarks');
            }}
            className={`flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full ${view === 'bookmarks' ? 'bg-gray-300' : ''}`}
          >
            <div><CiBookmark size="24px" /></div>
            <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
          </div>

          <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
            <div><AiOutlineLogout size="24px" /></div>
            <h1 className='font-bold text-lg ml-2'>Logout</h1>
          </div>

          {/* <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button> */}
        </div>

        {/* Conditionally show Explore or Bookmarks content */}
        {view === 'explore' && (
          <div className="mt-4 px-4 max-h-[400px] overflow-auto">
            <h2 className="font-bold text-lg mb-2">Explore Posts</h2>
            {Array.isArray(explorePosts) && explorePosts.length > 0 ? (
              explorePosts.map(post => (
                <div key={post._id} className="mb-3 p-2 border rounded bg-white">
                  <p><strong>{post.userId?.username || 'Unknown'}</strong></p>
                  <p>{post.content}</p>
                  <p className="text-sm text-gray-600">{post.likes?.length || 0} likes</p>
                </div>
              ))
            ) : (
              <p>No posts to show.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default LeftSidebar;
