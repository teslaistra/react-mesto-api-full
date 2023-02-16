// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://praktikum.teslaistra.ru',
  'http://praktikum.teslaistra.ru',
  'localhost:3000',
  'http://localhost:3000',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    res.end();
  }
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};
