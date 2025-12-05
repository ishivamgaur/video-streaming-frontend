import React, { useState, useRef } from "react";
import VideoUpload from "./components/VideoUpload";
import VideoList from "./components/VideoList";
import VideoPlayer from "./components/VideoPlayer";

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
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">StreamHub</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Upload & List */}
          <div className="lg:col-span-1 space-y-8">
            <section>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Upload Video
              </h2>
              <VideoUpload onUploadSuccess={handleUploadSuccess} />
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Available Videos
              </h2>
              <VideoList ref={videoListRef} onSelectVideo={setSelectedVideo} />
            </section>
          </div>

          {/* Right Panel: Player */}
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Now Playing
              </h2>
              <VideoPlayer video={selectedVideo} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
