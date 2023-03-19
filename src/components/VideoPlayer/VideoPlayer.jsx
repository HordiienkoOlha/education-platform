import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoSrc;
    }
  }, [videoSrc]);

  return (
    <div>
      <video ref={videoRef} controls width={300}></video>
    </div>
  );
};

export default VideoPlayer;
