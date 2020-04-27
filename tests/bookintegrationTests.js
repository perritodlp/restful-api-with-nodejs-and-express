require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');
const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = { title: 'My Book', author: 'Fer', genre: 'Terror' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results.body);
        results.body.read.should.equal(false);
        // results.body.author.should.equal('Fer');
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    // mongoose.connection.close()
    //   .then(() => {
    //     console.log('Database connection closed');
    //   }).catch((err) => {
    //     console.log('ERROR on database disconnection', err);
    //   });
    app.server.close(done());
  });
});
