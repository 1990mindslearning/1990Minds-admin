import socketIOClient from "socket.io-client";
import {keyUri} from './key'

  const socket = socketIOClient(keyUri.SOCKET_URI,{ transports: ['websocket', 'polling', 'flashsocket'] });


export default socket
