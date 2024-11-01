import {io} from '../server.js'

const onCall = async(participants) => {
    if(participants.receiver.socket) {
        io.to(participants.receiver.socket).emit('incomingCall',participants)
    }
}
export default onCall;