import { Server } from 'colyseus';
import http from 'http';
import express from 'express';
import basicAuth from 'express-basic-auth';
import { monitor } from '@colyseus/monitor';
import { PORT, ENDPOINT } from './utils/AgarIOCostanzo';
import { ArenaRoom } from './rooms/ArenaRoom';

const app = express();
const gameServer = new Server({ server: http.createServer(app) });

gameServer.register('arena', ArenaRoom);

// add colyseus monitor
const auth = basicAuth({ users: { admin: 'admin' }, challenge: true });
app.use('/colyseus', auth, monitor(gameServer));

gameServer.listen(PORT);
console.log(`Listening on http://${ENDPOINT}:${PORT}`);
