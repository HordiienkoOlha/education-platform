import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayerWithHover = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
     try {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSrc;
       }
           } catch (error) {
      console.error(error);
      // Обробити помилку 404 тут
    }
  }, [videoSrc]);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current.readyState >= 2) {
      videoRef.current.play();
    } else {
      videoRef.current.oncanplay = () => {
        videoRef.current.play();
      };
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <>
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <video ref={videoRef} muted controls={!isPlaying} width={250}></video>
      </div>
    </>
  );
};

export default VideoPlayerWithHover;
