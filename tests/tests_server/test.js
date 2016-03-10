const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/images_app_test';
/* eslint-disable no-unused-vars */
const server = require(__dirname + '/../server.js');
const Images = require(__dirname + '/../models/imageModel.js');

describe('the images api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to GET all images from db', (done) => {
    chai.request('localhost:3000')
      .get('/api/images')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should save an image with POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/images')
      .send({image: 'imgs/favicon.png'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.fullName).to.eql('imgs/favicon.png');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require an image already be in the db', () => {
    beforeEach((done) => {
      Image.create({image: 'imgs/favicon.png'}, (err, data) => {
        this.testImage = data;
        done();
      });
    });

  it('should be able to DELETE an image', (done) => {
    chai.request('localhost:3000')
      .delete('/api/images/' + this.testImage._id)
      .send({image: 'imgs/favicon.png'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('image deleted');
        done();
      });
  });
  });
});
