import { useContext, useState } from "react";
import { SocketContext } from "../../context/Context";
import { IoVideocam, IoVideocamOff } from "react-icons/io5";
import {
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";

const gridContainerClass =
  "flex justify-center items-center flex-col md:flex-row";
const paperClass = "p-2 border-2 border-black dark:border-white m-2 rounded-lg";
const videoClass = "sm:w-[500px] xs:w-[300px]";

function Video() {
  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    leaveCall,
  } = useContext(SocketContext);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const toggleVideo = () => {
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsVideoEnabled((prev) => !prev);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsAudioEnabled((prev) => !prev);
    }
  };

  return (
    <div className="flex justify-center items-center w-full ">
      <div className={gridContainerClass}>
        {/* My Video */}
        {stream && (
          <div className={paperClass}>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={videoClass}
            />
          </div>
        )}
        {/* User's Video */}
        {callAccepted && !callEnded && (
          <div className={paperClass}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={videoClass}
            />
          </div>
        )}
      </div>
      <div className="absolute right-0 bottom-0 bg-white dark:bg-darkBackground  items-center w-full h-14 flex justify-between px-4 shadow-lg  ">
        <div className="flex gap-2">
          {isVideoEnabled ? (
            <IoVideocam size={"25px"} onClick={toggleVideo} />
          ) : (
            <IoVideocamOff size={"25px"} onClick={toggleVideo} />
          )}
          {isAudioEnabled ? (
            <FaMicrophone size={"25px"} onClick={toggleAudio} />
          ) : (
            <FaMicrophoneSlash size={"25px"} onClick={toggleAudio} />
          )}
        </div>
        <div
          className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-700 "
          onClick={() => {
            leaveCall();
          }}
        >
          Hang Up
        </div>
      </div>
    </div>
  );
}

export default Video;
