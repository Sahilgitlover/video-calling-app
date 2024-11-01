import React, { useEffect, useRef } from "react";

interface iVideoContainer {
  stream: MediaStream | null;
  isLocalStream: boolean;
  isOnCall: boolean;
}

const VideoContainer = ({ stream, isLocalStream, isOnCall }:iVideoContainer) => {

    const videoRef = useRef<HTMLVideoElement> (null)

    useEffect(() => {
        if(videoRef.current && stream) {
            console.log("streamReal : ",stream);
            videoRef.current.srcObject = stream;
        }
    },[stream])

    if(!isLocalStream) {
        console.log("stream : ",stream);
    }

  return (
    <video
      className="rounded border w-[800px]"
      autoPlay
      playsInline
      muted={isLocalStream}
      ref={videoRef}
    ></video>
  );
};

export default VideoContainer;
