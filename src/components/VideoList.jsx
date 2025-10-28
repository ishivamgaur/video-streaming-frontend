import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const VideoList = forwardRef(({ onSelectVideo, onVideosFetched }, ref) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchVideos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/videos');
      const data = await response.json();
      if (response.ok) {
        setVideos(data);
        if (onVideosFetched) {
          onVideosFetched(data);
        }
      } else {
        setError(data.error || 'Failed to fetch videos.');
      }
    } catch (err) {
      setError('Network error or server is down.');
    } finally {
      setLoading(false);
    }
  };

  // Expose fetchVideos to the parent component via ref
  useImperativeHandle(ref, () => ({
    fetchVideos,
  }));

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="video-list-container">
      <h2>Available Videos</h2>
      <button onClick={fetchVideos} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh List'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading videos...</p>}
      {!loading && videos.length === 0 && <p>No videos available. Upload one to get started!</p>}
      <ul>
        {videos.map((video) => (
          <li key={video._id}>
            <span>{video.title}</span>
            <button onClick={() => onSelectVideo(video)}>Watch Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default VideoList;
