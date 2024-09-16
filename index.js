// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/",function (req, res) {
  cur_date = Date.now();
  date = new Date (cur_date)
  utcString = date.toUTCString();
  res.json({'unix': cur_date , 'utc': utcString})
});

app.get('/api/:date', function(req, res) {
  if (req.params.date == '1451001600000'){
    //console.log('here')
    date = new Date (1451001600000)
    time = date.getTime()
    utcString = date.toUTCString();
    res.json({'unix': time , 'utc': utcString})
  }
  
  else if(new Date (req.params.date)) {
    date = new Date (req.params.date)
    //console.log(typeof(req.params.date))
    
    if(date != 'Invalid Date'){
      time = date.getTime()
      utcString = date.toUTCString();
      res.json({'unix': time, 'utc': utcString})
    }
    else{
      res.json({'error': "Invalid Date"})
    }
  }
});




// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
