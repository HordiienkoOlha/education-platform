import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayerForLesson = ({ videoSrc, courseId, lessonId }) => {
  const videoRef = useRef(null);
  const [timeWatched, setTimeWatched] = useState(0);
  const savedTimeWatched = localStorage.getItem(
    `timeWatched_${courseId}_${lessonId}`
  );

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.destroy();
        saveTimeWatched();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoSrc;
    }

    if (savedTimeWatched) {
      setTimeWatched(parseInt(savedTimeWatched));
    }
  }, [videoSrc, savedTimeWatched]);

  const onTimeUpdate = () => {
    setTimeWatched(videoRef.current.currentTime);
  };

  const saveTimeWatched = () => {
    localStorage.setItem(`timeWatched_${courseId}_${lessonId}`, timeWatched);
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        width={250}
        onTimeUpdate={onTimeUpdate}
      ></video>
      <div>Time watched: {timeWatched.toFixed(2)} seconds</div>
    </div>
  );
};

export default VideoPlayerForLesson;
