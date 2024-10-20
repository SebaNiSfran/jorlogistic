async function authenticate(pool, username, password) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    return rows[0];
  }
  
  module.exports = {
    authenticate
  };