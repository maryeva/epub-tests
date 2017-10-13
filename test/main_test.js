//Test suite
var chai = require('chai');
chai.use(require('chai-fs'));
var expect = require('chai').expect;
var should = require('chai').should();

var createDirFolders = require('../index').createDirFolders;
var getMetadata = require('../index').getMetadata;

var filename = 'testDir.epub';
var directory = 'testDir';
var epub = {"metadata": {"title": "Test title","creator": "Test Creator"}};

describe('createDirFolders', function() {

	it('should create a directory given a filename', function() {
      expect(createDirFolders(filename)).to.equal(directory);
    });
});

describe('getMetadata', function() {
	
	it('should check if metadata properties exist', function() {
      expect(getMetadata(epub)).should.be.an('object');
      epub.metadata.should.have.property('title');
      epub.metadata.should.have.property('creator');
    });
});

describe('createJSON', function() {
	var createJSON = require('../index').createJSON;

	it('should create a JSON file', function() {
      expect(createJSON(directory,getMetadata(epub))).to.be.a.file;
    });
});