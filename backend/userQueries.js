async function getUsers(pool) {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
  }
  
  module.exports = {
    getUsers
  };