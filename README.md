# epub-tests
ePub meta information extraction (required)

We have a large set of ePub files (over 1000) that need the metainformation (title/author) extracted. Attached are the first 5 files as a sample.

Create a new node.js project with the package epub (https://www.npmjs.com/package/epub) as a dependency

Setup once node.js and npm is installed

npm init
npm install epub --save

Use the ePub module to read in the attached 5 files, output the following meta information template below (if present) as a JSON file called index.json in a folder structure with the ePub name then index.json for example 1.epub would be stored in /1/index.json

Meta Information template example:

{
	“title":"Horace: Odes and Epodes",
	"contributors":["Horace”]
}


(Required) Write some unit tests in mocha https://mochajs.org/ for the code above.
