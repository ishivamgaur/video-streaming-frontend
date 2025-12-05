import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";

function VideoPlayer({ video }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // If no video is selected, do nothing
    if (!video) return;

    // If player instance doesn't exist, create it
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        html5: {
          vhs: {
            overrideNative: true,
          },
          nativeAudioTracks: false,
          nativeVideoTracks: false,
        },
        sources: [
          {
            src: `http://localhost:5000${video.masterPlaylistUrl}`,
            type: "application/x-mpegURL",
          },
        ],
      }));

      // Initialize quality selector plugin
      player.hlsQualitySelector({
        displayCurrentQuality: true,
      });
    } else {
      // If player exists, update the source
      const player = playerRef.current;
      player.src({
        src: `http://localhost:5000${video.masterPlaylistUrl}`,
        type: "application/x-mpegURL",
      });
    }
  }, [video]);

  // Dispose player on unmount
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  if (!video) {
    return (
      <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center text-gray-400 shadow-md">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-2 text-sm">Select a video to start watching</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-bold text-gray-900">
          {video.title || video.originalName}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Quality: Auto (Adaptive Bitrate)
        </p>
      </div>
    </div>
  );
}

export default VideoPlayer;
