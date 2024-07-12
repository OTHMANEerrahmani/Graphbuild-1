import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer/simplepeer.min.js";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_APP_SOCKET}`);

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [callAccepted, setCallAccepted] = useState(false);
  const [getPermission, setGetPermission] = useState(false);

  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef(null);
  const userVideo = useRef();
  const connectionRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8800");

    socket.current.on("callUser", ({ from, signal, name }) => {
      console.log("Client received 'callUser' event");
      setCall({ isReceivingCall: true, from, signal });
    });

    if (connectionRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          if (myVideo.current) {
            myVideo.current.srcObject = currentStream;
          }
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    }
  }, [connectionRef]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;

    navigate("/video-call");
  };

  const callUser = (me, id) => {
    setMe(me);
    setGetPermission(true);

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on("callAccepted", (signal) => {
      console.log("Received 'callAccepted' event");
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
    navigate("/video-call");
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }

    setStream(null);
    navigate("/");
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
