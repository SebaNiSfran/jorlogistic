async function getTrendAnalysis(pool, year) {
    const [rows] = await pool.query(
      `SELECT month, maintenance, growth 
       FROM trend_analysis 
       WHERE year = ? 
       ORDER BY FIELD(month, 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre')`,
      [year]
    );
    return rows;
  }
  
  async function getProcessStatus(pool, date) {
    const [rows] = await pool.query(
      'SELECT status, count FROM process_status WHERE date = ?',
      [date]
    );
    return rows;
  }
  
  module.exports = {
    getTrendAnalysis,
    getProcessStatus
  };