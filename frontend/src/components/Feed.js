import React from 'react';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import CreatePost from './CreatePost.js';
import Tweet from './Tweet.js';
import Bookmarks from "./BookMark.js";

const Feed = () => {
  const { tweets } = useSelector(store => store.tweet);
  const { user } = useSelector(store => store.user);
  const location = useLocation();

  const isBookmarksPage = location.pathname === '/bookmarks';

  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
        {isBookmarksPage ? (
          
          <Bookmarks />
        ) : (
          <>
            <CreatePost />
            {tweets?.map((tweet) => (
              <Tweet key={tweet?._id} tweet={tweet} userId={user?._id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;

