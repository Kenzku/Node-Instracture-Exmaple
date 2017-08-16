/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
const shared_config = require(process.env.SHARED_CONFIG_PATH);

function WebSocketService(server) {
  const wsServer = require('socket.io')(server);
  /*ioa services web socket services*/

  // Remote Procedure Call Service
  const rpcHandler = require('./services/RemoteProcedureCallWebSocketService')(wsServer, shared_config);

  return {
    rpcHandler
  };

}

module.exports = WebSocketService;

