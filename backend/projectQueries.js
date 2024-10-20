async function getProjects(pool) {
    const [rows] = await pool.query('SELECT * FROM projects');
    return rows;
  }
  
  module.exports = {
    getProjects
  };