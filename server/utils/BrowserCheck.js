/**
 * Created by Huang, Fuguo (aka ken) on 16/08/2017.
 */
const isSafari = (userAgent) => {
  return userAgent && userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
};
module.exports = {isSafari};
