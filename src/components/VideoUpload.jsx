import React, { useState } from 'react';

function VideoUpload({ onUploadSuccess }) {
  const [title, setTitle] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!videoFile) {
      setError('Please select a video file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    // The key 'video' must match `upload.single('video')` on your backend
    formData.append('video', videoFile);
    formData.append('title', title || videoFile.name);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setTitle('');
        setVideoFile(null);
        // Notify the parent component to refresh the video list
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      } else {
        setError(data.error || 'Upload failed.');
      }
    } catch (err) {
      setError('Network error or server is down.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-upload-container">
      <h2>Upload New Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Video Title (optional):</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>
        <div>
          <label htmlFor="videoFile">Select Video File:</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default VideoUpload;
