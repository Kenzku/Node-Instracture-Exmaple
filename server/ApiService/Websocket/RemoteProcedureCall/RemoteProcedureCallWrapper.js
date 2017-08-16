/**
 * Created by Huang, Fuguo (aka ken) on 25/01/2017.
 */
const shared_config = require(process.env.SHARED_CONFIG_PATH);
class RemoteProcedureCallWrapper {
  constructor(wsService) {
    this.wsService = wsService;
  }

  getConfig(mixin = {}) {
    /*sync call*/
    let config = require('../../../utils/ReadConfig');
    config = config.getLatestConfig();
    if (!config) {
      config = Object.assign({}, {error: 'error: config is null'});
    } else {
      config = Object.assign({}, mixin, config);
    }
    return config;
  }

  sendConfigViaWsService(config = {}) {
    if (!this.wsService) {
      return null;
    }
    this.wsService.emit(shared_config.websocket['rpc:server-send-latest-config'], config);
  }
}
module.exports = RemoteProcedureCallWrapper;
