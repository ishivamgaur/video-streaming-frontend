import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

const VideoList = forwardRef(({ onSelectVideo }, ref) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/videos");
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchVideos,
  }));

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading)
    return (
      <div className="text-gray-500 text-center py-4">Loading videos...</div>
    );
  if (error)
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  if (videos.length === 0)
    return (
      <div className="text-gray-500 text-center py-4">
        No videos found. Upload one!
      </div>
    );

  return (
    <div className="space-y-3">
      {videos.map((video) => (
        <div
          key={video._id}
          onClick={() => onSelectVideo(video)}
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 hover:border-indigo-100 group"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {video.title || video.originalName}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Ready
            </span>
          </div>
        </div>
      ))}
    </div>
  );
});

export default VideoList;
