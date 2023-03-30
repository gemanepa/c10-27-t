/* eslint-disable no-plusplus */
const categories = ['Salud', 'Educacion', 'Higiene', 'Hogar', 'Transporte', 'Comida', 'Ocio'];

const generateRandomDate = () => {
  const startDate = new Date('2022-12-01').getTime();
  const endDate = new Date().getTime();
  const randomTimestamp = Math.floor(Math.random() * (endDate - startDate + 1)) + startDate;
  const randomDate = new Date(randomTimestamp);
  return randomDate;
};

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const generateRandomAmount = () => {
  const randomAmount = Math.random() * 50;
  return `${randomAmount.toFixed(2)} USD`;
};

const generateRandomTableData = () => {
  const tableData = [];
  const usedKeys = new Set();

  for (let i = 0; i < 40; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const date = generateRandomDate();
    const amount = generateRandomAmount();
    let key = category;
    let j = 1;
    while (usedKeys.has(key)) {
      key = `${category}-${j}`;
      j++;
    }
    usedKeys.add(key);
    tableData.push({ key, category, date, amount });
  }
  return tableData.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export { generateRandomTableData, formatDate };
