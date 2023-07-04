var express = require("express");
var app = express();

// Defining the listening port:

const port = 3001;

// App settings:

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/scripts"));

// Retrieving the data from the JSON file
// Choose below between the populated and the empty JSON file (default = populated):

var data = require("./data/mockContacts - Populated.json");
//var data = require("./data/mockContacts - Empty.json");

// Sorting the data in alphabetical order:

data = [...data].sort((a, b) => a.name.localeCompare(b.name));

// Variables to be used on the rendering process, initillay empty:

var newData = null;
var name = null;

// Defining the route and response to a client request:

app.get("/", function(req, res) {
	
	if (typeof req.query.name !== "undefined") {  
		name = req.query.name;
		newData = data.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
	}
  
	else {
		name = null;
		newData = data;
	}
  
	res.render("./index", { contactList: newData, name: name });

});

// Console logging:

app.listen(port, () => {
	
	console.log(`Now listening on port ${port}!`);

});