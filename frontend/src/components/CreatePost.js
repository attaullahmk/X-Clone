// import React, { useState } from 'react';
// import Avatar from "react-avatar";
// import { CiImageOn } from "react-icons/ci";
// import axios from "axios";
// import { TWEET_API_END_POINT } from "../utils/constant";
// import toast from "react-hot-toast"
// import { useSelector, useDispatch } from "react-redux";
// import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';

// const CreatePost = () => {
//     const [description, setDescription] = useState("");
//     const { user } = useSelector(store => store.user);
//     const {isActive} = useSelector(store=>store.tweet);
//     const dispatch = useDispatch();

//     const submitHandler = async () => {

//         try {
//             const res = await axios.post(`${TWEET_API_END_POINT}/create`, { description, id: user?._id }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 withCredentials: true
//             });
//             dispatch(getRefresh());
//             if (res.data.success) {
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//             console.log(error);
//         }
//         setDescription("");
//     }

//     const forYouHandler = () => {
//          dispatch(getIsActive(true));
//     }
//     const followingHandler = () => {
        
//         dispatch(getIsActive(false));
//     }

//     return (
//         <div className='w-[100%]'>
//             <div>
//                 <div className='flex items-center justify-evenly border-b border-gray-200'>
//                     <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
//                         <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
//                     </div>
//                     <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
//                         <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
//                     </div>
//                 </div>
//                 <div >
//                     <div className='flex items-center p-4'>
//                         <div>
//                             {/* <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} /> */}
//                         </div>
//                         <input value={description} onChange={(e) => setDescription(e.target.value)} className='w-full outline-none border-none text-xl ml-2' type="text" placeholder='What is happening?!' />
//                     </div>
//                     <div className='flex items-center justify-between p-4 border-b border-gray-300'>
//                         <div>
//                             <CiImageOn size="24px" />
//                         </div>
//                         <button onClick={submitHandler} className='bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full '>Post</button>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default CreatePost



import React, { useState } from 'react';
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from '../redux/tweetSlice';

const CreatePost = () => {
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const { user } = useSelector(store => store.user);
    const { isActive } = useSelector(store => store.tweet);
    const dispatch = useDispatch();

    const submitHandler = async () => {
        if (!description && images.length === 0) {
            return toast.error("Post cannot be empty!");
        }

        const formData = new FormData();
        formData.append("description", description);
        formData.append("id", user?._id);
        images.forEach((image) => formData.append("images", image));

        try {
            const res = await axios.post(`${TWEET_API_END_POINT}/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Upload failed.");
            console.log(error);
        }

        setDescription("");
        setImages([]);
    };

    const forYouHandler = () => {
        dispatch(getIsActive(true));
    };
    const followingHandler = () => {
        dispatch(getIsActive(false));
    };
// console.log(user);
// console.log(user.profilePicture);
    return (
        <div className='w-[100%]'>
            <div>
                <div className='flex items-center justify-evenly border-b border-gray-200'>
                    <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                    </div>
                    <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                    </div>
                </div>
                
                <div>
                    <div className='flex items-center p-4'>
                        {/* <div className="flex items-center">
                            <img src={user?.profilePicture || "https://via.placeholder.com/40"} alt="User Avatar" className="rounded-full w-10 h-10" />
                            {user?.profilePic ? (
                                <Avatar src={user.profilePicture} size="40" round={true} />
                            ) : (
                                <Avatar name={user?.name} size="40" round={true} />
                            )}
                            {user?.name && (
                                <span className="ml-2 text-sm font-semibold">{user.name}</span>
                            )}
                        </div> */}
                        {/* {   console.log(user.profilePicture, "Profile Picture")} */}
                        <div className="flex items-center">
    {user?.profilePicture ? (
     
        <img 
            src={user.profilePicture} 
            alt="Profile" 
            className="rounded-full w-10 h-10 object-cover"
        />
    ) : (
        <Avatar name={user?.name} size="40" round={true} />
    )}
    
    {/* {user?.name && (
        <span className="ml-2 text-sm font-semibold">{user.name}</span>
    )} */}
</div>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full outline-none border-none text-xl ml-2'
                            type="text"
                            placeholder='What is happening?!'
                        />
                    </div>

                    {/* Image Preview Section */}
                    {images.length > 0 && (
                        <div className="flex flex-wrap gap-3 px-4 pb-2">
                            {images.map((img, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt={`preview-${index}`}
                                        className="w-24 h-24 object-cover rounded-md border"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                        {/* Image Upload */}
                        <div className="relative cursor-pointer">
                            <CiImageOn size="24px" />
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setImages([...e.target.files])}
                                className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
                            />
                        </div>

                        {/* Submit Button */}
                        <button onClick={submitHandler} className='bg-[#1D9BF0] px-4 py-1 text-lg text-white border-none rounded-full'>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;