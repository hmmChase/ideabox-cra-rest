const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = (process.env.NODE_ENV = 'test');
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

chai.use(chaiHttp);

describe('CLIENT routes', () => {
  it('returns html on root endpoint', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });

  it('returns 404 for routes that do not exist', done => {
    chai
      .request(server)
      .get('/sadpath')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.string;
        done();
      });
  });
});

describe('API routes', () => {
  beforeEach(done => {
    knex.migrate
      .rollback()
      .then(() =>
        knex.migrate.latest().then(() => knex.seed.run().then(() => done()))
      );
  });

  // ===========================================================
  // ========== GET ============================================
  // ===========================================================
  describe('GET /api/v1/ideas', () => {
    it('returns array of all ideas', done => {
      chai
        .request(server)
        .get('/api/v1/ideas')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(1);
          res.body[0].should.have.property('idea');
          res.body[0].idea.should.equal(
            'If you dig it, do it. If you dig it a lot, do it twice.'
          );
          res.body[0].should.have.property('created_at');
          res.body[0].should.have.property('updated_at');
          done();
        });
    });
  });

  describe('GET /api/v1/ideas/:id', () => {
    it('returns array of idea matching ID', done => {
      chai
        .request(server)
        .get('/api/v1/ideas/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(1);
          res.body[0].should.have.property('idea');
          res.body[0].idea.should.equal(
            'If you dig it, do it. If you dig it a lot, do it twice.'
          );
          res.body[0].should.have.property('created_at');
          res.body[0].should.have.property('updated_at');
          done();
        });
    });

    it('returns error if ID of idea not found', done => {
      chai
        .request(server)
        .get('/api/v1/ideas/2')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Idea ID 2 not found.');
          done();
        });
    });
  });

  // ===========================================================
  // ========== POST ===========================================
  // ===========================================================
  describe('POST /api/v1/ideas', () => {
    it('adds idea to database and returns it with ID', done => {
      chai
        .request(server)
        .post('/api/v1/ideas')
        .send({
          idea: 'mock idea'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.id.should.equal(2);
          res.body.should.have.property('idea');
          res.body.idea.should.equal('mock idea');
          res.body.should.have.property('created_at');
          res.body.should.have.property('updated_at');
          done();
        });
    });

    it('returns error if missing property', done => {
      chai
        .request(server)
        .post('/api/v1/ideas')
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Missing idea.');
          done();
        });
    });
  });

  // ===========================================================
  // ========== PUT ============================================
  // ===========================================================
  describe('PUT /api/v1/ideas/:id', () => {
    it('updates idea content for idea matching ID', done => {
      chai
        .request(server)
        .put('/api/v1/ideas/1')
        .send({
          id: 1,
          idea: 'You dig?'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(1);
          res.body[0].should.have.property('idea');
          res.body[0].idea.should.equal('You dig?');
          res.body[0].should.have.property('created_at');
          res.body[0].should.have.property('updated_at');
          done();
        });
    });

    it('returns error if ID of idea not found', done => {
      chai
        .request(server)
        .put('/api/v1/ideas/2')
        .send({ id: 2, idea: 'mock idea' })
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Idea ID 2 not found.');
          done();
        });
    });

    it('returns error if missing idea', done => {
      chai
        .request(server)
        .put('/api/v1/ideas/2')
        .send({})
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Missing idea.');
          done();
        });
    });
  });

  // ===========================================================
  // ========== DELETE =========================================
  // ===========================================================
  describe('DELETE /api/v1/ideas/:id', () => {
    it('deletes idea matching ID', done => {
      chai
        .request(server)
        .delete('/api/v1/ideas/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal('Idea ID 1 deleted.');
          done();
        });
    });

    it('returns error if ID of idea not found', done => {
      chai
        .request(server)
        .get('/api/v1/ideas/2')
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('Idea ID 2 not found.');
          done();
        });
    });
  });
});
