import React from 'react';

interface VideoPopupProps {
  videoSrc: string;
  onClose: () => void;
  size?: 'small' | 'large';
}

const VideoPopup: React.FC<VideoPopupProps> = ({ videoSrc, onClose, size = 'small' }) => {
  const containerClass = size === 'large'
    ? 'w-[32rem] max-w-[98vw]'
    : 'w-80 max-w-[90vw]';
  const videoClass = size === 'large'
    ? 'h-80'
    : 'h-44';
  return (
    <div className={`fixed bottom-6 right-6 z-[200] bg-black/90 rounded-xl shadow-lg p-2 flex flex-col items-end ${containerClass}`}>
      <button
        onClick={onClose}
        className="text-white text-lg font-bold mb-1 hover:text-gray-300"
        aria-label="Close video"
      >
        ×
      </button>
      <video
        src={videoSrc}
        autoPlay
        controls
        onEnded={onClose}
        className={`rounded-lg w-full object-cover bg-black ${videoClass}`}
        style={{ minWidth: 0 }}
      />
    </div>
  );
};

export default VideoPopup; 