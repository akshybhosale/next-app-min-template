import React, { useState } from 'react';

const Followdiv = ({ ...props }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleToggleFollow = () => {
    setIsFollowing(prevState => !prevState);
  };


  return (
    <div onClick={handleToggleFollow} { ...props }>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </div>
  );
};

export default Followdiv;
