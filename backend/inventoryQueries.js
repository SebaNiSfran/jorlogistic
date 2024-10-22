const getInventoryItems = async (pool) => {
  const [rows] = await pool.query('SELECT * FROM inventory');
  return rows;
};

const addInventoryItem = async (pool, item) => {
  const [result] = await pool.query(
    'INSERT INTO inventory (stockDate, article, stockQuantity, unitValue, stockValue, currency, lastInventory, unit, delays) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [item.stockDate, item.article, item.stockQuantity, item.unitValue, item.stockValue, item.currency, item.lastInventory, item.unit, item.delays]
  );
  return result;
};

module.exports = {
  getInventoryItems,
  addInventoryItem
};
  
  