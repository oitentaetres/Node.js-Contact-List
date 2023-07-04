var express = require("express");
var app = express();

// Retrieving the data from the JSON file:

var data = require("./data/mockContacts.json");

// Putting the data in alphabetical order:

data = [...data].sort((a, b) => a.name.localeCompare(b.name));

var newData = undefined;

const port = 3001;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/scripts"));

app.get("/", function(req, res) {

	var name = undefined;
	
	if (typeof req.query.name !== "undefined") {  
		let name = req.query.name;
		newData = data.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
	}
  
	else {
		newData = data;
	}
  
	res.render("./index", { contactList: newData, name: name });

});

app.listen(port, () => {
	
	console.log(`Now listening on port ${port}!`);

});