const { expect } = require('chai')
const request = require('supertest')
const db = require('../src/db')
const app = require('../src/app')

describe('create album', () => {
  let artist
  beforeEach(async () => {
    const { rows } = await db.query('INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *', [
      'David Bowie',
      'Glam Rock',
    ])
    artist = rows[0]
  })
    describe('/artists/1/albums', () => {
      describe('POST', () => {
        it('creates a new album in the database for artist ID of 1', async () => {
          const { status, body } = await request(app).post(`/artists/${artist.id}/albums`).send({
            name: 'Hunky Dory',
            year: 1971
          });
  
          expect(status).to.equal(201);
          expect(body.name).to.equal('Hunky Dory');
          expect(body.year).to.equal(1971);

          const {
            rows: [albumData],
          } = await db.query(`SELECT * FROM Albums WHERE id = ${body.id}`);
          expect(albumData.name).to.equal('Hunky Dory');
          expect(albumData.year).to.equal(1971);
        });
      });
    });
  });