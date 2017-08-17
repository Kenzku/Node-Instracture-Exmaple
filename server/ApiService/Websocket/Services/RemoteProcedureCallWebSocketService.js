/**
 * Created by Huang, Fuguo (aka ken) on 14/09/2016.
 */
function RemoteProcedureCallWebSocketService (wsServer, shared_config) {
  const RemoteProcedureCallServiceWrapper = require('../RemoteProcedureCall/RemoteProcedureCallWrapper');

  const rpcWsService = wsServer.of('/rpc');

  const rpcService = new RemoteProcedureCallServiceWrapper(rpcWsService);

  rpcWsService.on('connection', (socket) => {

    socket.on(shared_config.websocket['rpc:joined'], () => {
      console.log('remote procedure call service is connected');
    });

    socket.on(shared_config.websocket['rpc:get-latest-config'], () => {
      /*choose at least one of the followings: */
      /*1, the following will return the config to whoever request the websocket*/
      // socket.emit(shared_config.websocket['rpc:get-latest-config'], /*put config here*/);
      /*2, the following will update the config to all pages in the front end that listen to SERVER_CONFIG_UPDATE_EVENT in GlobalNavigationStore*/
      rpcService.sendConfigViaWsService(null);
    });

    /**
     * in case the client would like to acknowledge
     */
    socket.on(shared_config.websocket['rpc:server-send-latest-config'], message => {
      console.log('rpc:server-send-latest-config', 'return from client', message);
    });

    socket.on('disconnect', () => {
      console.log('remote procedure call service is disconnected');
    });
  }); // end of 'on'

  return {
    rpcService,
    rpcWsService
  };
}

module.exports = RemoteProcedureCallWebSocketService;
