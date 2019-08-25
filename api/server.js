const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

// start Mongo connection
require('./dbConfig');

// const authRoutes = require('./auth/auth-routes');
// const howToRoutes = require('./how-to/how-to-routes');
const usersRoutes = require('./usersRoutes');
// const restrictedMiddleware = require('./auth/restricted-middleware');

const server = express();

server.use(cors());
server.use(express.json());
server.use(helmet());

/* Routing */
// server.use('/api/auth', authRoutes);
// server.use('/api/how-to', howToRoutes);
server.use('/api/users', usersRoutes);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

module.exports = server;
