import React, { useEffect, useState, useRef } from 'react';
import { getCurrentWindow, PhysicalSize, PhysicalPosition, currentMonitor } from '@tauri-apps/api/window';
import './Capsule.css';

const Capsule = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const componentRef = useRef(null);

  const getBottomCenterPosition = async (winWidth, winHeight, marginFromBottom = 20) => {
    const monitor = await currentMonitor();
    if (!monitor) return { x: 0, y: 0 };

    const screenWidth = monitor.size.width;
    const screenHeight = monitor.size.height;
    
    console.log(monitor, screenWidth, screenHeight, winWidth, winHeight, marginFromBottom);

    const x = Math.floor((screenWidth - winWidth) / 2);
    const y = screenHeight - winHeight - marginFromBottom;
  
    return { x, y };
  };
  
  const expandCapsule = async () => {
    const width = (await getCurrentWindow().outerSize()).width;
    const height = (await getCurrentWindow().outerSize()).height;
    const pos = await getBottomCenterPosition(width, height, 90); // hover above taskbar
  
    console.log('Expanding capsule to:', pos.x, pos.y, width, height);
    
    // await getCurrentWindow().setSize(new PhysicalSize( width, height ));
    await getCurrentWindow().setPosition(new PhysicalPosition(pos.x, pos.y));
    setIsExpanded(true);
  };
  
  const collapseToNotch = async () => {
    const width = (await getCurrentWindow().outerSize()).width;
    const height = (await getCurrentWindow().outerSize()).height;
    const pos = await getBottomCenterPosition(width, height, 20); // small notch lower
  
    // await getCurrentWindow().setSize(new PhysicalSize( width, height ));
    await getCurrentWindow().setPosition(new PhysicalPosition(pos.x, pos.y));
    setIsExpanded(false);
  };

  useEffect(() => {
    // Initial state is notch
    // collapseToNotch();
    console.log('width', componentRef.current ? componentRef.current.offsetWidth : 0);
    
    expandCapsule();
  }, [ componentRef.current ]);

  const handleClick = () => {
    console.log('handleClick', isExpanded);
    if (!isExpanded) expandCapsule();
  };
  
  const handleDoubleClick = () => {
    console.log('handleDoubleClick', isExpanded);
    if (isExpanded) collapseToNotch();
  };

  return (
    <div
      ref={componentRef}
      className="capsule"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      data-tauri-drag-region
    >
      {isExpanded ? (
        <>
          <button className="capsule-button" data-tauri-no-drag>Settings</button>
          <button className="capsule-button" data-tauri-no-drag>Teach</button>
        </>
      ) : null}
    </div>
  );
};

export default Capsule;
