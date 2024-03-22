import React from 'react';

function ProfileIcon({ fullName }) {
  
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() : '';
  const lastName = nameParts.length > 1 ? nameParts[1].charAt(0).toUpperCase() : '';

  return (
    <div className="profile-icon">
      <span>{firstName}{lastName}</span>
    </div>
  );
}

export default ProfileIcon;
