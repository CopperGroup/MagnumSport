import { useState, useEffect } from "react";

const videoSources = {
  mobile: "/assets/video-480p.mp4",
  tablet: "/assets/video-720p.mp4",
  desktop: "/assets/video-1080p.mp4",
};

export function useOptimizedVideo(defaultSrc = "/assets/video.mp4") {
  const [src, setSrc] = useState(defaultSrc);

  useEffect(() => {
    const updateSource = () => {
      const width = window.innerWidth;
      if (width < 640) setSrc(videoSources.mobile);
      else if (width < 1024) setSrc(videoSources.tablet);
      else setSrc(videoSources.desktop);
    };

    updateSource();
    window.addEventListener("resize", updateSource);
    return () => window.removeEventListener("resize", updateSource);
  }, []);

  return src;
}
