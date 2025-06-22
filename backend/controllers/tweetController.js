import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

// export const createTweet = async (req, res) => {
//     try {
//         const { description, id } = req.body;
//         if (!description || !id) {
//             return res.status(401).json({
//                 message: "Fields are required.",
//                 success: false
//             });
//         };
//         const user = await User.findById(id).select("-password");
        
//         await Tweet.create({
//             description,
//             userId:id,
//             userDetails:user
//         });
//         return res.status(201).json({
//             message:"Tweet created successfully.",
//             success:true,
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }


export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;

        if (!description || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        }

        const user = await User.findById(id).select("-password");

        // Extract image URLs from Cloudinary upload results
        const imageUrls = req.files?.map(file => file.path) || [];

        await Tweet.create({
            description,
            userId: id,
            userDetails: user,
            images: imageUrls
        });

        return res.status(201).json({
            message: "Tweet created successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error creating tweet:", error);
        res.status(500).json({ message: "Server error" });
    }
};





export const deleteTweet = async (req,res) => {
    try {
        const {id}  = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
            // like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAllTweetUser = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    console.log("Fetching all tweets for user:", req.params.id);
    // const {id} = req.params;
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        // const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
        //     return Tweet.find({userId:otherUsersId});
        // }));

        console.log("Logged in user tweets:", loggedInUserTweets);
        // console.log("Following user tweets:", followingUserTweet);
    
        return res.status(200).json({
            tweets:loggedInUserTweets,
        })
    } catch (error) {
        console.log(error);
    }
}




export const getAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find({})
            .populate("userId", "name profileImage") // optional: show user info
            .sort({ createdAt: -1 }); // latest tweets first

        return res.status(200).json({ tweets });
    } catch (error) {
        console.error("Error getting all tweets:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getFollowingTweets = async (req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}
 


export const getTrendingTweets = async (req, res) => {
  try {
    const tweets = await Tweet.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "commentsData"
        }
      },
      {
        $addFields: {
          engagementScore: {
            $add: [
              { $multiply: [{ $size: "$like" }, 1.5] },
              { $multiply: [{ $size: "$commentsData" }, 2.5] },
              { 
                $multiply: [
                  { 
                    $divide: [
                      { $subtract: [new Date(), "$createdAt"] },
                      1000 * 60 * 60
                    ] 
                  },
                  -1
                ] 
              }
            ]
          },
          likesCount: { $size: "$like" },
          commentsCount: { $size: "$commentsData" }
        }
      },
      // Changed to 1 for ascending order (lowest to highest)
      {
        $sort: { engagementScore: -1 }
      },
      {
        $limit: 50
      },
      {
        $project: {
          description: 1,
          images: 1,
          like: 1,
          comments: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          "userDetails._id": 1,
          "userDetails.name": 1,
          "userDetails.username": 1,
          "userDetails.email": 1,
          "userDetails.profilePicture": 1,
          engagementScore: 1,
          likesCount: 1,
          commentsCount: 1
        }
      }
    ]);

    const formattedTweets = tweets.map(tweet => ({
      ...tweet,
      userId: tweet.userDetails,
      userDetails: [tweet.userDetails],
      score: tweet.engagementScore // Explicitly add score for frontend
    }));

    return res.status(200).json({
      success: true,
      tweets: formattedTweets
    });

  } catch (error) {
    console.error("Error getting trending tweets:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching trending tweets"
    });
  }
};

// Add this to your existing tweet.controller.js
// export const getTrendingTweets = async (req, res) => {
//     try {
//         // Get all tweets with populated comments and likes
//         const tweets = await Tweet.aggregate([
//             {
//                 $lookup: {
//                     from: "comments",
//                     localField: "comments",
//                     foreignField: "_id",
//                     as: "commentsData"
//                 }
//             },
//             {
//                 $addFields: {
//                     // Calculate engagement score with weights:
//                     // 1.5% per like, 2.5% per comment, 1% for recency (newer tweets get higher score)
//                     engagementScore: {
//                         $add: [
//                             { $multiply: [{ $size: "$like" }, 1.5] }, // Likes weight
//                             { $multiply: [{ $size: "$commentsData" }, 2.5] }, // Comments weight
//                             { 
//                                 $multiply: [
//                                     { 
//                                         $divide: [
//                                             { $subtract: [new Date(), "$createdAt"] },
//                                             1000 * 60 * 60 // Convert to hours
//                                         ] 
//                                     },
//                                     -1 // Negative because newer tweets should score higher
//                                 ] 
//                             } // Recency factor
//                         ]
//                     }
//                 }
//             },
//             {
//                 $sort: { engagementScore: -1 } // Sort by score descending
//             },
//             {
//                 $limit: 50 // Limit to top 50 tweets
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "userId",
//                     foreignField: "_id",
//                     as: "author"
//                 }
//             },
//             {
//                 $unwind: "$author"
//             },
//             {
//                 $project: {
//                     description: 1,
//                     images: 1,
//                     like: 1,
//                     comments: 1,
//                     engagementScore: 1,
//                     createdAt: 1,
//                     "author.name": 1,
//                     "author.username": 1,
//                     "author.profilePicture": 1
//                 }
//             }
//         ]);

//         // Log top 5 trending tweets with their scores
//         const topTrending = tweets.slice(0, 5).map(tweet => ({
//             id: tweet._id,
//             score: tweet.engagementScore,
//             likes: tweet.like.length,
//             comments: tweet.comments.length,
//             description: tweet.description.substring(0, 50) + (tweet.description.length > 50 ? '...' : '')
//         }));

//         console.log("🚀 Top 5 Trending Tweets:", JSON.stringify(topTrending, null, 2));

//         return res.status(200).json({
//             success: true,
//             tweets
//         });

//     } catch (error) {
//         console.error("Error getting trending tweets:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error fetching trending tweets"
//         });
//     }
// };