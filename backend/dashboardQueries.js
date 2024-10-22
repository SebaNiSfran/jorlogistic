const getTrendAnalysis = async (pool, year) => {
  console.log('Executing getTrendAnalysis query for year:', year);
  const [rows] = await pool.query('SELECT month, mantencion, crecimiento FROM trend_analysis WHERE year = ? ORDER BY month', [year]);
  console.log('Query result:', rows);
  
  const labels = rows.map(row => row.month);
  const mantencion = rows.map(row => row.mantencion);
  const crecimiento = rows.map(row => row.crecimiento);

  return { labels, mantencion, crecimiento };
};

const getProcessStatus = async (pool, date) => {
  console.log('Executing getProcessStatus query for date:', date);
  const [rows] = await pool.query('SELECT procesados, pendientes, cancelados FROM process_status WHERE date = ?', [date]);
  console.log('Query result:', rows);
  
  if (rows.length === 0) {
    return { procesados: 0, pendientes: 0, cancelados: 0 };
  }

  return rows[0];
};

module.exports = {
  getTrendAnalysis,
  getProcessStatus
};