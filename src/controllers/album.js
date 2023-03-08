const db = require('../db/index.js');

const createAlbum = async (req, res) => {
    const { id } = req.params
    const { name, year } = req.body
  
    try {
      const { rows: [ album ] } = await db.query(`INSERT INTO Albums (name, year, artist_id) VALUES ($1, $2, $3) RETURNING *`, [name, year, id])
      res.status(201).json(album)
    } catch (err) {
      console.log (err.message)
      res.status(500).json(err.message)
    }
  }

  module.exports = { 
    createAlbum,
  }