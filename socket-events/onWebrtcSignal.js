import { io } from "../server.js";

const onWebrtcSignal = async (data) => {
    console.log("data", data);
  if (data.isCaller) {
    if (data.ongoingCall.participants.receiver.socket) {
      console.log(
        "in func1  : ",
        data.ongoingCall.participants.receiver.socket
      );
      io.to(data.ongoingCall.participants.receiver.socket).emit(
        "webrtcSignal",
        data
      );
    }
  } else {
    io.to(data.ongoingCall.participants.caller.socket).emit(
      "webrtcSignal",
      data
    );
  }
};

export default onWebrtcSignal;
