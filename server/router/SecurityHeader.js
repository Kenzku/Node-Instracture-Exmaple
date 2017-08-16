/**
 * Created by Huang, Fuguo (aka ken) on 02/02/2017.
 */
function safetyHeader(req, res, next) {
  res.setHeader('Cache-control', 'no-store');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Vary', 'Origin');
  return next();
}

module.exports = safetyHeader;
