// // import Post from '../models/exploreSchema.js';  // use import if model is ES module

// // export const getExplorePosts = async (req, res) => {
// //   try {
// //     const sortBy = req.query.sortBy || 'recent';

// //     let posts;

// //     if (sortBy === 'popular') {
// //       posts = await Post.find({})
// //         .sort({ 'likes.length': -1 })
// //         .limit(20)
// //         .populate('userId', 'username profilePicture');
// //     } else {
// //       posts = await Post.find({})
// //         .sort({ createdAt: -1 })
// //         .limit(20)
// //         .populate('userId', 'username profilePicture');
// //     }

// //     res.status(200).json(posts);
// //   } catch (error) {
// //     console.error('Error fetching explore posts:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };


// import Post from '../models/exploreSchema.js';

// export const getExplorePosts = async (req, res) => {
//   try {
//     const sortBy = req.query.sortBy || 'recent';

//     let posts;

//     if (sortBy === 'popular') {
//       // Use aggregation to sort by number of likes
//       posts = await Post.aggregate([
//         {
//           $addFields: {
//             likesCount: { $size: "$likes" }
//           }
//         },
//         {
//           $sort: { likesCount: -1 }
//         },
//         { $limit: 20 },
//         {
//           $lookup: {
//             from: 'users',       // MongoDB collection name for users
//             localField: 'userId',
//             foreignField: '_id',
//             as: 'user'
//           }
//         },
//         {
//           $unwind: "$user"
//         },
//         {
//           $project: {
//             content: 1,
//             likes: 1,
//             userId: "$user._id",
//             user: {
//               username: "$user.username",
//               profilePicture: "$user.profilePicture"
//             },
//             createdAt: 1
//           }
//         }
//       ]);
//     } else {
//       // Sort by most recent
//       posts = await Post.find({})
//         .sort({ createdAt: -1 })
//         .limit(20)
//         .populate('userId', 'username profilePicture');
//     }

//     res.status(200).json(posts);
//   } catch (error) {
//     console.error('Error fetching explore posts:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import Post from '../models/exploreSchema.js';

export const getExplorePosts = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'recent';
    const hashtag = req.query.hashtag;  // optional filter by hashtag
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Base match filter (if hashtag provided)
    const matchFilter = hashtag ? { hashtags: hashtag } : {};

    let posts;

    if (sortBy === 'popular') {
      // Aggregate pipeline for popular posts with hashtag filter and pagination
      posts = await Post.aggregate([
        { $match: matchFilter },
        { $addFields: { likesCount: { $size: "$likes" } } },
        { $sort: { likesCount: -1, createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: "$user" },
        {
          $project: {
            content: 1,
            likesCount: 1,
            likes: 1,
            hashtags: 1,
            userId: "$user._id",
            user: {
              username: "$user.username",
              profilePicture: "$user.profilePicture"
            },
            createdAt: 1
          }
        }
      ]);
    } else {
      // For recent, find + sort by createdAt with filter, pagination, and populate
      posts = await Post.find(matchFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'username profilePicture')
        .lean();

      // Add likesCount field for frontend convenience
      posts = posts.map(post => ({
        ...post,
        likesCount: post.likes?.length || 0,
        user: {
          username: post.userId.username,
          profilePicture: post.userId.profilePicture,
          _id: post.userId._id
        }
      }));
    }

    res.status(200).json({ success: true, posts, page, limit });
  } catch (error) {
    console.error('Error fetching explore posts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

