import {io} from '../server.js'

const onHangup = async(data) => {
    let socketIdToEmitTo;

    if(data.ongoingCall.participants.caller.userId === data.userHangingupId){
        socketIdToEmitTo = data.ongoingCall.participants.receiver.socket
    }
    else{
        socketIdToEmitTo = data.ongoingCall.participants.caller.socket
    }
    if(socketIdToEmitTo) {
        
        io.to(socketIdToEmitTo).emit('hangup',data)
    }
}
export default onHangup;