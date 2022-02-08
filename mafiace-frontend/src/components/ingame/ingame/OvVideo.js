import React, { useRef, useEffect } from "react";

const OpenViduVideoComponen = ({ streamManager }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager && videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);

  return (
    <>
      <video autoPlay={true} ref={videoRef} />
    </>
  );
};

export default OpenViduVideoComponen;
