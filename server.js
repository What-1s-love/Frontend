const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// --- ВЛАСНА ІМІТАЦІЯ АВТОРИЗАЦІЇ ---

// 1. Логін (/login)
server.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Шукаємо користувача в базі db.json
  const db = router.db; // Доступ до даних
  const user = db.get('users').find({ email, password }).value();

  if (user) {
    // Якщо знайшли - видаємо фейковий токен
    res.json({ 
      accessToken: "fake-jwt-token-" + Date.now(),
      user: user
    });
  } else {
    res.status(400).json({ error: "Невірний логін або пароль" });
  }
});

// 2. Реєстрація (/register)
server.post('/register', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;

  // Перевірка, чи такий вже є
  const existingUser = db.get('users').find({ email }).value();
  if (existingUser) {
    return res.status(400).json({ error: "Користувач вже існує" });
  }

  // Створюємо нового
  const newUser = { 
    id: Date.now(), 
    email, 
    password 
  };
  
  // Записуємо в базу
  db.get('users').push(newUser).write();

  // Віддаємо токен
  res.json({ 
    accessToken: "fake-jwt-token-" + Date.now(),
    user: newUser 
  });
});

// 3. Захист маршрутів (Перевірка токена)
server.use((req, res, next) => {
  // Якщо це публічний запит (GET) або логін/реєстрація - пропускаємо
  if (req.method === 'GET' || req.path === '/login' || req.path === '/register') {
    return next();
  }

  // Для POST, PUT, DELETE перевіряємо заголовок
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Потрібна авторизація (Token)" });
  }

  // Якщо токен є - пропускаємо далі
  next();
});

// --- КІНЕЦЬ АВТОРИЗАЦІЇ ---

server.use(router);

server.listen(3000, () => {
  console.log('------------------------------------------------');
  console.log('🚀 Custom Auth Server is running on port 3000');
  console.log('------------------------------------------------');
});