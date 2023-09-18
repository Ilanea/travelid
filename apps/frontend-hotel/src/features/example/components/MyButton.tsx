import React from 'react';

function MyButton() {
  const clickHandler = () => {
    console.log('click');
  };
  return (
    <button
      onClick={() => clickHandler()}
      className="bg-red-600 sm:p-2 md:p-4 text-white"
    >
      MyButton Änderun
    </button>
  );
}

export default MyButton;
