// import React, { useState } from 'react';

// export dafault VideoPlayer = ({ firstVideoLink }) => {
//   // console.log(courseVideoPreview)

//       // const { link, previewImageLink}=courseVideoPreview
//   const [videoUrl, setVideoUrl] = useState(courseVideoPreview.link);

//   function handleVideoLoad(event) {
//     setVideoUrl(URL.createObjectURL(event.target.files[0]));
//   }

//   function handleMouseEnter() {
//     const video = document.getElementById('video');
//     video.muted = false;
//     video.play();
//   }

//   function handleMouseLeave() {
//     const video = document.getElementById('video');
//     video.muted = true;
//     video.pause();
//     video.currentTime = 0;
//   }
//     const videoEl = document.getElementById('video');

// videoEl.muted = true;
// videoEl.play();

// document.body.addEventListener('mouseover', () => {
//   videoEl.muted = false;
// });

  // return (
  //   <div>
      {/* <video
        id="video"
        controls
        src={videoUrl}
        // poster={`${previewImageLink}.webp`}
        autoPlay="true"
        muted="true"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onChange={handleVideoLoad}
      /> */}
//       <video controls src={firstVideoLink} ></video>
//       <video controls autoPlay={true} muted={true}>
//         <source
//           src={firstVideoLink}
//           type="video/webm"
//         />
//       </video>
//     </div>
//   );
// };
