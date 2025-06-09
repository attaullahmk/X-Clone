import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';

const FollowingList = ({ userId }) => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${USER_API_END_POINT}/follow/${userId}/following`, { withCredentials: true });
        setFollowingUsers(res.data);
      } catch (err) {
        setError('Failed to load following users.');
        console.error('Failed to fetch following users:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFollowing();
    }
  }, [userId]);

  if (loading) return <p>Loading following...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!followingUsers.length) return <p>This user is not following anyone yet.</p>;

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Following</h3>
      <ul>
        {followingUsers.map(user => (
          <li key={user._id} className="py-2 border-b border-gray-200 flex items-center space-x-3">
            {/* Add avatar if you have user.avatar or use a placeholder */}
            <img
              src={user.avatar || 'https://via.placeholder.com/40'}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">@{user.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
