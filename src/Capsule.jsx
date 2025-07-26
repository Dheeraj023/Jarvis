import React from 'react';
import './Capsule.css';

const Capsule = () => {
  return (
    <div className="capsule" data-tauri-drag-region>
      <button className="capsule-button" data-tauri-no-drag>Settings</button>
      <button className="capsule-button" data-tauri-no-drag>Teach</button>
    </div>
  );
};

export default Capsule;
