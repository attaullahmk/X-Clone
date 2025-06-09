// import { User } from "../models/userSchema.js";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const Register = async (req, res) => {
//     try {
//         const { name, username, email, password } = req.body;
//         // basic validation
//         console.log('hi this register path');
//         if (!name || !username || !email || !password) {
//             return res.status(401).json({
//                 message: "All fields are required.",
//                 success: false
//             })
//         }
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(401).json({
//                 message: "User already exist.",
//                 success: false
//             })
//         }
//         const hashedPassword = await bcryptjs.hash(password, 16);

//         await User.create({
//             name,
//             username,
//             email,
//             password: hashedPassword
//         });
//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }
// export const Login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(401).json({
//                 message: "All fields are required.",
//                 success: false
//             })
//         };
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({
//                 message: "Incorrect email or password",
//                 success: false
//             })
//         }
//         const isMatch = await bcryptjs.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({
//                 message: "Incorect email or password",
//                 success: false
//             });
//         }
//         const tokenData = {
//             userId: user._id
//         }
//         console.log(process.env.JWT_SECRET); // This should output 'your_secret_key_here'

//         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
//         return res.status(201).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
//             message: `Welcome back ${user.name}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const logout = (req, res) => {
//     return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
//         message: "user logged out successfully.",
//         success: true
//     })
// }

// export const bookmark = async (req, res) => {
//     try {
//         const loggedInUserId = req.body.id;
//         const tweetId = req.params.id;
//         const user = await User.findById(loggedInUserId);
//         if (user.bookmarks.includes(tweetId)) {
//             // remove
//             await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
//             return res.status(200).json({
//                 message: "Removed from bookmarks."
//             });
//         } else {
//             // bookmark
//             await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
//             return res.status(200).json({
//                 message: "Saved to bookmarks."
//             });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
// export const getMyProfile = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const user = await User.findById(id).select("-password");
//         return res.status(200).json({
//             user,
//         })
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const getOtherUsers = async (req,res) =>{ 
//     try {
//          const {id} = req.params;
//          const otherUsers = await User.find({_id:{$ne:id}}).select("-password");
//          if(!otherUsers){
//             return res.status(401).json({
//                 message:"Currently do not have any users."
//             })
//          };
//          return res.status(200).json({
//             otherUsers
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const follow = async(req,res)=>{
//     try {
//         const loggedInUserId = req.body.id; 
//         const userId = req.params.id; 
//         const loggedInUser = await User.findById(loggedInUserId);//patel
//         const user = await User.findById(userId);//keshav
//         if(!user.followers.includes(loggedInUserId)){
//             await user.updateOne({$push:{followers:loggedInUserId}});
//             await loggedInUser.updateOne({$push:{following:userId}});
//         }else{
//             return res.status(400).json({
//                 message:`User already followed to ${user.name}`
//             })
//         };
//         return res.status(200).json({
//             message:`${loggedInUser.name} just follow to ${user.name}`,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const unfollow = async (req,res) => {
//     try {
//         const loggedInUserId = req.body.id; 
//         const userId = req.params.id; 
//         const loggedInUser = await User.findById(loggedInUserId);//patel
//         const user = await User.findById(userId);//keshav
//         if(loggedInUser.following.includes(userId)){
//             await user.updateOne({$pull:{followers:loggedInUserId}});
//             await loggedInUser.updateOne({$pull:{following:userId}});
//         }else{
//             return res.status(400).json({
//                 message:`User has not followed yet`
//             })
//         };
//         return res.status(200).json({
//             message:`${loggedInUser.name} unfollow to ${user.name}`,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// } working
import { User } from "../models/userSchema.js";
import { Tweet } from "../models/tweetSchema.js";
import { Comment } from "../models/commentSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register
export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        console.log('hi this register path');
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists.",
                success: false
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// ✅ Login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        return res.status(201)
            .cookie("token", token, { expiresIn: "1d", httpOnly: true })
            .json({
                message: `Welcome back ${user.name}`,
                user,
                success: true
            });
    } catch (error) {
        console.log(error);
    }
};

// ✅ Logout
export const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "User logged out successfully.",
        success: true
    });
};

// ✅ Bookmark Toggle
export const bookmark = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);

        if (user.bookmarks.includes(tweetId)) {
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({ message: "Removed from bookmarks." });
        } else {
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({ message: "Saved to bookmarks." });
        }
    } catch (error) {
        console.log(error);
    }
};

// ✅ Get My Profile
export const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
    }
};

// ✅ Get Other Users
export const getOtherUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if (!otherUsers.length) {
            return res.status(401).json({ message: "Currently do not have any users." });
        }
        return res.status(200).json({ otherUsers });
    } catch (error) {
        console.log(error);
    }
};

// ✅ Follow
export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });
        } else {
            return res.status(400).json({ message: `User already followed to ${user.name}` });
        }

        return res.status(200).json({
            message: `${loggedInUser.name} just followed ${user.name}`,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// ✅ Unfollow
export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });
        } else {
            return res.status(400).json({ message: `User has not followed yet` });
        }

        return res.status(200).json({
            message: `${loggedInUser.name} unfollowed ${user.name}`,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

// ✅ Update Profile (NEW)
// export const updateProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(req.params);
//         const { name, bio, profilePicture, coverPicture } = req.body;
//         console.log( req.body, "this is  request");

//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false,
//             });
//         }

//         if (name) user.name = name;
//         if (bio) user.bio = bio;
//         if (profilePicture) user.profilePicture = profilePicture;
//         if (coverPicture) user.coverPicture = coverPicture;

//         await user.save();

//         return res.status(200).json({
//             message: "Profile updated successfully",
//             user: {
//                 name: user.name,
//                 bio: user.bio,
//                 profilePicture: user.profilePicture,
//                 coverPicture: user.coverPicture,
//                 username: user.username,
//                 email: user.email,
//                 followers: user.followers,
//                 following: user.following,
//             },
//             success: true,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Server error",
//             success: false,
//         });
//     }
// };



export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Params:", req.params);
    console.log("Body:", req.body);
    console.log("Files:", req.files); // <-- this will contain uploaded images

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const { name, bio } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;

    // ✅ Handle uploaded files
    if (req.files?.profilePicture?.[0]) {
      user.profilePicture = req.files.profilePicture[0].filename; // or .path if needed
    }
    if (req.files?.coverPicture?.[0]) {
      user.coverPicture = req.files.coverPicture[0].filename;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        bio: user.bio,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


















// ✅ Get User Activity (Posts, Liked Posts, Comments)
export const getUserActivity = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
        const likedPosts = await Post.find({ likes: userId }).sort({ createdAt: -1 });
        const comments = await Comment.find({ author: userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            user,
            posts,
            likedPosts,
            comments,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error while fetching user activity",
            success: false,
        });
    }
};
