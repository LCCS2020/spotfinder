var http = require('http');
const exec = require("child_process").exec;

var rooms = []
room = {}
room.location = 'Eagles' 
room.number = '10' 
room.available = true 
rooms.push(room)

room = {}
room.location = 'Drake' 
room.number = '12' 
room.available = false 
rooms.push(room)

room = {}
room.location = 'Commons' 
room.number = '15' 
room.available = true 
rooms.push(room)


function getAvailRooms() {
  return rooms.filter(room => room.available)
}

http.createServer(function (req, res) {
    let body = [];
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      res.on('error', (err) => {
        console.error(err);
      });
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      roomsList = []
      if (req.url == '/all') {
          roomsList = rooms
      } else if (req.url == '/avail') {
                roomsList = getAvailRooms()
      }         
      res.end(JSON.stringify(roomsList));
    });      
}).listen(4390); 