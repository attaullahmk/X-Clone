// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     username:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     followers:{
//         type:Array,
//         default:[]
//     },
//     following:{
//         type:Array,
//         default:[]
//     }, 
//     bookmarks:{
//         type:Array,
//         default:[]
//     }
// },{timestamps:true});
// export const User = mongoose.model("User", userSchema);
// export default userSchema;
//working



import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
    trim: true,
  },
  // profilePicture: {
  //   type: String,
  //   default: '', // Set a default Cloudinary URL if desired
  // },
  // coverPicture: {
  //   type: String,
  //   default: '', // Set a default Cloudinary URL if desired
  // },
    profilePicture: {
    type: String,
    default: '',
  },
  coverPicture: {
    type: String,
    default: '',
  },

  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  bookmarks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Post', // or whatever your post model is
    default: [],
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
export default userSchema;
