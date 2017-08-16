/**
 * Created by Huang, Fuguo (aka ken) on 22/03/2017.
 */
const Observable = require('rxjs/Observable').Observable;
const request = require('request');

const requestObservable = Observable.bindCallback(request);

module.exports = {requestObservable};
