import React from 'react';
// redirect to another route, retrieves username from the URL
import { Redirect, useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import FriendList from '../components/FriendList';
import CommentForm from '../components/CommentForm';

import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  // useParams Hook retrieves the username from the URL which is then passed to the useQuery Hook
  // if no userParam from the URL bar, use value to run QUERY_ME( ex. visit /profile while logged in)
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });
  // when QUERY_ME, return data in the me property, QUERY_USER, return data.user
  const user = data?.me || data?.user || {};
  const [addFriend] = useMutation(ADD_FRIEND);

  // redirect to personal profile page if username is the logged-in user's
  // check to see if username stored in the JSON Web Token is the same as the userParam 
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    try {
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {userParam && (
          <button className="btn ml-auto" onClick={handleClick}>
            Add Friend
          </button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <CommentList comments={user.comments} title={`${user.username}'s comments...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <CommentForm />}</div>
    </div>
    
  );
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }
};

export default Profile;
