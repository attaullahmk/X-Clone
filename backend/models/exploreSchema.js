// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   content: { type: String, required: true },
//   hashtags: [String],
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   createdAt: { type: Date, default: Date.now }
// });

// const Post = mongoose.model('Post', postSchema);

// export default Post;
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, index: 'text' }, // add text index for search
  hashtags: [{ type: String, lowercase: true, trim: true, index: true }], // index for fast hashtag queries
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now, index: true }, // index for sorting by date
  // optional: add a field for number of comments if you track comments separately
  commentsCount: { type: Number, default: 0 },
});

// Create a text index on 'content' and optionally on 'hashtags' for text search
postSchema.index({ content: 'text', hashtags: 'text' });

const Post = mongoose.model('Post', postSchema);

export default Post;
