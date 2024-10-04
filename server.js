import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();
import cors from 'cors';

import mongoose from './config/mongodbConfig.js';
import indexRoutes from './routes/index.js';
import authenticationRoutes from './routes/authentication.js';
import debugRoutes from './routes/debug.js';

import socketEvents from './handlers/socketHandler.js';

const server = http.createServer(app);
const io = new Server(server);
global.io = io;
socketEvents(io);

app.use(express.static('public'));
app.use(express.json());
app.use(cors())

app.use('/', indexRoutes);
app.use('/auth', authenticationRoutes);
app.use('/debug', debugRoutes);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
