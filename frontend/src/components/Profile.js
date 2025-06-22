// import React from 'react';
// import { IoMdArrowBack } from "react-icons/io";
// import { Link, useParams } from 'react-router-dom';
// import Avatar from "react-avatar";
// import { useSelector,useDispatch } from "react-redux";
// import useGetProfile from '../hooks/useGetProfile';
// import axios from "axios";
// import { USER_API_END_POINT } from '../utils/constant';
// import toast from "react-hot-toast"
// import { followingUpdate } from '../redux/userSlice';
// import { getRefresh } from '../redux/tweetSlice';



// const Profile = () => {
//     const { user, profile } = useSelector(store => store.user);
//     const { id } = useParams();
//     useGetProfile(id);
//     const dispatch = useDispatch();

//     const followAndUnfollowHandler = async () => {
//         if(user.following.includes(id)){
//             // unfollow
//             try {
//                 axios.defaults.withCredentials = true;
//                 const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
//                 console.log(res);
//                 dispatch(followingUpdate(id));
//                 dispatch(getRefresh());
//                 toast.success(res.data.message);
//             } catch (error) {
//                 toast.error(error.response.data.message);
//                 console.log(error);
//             }
            
//         }else{
//             // follow
//             try {
//                 axios.defaults.withCredentials = true;
//                 const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
//                 console.log(res);
//                 dispatch(followingUpdate(id));
//                 dispatch(getRefresh());
//                 toast.success(res.data.message);
//             } catch (error) {
//                 toast.error(error.response.data.message);
//                 console.log(error);
//             }
//         }
//     }
//     console.log(profile, "profile ")

//     return (
//         <div className='w-[50%] border-l border-r border-gray-200'>
//             <div>
//                 <div className='flex items-center py-2'>
//                     <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
//                         <IoMdArrowBack size="24px" />
//                     </Link>
//                     <div className='ml-2'>
//                         <h1 className='font-bold text-lg'>{profile?.name}</h1>
//                         <p className='text-gray-500 text-sm'>10 post</p>
//                     </div>
//                 </div>
//                 <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
//                 <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
//                     {/* <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="50" round={true} /> */}
//                 </div>
//                 <div className='text-right m-4'>
//                     {
//                         profile?._id === user?._id ? (
//                             <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

//                         ) : (
//                             <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
//                         )
//                     }
//                 </div>
//                 <div className='m-4'>
//                     <h1 className='font-bold text-xl'>{profile?.name}</h1>
//                     <p>{`@${profile?.username}`}</p>
//                 </div>
//                 <div className='m-4 text-sm'>
//                     <p>Exploring the web's endless possibilities with MERN Stack | Problem solver by day, coder by night | Join me on this coding journey!</p>
//                 </div>
               
                

//             </div>
//         </div>
//     )
// }

// export default Profile


// import React, { useState, useEffect } from 'react';
// import { IoMdArrowBack } from "react-icons/io";
// import { Link, useParams } from 'react-router-dom';
// import Avatar from "react-avatar";
// import { useSelector, useDispatch } from "react-redux";
// import useGetProfile from '../hooks/useGetProfile';
// import axios from "axios";
// import { USER_API_END_POINT } from '../utils/constant';
// import toast from "react-hot-toast";
// import { followingUpdate } from '../redux/userSlice';
// import { getRefresh } from '../redux/tweetSlice';

// const Profile = () => {
//   const { user, profile } = useSelector(store => store.user);
//   const { id } = useParams();
//   useGetProfile(id);
//   const dispatch = useDispatch();

//   const [editing, setEditing] = useState(false);

//   const [form, setForm] = useState({
//     name: '',
//     bio: '',
//     profilePicture: '',
//     coverPicture: ''
//   });

//   const [selectedProfileFile, setSelectedProfileFile] = useState(null);
//   const [selectedCoverFile, setSelectedCoverFile] = useState(null);

//   const [profilePreview, setProfilePreview] = useState('');
//   const [coverPreview, setCoverPreview] = useState('');

//   useEffect(() => {
//     if (profile) {
//       setForm({
//         name: profile.name || '',
//         bio: profile.bio || '',
//         profilePicture: profile.profilePicture || '',
//         coverPicture: profile.coverPicture || ''
//       });
//       setProfilePreview(profile.profilePicture || '');
//       setCoverPreview(profile.coverPicture || '');
//       setSelectedProfileFile(null);
//       setSelectedCoverFile(null);
//     }
//   }, [profile]);

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleProfileFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedProfileFile(file);
//       setProfilePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleCoverFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedCoverFile(file);
//       setCoverPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSave = async () => {
//     try {
//       axios.defaults.withCredentials = true;

//       const formData = new FormData();
//       formData.append('name', form.name);
//       formData.append('bio', form.bio);

//       if (selectedProfileFile) {
//         formData.append('profilePicture', selectedProfileFile);
//       } else {
//         formData.append('profilePicture', form.profilePicture || '');
//       }

//       if (selectedCoverFile) {
//         formData.append('coverPicture', selectedCoverFile);
//       } else {
//         formData.append('coverPicture', form.coverPicture || '');
//       }

//       const res = await axios.put(
//         `${USER_API_END_POINT}/update/${profile._id}`,
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         }
//       );

//       if (res.data.success) {
//         toast.success("Profile updated!");
//         setEditing(false);
//         dispatch(getRefresh());
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Update failed");
//     }
//   };

//   const followAndUnfollowHandler = async () => {
//     if (user.following.includes(id)) {
//       try {
//         axios.defaults.withCredentials = true;
//         const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id });
//         dispatch(followingUpdate(id));
//         dispatch(getRefresh());
//         toast.success(res.data.message);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to unfollow");
//       }
//     } else {
//       try {
//         axios.defaults.withCredentials = true;
//         const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id });
//         dispatch(followingUpdate(id));
//         dispatch(getRefresh());
//         toast.success(res.data.message);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to follow");
//       }
//     }
//   };

//   return (
//     <div className='w-[50%] border-l border-r border-gray-200 relative'>
//       <div>
//         <div className='flex items-center py-2'>
//           <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
//             <IoMdArrowBack size="24px" />
//           </Link>
//           <div className='ml-2'>
//             <h1 className='font-bold text-lg'>{profile?.name}</h1>
//             <p className='text-gray-500 text-sm'>10 post</p>
//           </div>
//         </div>

//         {/* Cover Photo */}
//         <div className="relative">
//           <img
//             src={coverPreview || "https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360"}
//             alt="banner"
//             className="w-full h-48 object-cover"
//           />
//           {editing && (
//             <>
//               <label
//                 htmlFor="cover-upload"
//                 className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-opacity-75"
//               >
//                 Change Cover
//               </label>
//               <input
//                 type="file"
//                 id="cover-upload"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleCoverFileChange}
//               />
//             </>
//           )}
//         </div>

//         {/* Profile Picture */}
//         <div className='absolute top-36 left-6 border-4 border-white rounded-full w-32 h-32 bg-gray-200 overflow-hidden'>
//           {profilePreview ? (
//             <img
//               src={profilePreview}
//               alt="profile"
//               className="w-full h-full object-cover rounded-full"
//             />
//           ) : (
//             <Avatar name={profile?.name || 'User'} size="128" round={true} />
//           )}
//           {editing && (
//             <>
//               <label
//                 htmlFor="profile-upload"
//                 className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-opacity-75"
//               >
//                 Change
//               </label>
//               <input
//                 type="file"
//                 id="profile-upload"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleProfileFileChange}
//               />
//             </>
//           )}
//         </div>

//         <div className='text-right m-4 pt-20'>
//           {profile?._id === user?._id ? (
//             editing ? (
//               <>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Name"
//                   className="border p-1 rounded mb-2 w-full"
//                 />
//                 <textarea
//                   name="bio"
//                   value={form.bio}
//                   onChange={handleChange}
//                   placeholder="Bio"
//                   className="border p-1 rounded mb-2 w-full"
//                 />
//                 <button
//                   onClick={handleSave}
//                   className='px-4 py-1 bg-blue-600 text-white rounded mr-2'
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditing(false)}
//                   className='px-4 py-1 bg-gray-300 rounded'
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={() => setEditing(true)}
//                 className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'
//               >
//                 Edit Profile
//               </button>
//             )
//           ) : (
//             <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>
//               {user.following.includes(id) ? "Following" : "Follow"}
//             </button>
//           )}
//         </div>

//         <div className='m-4'>
//           <h1 className='font-bold text-xl'>{profile?.name}</h1>
//           <p>{`@${profile?.username}`}</p>
//           <div className='flex space-x-4 mt-2 text-sm text-gray-700'>
//             <p><strong>{profile?.followers?.length || 0}</strong> Followers</p>
//             <p><strong>{profile?.following?.length || 0}</strong> Following</p>
//           </div>
//         </div>

//         <div className='m-4 text-sm'>
//           <p>{profile?.bio || "Exploring the web's endless possibilities with MERN Stack | Problem solver by day, coder by night | Join me on this coding journey!"}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;












import React, { useState, useEffect } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { FiCamera } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import Usertweet from './Usertweet';

import toast from "react-hot-toast";
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';

const Profile = () => {
  const { user, profile } = useSelector(store => store.user);
  const { id } = useParams();
  useGetProfile(id);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '',
    bio: '',
    profilePicture: '',
    coverPicture: ''
  });

  const [selectedProfileFile, setSelectedProfileFile] = useState(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [tab, setTab] = useState('posts');
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || '',
        bio: profile.bio || '',
        profilePicture: profile.profilePicture || '',
        coverPicture: profile.coverPicture || ''
      });
      setProfilePreview(profile.profilePicture || '');
      setCoverPreview(profile.coverPicture || '');
      setSelectedProfileFile(null);
      setSelectedCoverFile(null);
    }
  }, [profile]);
// console.log(profilePreview);
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProfileFile(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };
const handleSave = async () => {
  try {
    axios.defaults.withCredentials = true;

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('bio', form.bio);
    if (selectedProfileFile) {
      formData.append('profilePicture', selectedProfileFile);
    }
    if (selectedCoverFile) {
      formData.append('coverPicture', selectedCoverFile);
    }

    // Debugging: log the FormData entries
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    // Axios will automatically set the correct headers for FormData
    const res = await axios.put(
      `${USER_API_END_POINT}/update/${profile._id}`,
      formData
    );

    if (res.data.success) {
      toast.success("Profile updated!");
      setEditing(false);
      await dispatch(getRefresh());
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
  }
};


  const followAndUnfollowHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const endpoint = user.following.includes(id) ? 'unfollow' : 'follow';
      const res = await axios.post(`${USER_API_END_POINT}/${endpoint}/${id}`, { id: user?._id });
      dispatch(followingUpdate(id));
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };
// console.log(profile, "profile ")
  return (
    <div className='w-[50%] border-l border-r border-gray-200 relative'>
      <div>
        <div className='flex items-center py-2'>
          <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
            <IoMdArrowBack size="24px" />
          </Link>
          <div className='ml-2'>
            <h1 className='font-bold text-lg'>{profile?.name}</h1>
            <p className='text-gray-500 text-sm'>10 post</p>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="relative">
          <img
            src={coverPreview || "https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360"}
            alt="banner"
            className="w-full h-48 object-cover"
          />
          {editing && (
            <>
              <label
                htmlFor="cover-upload"
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded cursor-pointer hover:bg-opacity-75 flex items-center justify-center"
                style={{ width: '32px', height: '32px' }}
                title="Change Cover Photo"
              >
                <FiCamera size={18} />
              </label>
              <input
                type="file"
                id="cover-upload"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleCoverFileChange}
              />
            </>
          )}
        </div>

        {/* Profile Picture */}
        <div className='absolute top-36 left-6 border-4 border-white rounded-full w-32 h-32 bg-gray-200 overflow-hidden'>
          {console.log(profilePreview, "this is profile")}
          {profilePreview ? (
            <img
              src={profilePreview}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Avatar name={profile?.name || 'User'} size="128" round={true} />
          )}
          {editing && (
            <>
              <label
                htmlFor="profile-upload"
                className="absolute left-1/2 transform -translate-x-1/2 -top-4 bg-black bg-opacity-50 text-white p-1 rounded cursor-pointer hover:bg-opacity-75 flex items-center justify-center"
                style={{ width: '32px', height: '32px' }}
                title="Change Profile Picture"
              >
                <FiCamera size={18} />
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleProfileFileChange}
              />
            </>
          )}
        </div>

        <div className='text-right m-4 pt-20'>
          {profile?._id === user?._id ? (
            editing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border p-1 rounded mb-2 w-full"
                />
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="border p-1 rounded mb-2 w-full"
                />
                <button
                  onClick={handleSave}
                  className='px-4 py-1 bg-blue-600 text-white rounded mr-2'
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className='px-4 py-1 bg-gray-300 rounded'
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'
              >
                Edit Profile
              </button>
            )
          ) : (
            <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>

        <div className='m-4'>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>{`@${profile?.username}`}</p>
          <div className='flex space-x-4 mt-2 text-sm text-gray-700'>
            <p onClick={() => setShowFollowers(true)} className="cursor-pointer hover:underline">
              <strong>{profile?.followers?.length || 0}</strong> Followers
            </p>
            <p onClick={() => setShowFollowing(true)} className="cursor-pointer hover:underline">
              <strong>{profile?.following?.length || 0}</strong> Following
            </p>
          </div>
        </div>

        <div className='m-4 text-sm'>
          <p>{profile?.bio || "  "}</p>
        </div>

        {/* Tabs */}
        {/* <div className='flex justify-around border-b border-gray-200 mt-4 text-sm font-semibold'>
          <button onClick={() => setTab('posts')} className={`${tab === 'posts' && 'border-b-2 border-black'}`}>Posts</button>
          <button onClick={() => setTab('likes')} className={`${tab === 'likes' && 'border-b-2 border-black'}`}>Likes</button>
          <button onClick={() => setTab('comments')} className={`${tab === 'comments' && 'border-b-2 border-black'}`}>Comments</button>
        </div> */}

        {/* <div>show user post </div> */}
        {/* <Usertweet  /> */}
<Usertweet userId={profile?._id} />
        {/* Dummy tab content */}
        {/* <div className='p-4'>
          {tab === 'posts' && <p>User's posts go here...</p>}
          {tab === 'likes' && <p>Liked posts go here...</p>}
          {tab === 'comments' && <p>User's comments go here...</p>}
        </div> */}






        {/* Followers modal */}
        {/* {showFollowers && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded w-[300px] max-h-[400px] overflow-y-auto">
              <h2 className="text-lg font-bold mb-2">Followers</h2>
              {profile.followers.map(f => <p key={f._id}>{f.name}</p>)}
              <button className="mt-2 text-sm text-blue-600" onClick={() => setShowFollowers(false)}>Close</button>
            </div>
          </div>
        )} */}

        {/* Following modal */}
        {/* {showFollowing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded w-[300px] max-h-[400px] overflow-y-auto">
              <h2 className="text-lg font-bold mb-2">Following</h2>
              {profile.following.map(f => <p key={f._id}>{f.name}</p>)}
              <button className="mt-2 text-sm text-blue-600" onClick={() => setShowFollowing(false)}>Close</button>
            </div>
          </div>
        )} */}



        {/* {showFollowers && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-[350px] max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Followers</h2>
        <button 
          onClick={() => setShowFollowers(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      {profile.followers.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No followers yet</p>
      ) : (
        <div className="space-y-3">
          {profile.followers.map(follower => (
            <div key={follower._id || follower} className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
              {typeof follower === 'object' ? (
                <Link 
                  to={`/profile/${follower._id}`} 
                  className="flex items-center w-full"
                  onClick={() => setShowFollowers(false)}
                >
                  <Avatar 
                    src={follower.profilePic} 
                    name={follower.name} 
                    size="40" 
                    round={true} 
                    className="mr-3"
                  />
                  <span className="font-medium">{follower.name}</span>
                </Link>
              ) : (
                <Link 
                  to={`/profile/${follower}`} 
                  className="flex items-center w-full"
                  onClick={() => setShowFollowers(false)}
                >
                  <Avatar 
                    name="User" 
                    size="40" 
                    round={true} 
                    className="mr-3"
                  />
                  <span className="font-medium">User ID: {follower}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}

{showFollowing && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-[350px] max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Following</h2>
        <button 
          onClick={() => setShowFollowing(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      {profile.following.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Not following anyone yet</p>
      ) : (
        <div className="space-y-3">
          {profile.following.map(followingUser => (
            <div key={followingUser._id || followingUser} className="flex items-center hover:bg-gray-100 p-2 rounded cursor-pointer">
              {typeof followingUser === 'object' ? (
                <Link 
                  to={`/profile/${followingUser._id}`} 
                  className="flex items-center w-full"
                  onClick={() => setShowFollowing(false)}
                >
                  <Avatar 
                    src={followingUser.profilePic} 
                    name={followingUser.name} 
                    size="40" 
                    round={true} 
                    className="mr-3"
                  />
                  <span className="font-medium">{followingUser.name}</span>
                </Link>
              ) : (
                <Link 
                  to={`/profile/${followingUser}`} 
                  className="flex items-center w-full"
                  onClick={() => setShowFollowing(false)}
                >
                  <Avatar 
                    name="User" 
                    size="40" 
                    round={true} 
                    className="mr-3"
                  />
                  <span className="font-medium">User ID: {followingUser}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)} */}



{showFollowers && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-[350px] max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Followers</h2>
        <button 
          onClick={() => setShowFollowers(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      {profile.followers.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No followers yet</p>
      ) : (
        <div className="space-y-3">
          {profile.followers.map(follower => (
            <Link 
              key={follower._id} 
              to={`/profile/${follower._id}`}
              className="flex items-center hover:bg-gray-100 p-2 rounded transition-colors"
              onClick={() => setShowFollowers(false)}
            >
              <Avatar 
                src={follower.profilePicture} 
                name={follower.name} 
                size="40" 
                round={true} 
                className="mr-3"
              />
              <div>
                <p className="font-medium">{follower.name}</p>
                <p className="text-gray-500 text-sm">@{follower.username}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
)}

{showFollowing && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-[350px] max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Following</h2>
        <button 
          onClick={() => setShowFollowing(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      {profile.following.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Not following anyone yet</p>
      ) : (
        <div className="space-y-3">
          {profile.following.map(followingUser => (
            <Link 
              key={followingUser._id} 
              to={`/profile/${followingUser._id}`}
              className="flex items-center hover:bg-gray-100 p-2 rounded transition-colors"
              onClick={() => setShowFollowing(false)}
            >
              <Avatar 
                src={followingUser.profilePicture} 
                name={followingUser.name} 
                size="40" 
                round={true} 
                className="mr-3"
              />
              <div>
                <p className="font-medium">{followingUser.name}</p>
                <p className="text-gray-500 text-sm">@{followingUser.username}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
)}

      </div>
    </div>



  );
};

export default Profile;
