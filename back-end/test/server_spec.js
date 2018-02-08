let expect = require('chai').expect;
let request = require('request');
let rtdAuths = require('../config/env');
let GTFS = require('gtfs-realtime-bindings');

describe('RTD API Call',()=>{
    let reqError;
    let reqBody;
    let feed;
	let requestSettings = {
	  method: 'GET',
	  url: 'https://www.rtd-denver.com/google_sync/TripUpdate.pb',
	  auth:{
		user: rtdAuths.rtdUser,
		pass: rtdAuths.rtdPassword,
		sendImmediately: false
		},
	  encoding: null
    };
    before((done)=>{
        request(requestSettings,(error, response, body)=>{
            reqError = error;
            reqBody = body;
            feed = GTFS.FeedMessage.decode(body);
            done();
        });
    });
    it("Should not return an error on request", ()=>{
        expect(reqError).to.not.be.true;
    });
    it("Should return a body on request", ()=>{
        expect(reqBody).to.exist;
    });
    it("Should decode the data", ()=>{
        console.log(typeof(feed.entity));
        expect(typeof(feed.entity)).to.eq('object');
    });
    it("Should return trip updates",()=>{
        let i = 0;
        while(!feed.entity[i].trip_update && i<20000){
            ++i
        }
        expect(feed.entity[i].trip_update.trip.trip_id).to.exist;
    })
});