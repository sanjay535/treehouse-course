var EventEmitter = require("events");
var http = require("http");
var https=require("https");
var util = require("util");

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */
function Profile(username) {
    console.log(typeof EventEmitter)
    console.log('before =',this);
    EventEmitter.call(this);
    console.log('after =',this);
    profileEmitter = this;

    //Connect to the API URL (http://teamtreehouse.com/username.json)
    // "http://teamtreehouse.com/" + username + ".json"
    var request = https.get('https://jsonplaceholder.typicode.com/users', function(response) {
        var body = "";
        // console.log('response = ',response)
        if (response.statusCode !== 200) {
            request.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        response.on('end', function () {
            if(response.statusCode === 200) {
                try {
                    //Parse the data
                    var profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error){
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter);

module.exports = Profile;