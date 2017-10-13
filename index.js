//Require necessary modules
const EPub = require("epub");
const fse = require('fs-extra');
const jsonfile = require('jsonfile');
const mkdirp = require('mkdirp');

//Read Test Epubs directory
var files = fse.readdirSync('Test Epubs/');

//Loop through files to extract metadata
files.forEach(filename => {
	var epub = new EPub("Test Epubs/" + filename, "/imagewebroot/", "/articlewebroot/");
	
	epub.on("error", function(error){
	    console.log("Error accessing epub file\n");
	    throw error;
	});

	epub.on("end", function(error){

		//Get metadata
		metadata = getMetadata(epub);

		if (metadata) {
			//Create directory folders
			directory = createDirFolders(filename);

			//Write JSON file
			filePath = createJSON(directory,metadata);
		}
		
	});

	epub.parse();
});

function createDirFolders(filename){
	//Get filename only to create directory
	var directory = filename.replace(/\..+$/, '');

	mkdirp(directory + "/", function (error) {
		if (error) {
		    console.error("Error creating directory - " + error.message);
		}
	});

	return directory;
}

function getMetadata(epub){
	//Gather metadata and create the objects in right format
	if (epub.metadata.title && epub.metadata.creator){
	var object = {title: epub.metadata.title, contributors: epub.metadata.creator};
	var metadata = JSON.stringify(object,null,4);
	return metadata;
	}
	else {
		return console.log("Missing metadata");
	}
}

function createJSON(directory,metadata){
	var path = directory + "/index.json";
	fse.writeFile(path, metadata, function (error) {
		 if (error) {
		   return console.log("Error creating JSON file - " + error.message);
		 }
		 else {
		 	return filePath;
		 }
	});
}

module.exports.createDirFolders = createDirFolders;
module.exports.getMetadata = getMetadata;
module.exports.createJSON = createJSON;
