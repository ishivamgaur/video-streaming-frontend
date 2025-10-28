import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

function VideoPlayer({ video }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  console.log("Video in Player--", video);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (!playerRef.current) {
      const player = videojs(videoElement, {
        autoplay: false, 
        controls: true,
        responsive: true,
        fluid: true,
      });
      playerRef.current = player;
    } else {
      const player = playerRef.current;
    }

    return () => {
    };
  }, []); 

  useEffect(() => {
    const player = playerRef.current;

    if (player && video && video.masterPlaylistUrl) {
      player.src({
        src: `http://localhost:5000${video.masterPlaylistUrl}`,
        type: "application/x-mpegURL",
      });
      player.play(); 
    }

    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        // player.reset(); // Optional: reset player state between videos
      }
    };
  }, [video]);

  return (
    <div className="video-player-container">
      {video ? <h2>Now Playing: {video.title}</h2> : <h2>Video Player</h2>}
      <div data-vjs-player style={{ display: video ? "block" : "none" }}>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          playsInline
        />
      </div>
      {!video && (
        <div className="video-player-placeholder ">Select a video to play.</div>
      )}
    </div>
  );
}

export default VideoPlayer;
