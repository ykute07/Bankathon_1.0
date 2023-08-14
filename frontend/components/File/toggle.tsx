import React, { useState } from 'react';

function ToggleButton() {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = async () => {
    try {
      // Perform the backend action based on the toggle state
      if (isActive) {
        // Make an API call to trigger the backend action when the toggle is active
        await fetch('http://127.0.0.1:5000/action', {
          method: 'POST',
        });
      } else {
        // Handle the case when the toggle is inactive
        // e.g., perform any necessary cleanup or reset operations
      }

      // Toggle the state after the API call is completed
      setIsActive(!isActive);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`bg-${isActive ? 'green' : 'gray'}-500 text-[white] px-4 py-1.5 rounded-lg text-[#181818] font-semibold  w-[240px]`}
      style={{ backgroundColor: '#EC9CD7' }}
    >
      {isActive ? 'Deactivate' : 'Activate'}
    </button>


  );
}

export default ToggleButton;