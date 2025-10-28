import React, { useState, useRef } from 'react';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoListRef = useRef();

  const handleUploadSuccess = () => {
    // After a successful upload, tell the VideoList to refresh
    if (videoListRef.current) {
      videoListRef.current.fetchVideos();
    }
  };

  return (
    <div className="App">
      <header>
        <h1>My OTT Platform</h1>
      </header>
      <main>
        <div className="left-panel">
          <VideoUpload onUploadSuccess={handleUploadSuccess} />
          <VideoList ref={videoListRef} onSelectVideo={setSelectedVideo} />
        </div>
        <div className="right-panel">
          <VideoPlayer video={selectedVideo} />
        </div>
      </main>
    </div>
  );
}

export default App;
