import { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const videoSources = {
  slow: "/assets/videos/video-360p.mp4",
  medium: "/assets/videos/video-720p.mp4",
  fast: "/assets/videos/video-1080p.mp4",
};

const screenSizes = {
  mobile: "360p",
  tablet: "720p",
  desktop: "1080p",
};

export function useOptimizedVideo(originalVideo = "/assets/videos/original.mp4") {
  const [src, setSrc] = useState(videoSources.slow);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const ffmpeg = createFFmpeg({ log: true });

    const processVideos = async () => {
      setIsProcessing(true);
      await ffmpeg.load();

      // Convert video to different resolutions
      const resolutions = [
        { size: "640x360", name: "video-360p.mp4" },
        { size: "1280x720", name: "video-720p.mp4" },
        { size: "1920x1080", name: "video-1080p.mp4" },
      ];

      await ffmpeg.FS("writeFile", "input.mp4", await fetchFile(originalVideo));

      for (const { size, name } of resolutions) {
        await ffmpeg.run(
          "-i", "input.mp4",
          "-vf", `scale=${size}`,
          "-c:v", "libx264",
          "-crf", "23",
          "-preset", "fast",
          name
        );

        const data = ffmpeg.FS("readFile", name);
        const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
        localStorage.setItem(name, url); // Store in localStorage
      }

      setIsProcessing(false);
    };

    const checkAndGenerateVideos = async () => {
      if (!localStorage.getItem("video-360p.mp4")) {
        await processVideos();
      }
      
      let speed = "slow";
      const connection = navigator.connection || navigator?.mozConnection || navigator?.webkitConnection;
      if (connection) {
        if (connection.effectiveType.includes("4g")) speed = "fast";
        else if (connection.effectiveType.includes("3g")) speed = "medium";
      }

      let quality = screenSizes.mobile;
      const width = window.innerWidth;

      if (width >= 1024) quality = screenSizes.desktop;
      else if (width >= 640) quality = screenSizes.tablet;

      setSrc(localStorage.getItem(`video-${quality}.mp4`) || videoSources[speed]);

      setTimeout(() => {
        if (speed === "slow" && quality !== "360p") setSrc(localStorage.getItem("video-720p.mp4") || videoSources.medium);
        if (speed === "medium" && quality === "1080p") setSrc(localStorage.getItem("video-1080p.mp4") || videoSources.fast);
      }, 5000);
    };

    checkAndGenerateVideos();
  }, [originalVideo]);

  return { src, isProcessing };
}
