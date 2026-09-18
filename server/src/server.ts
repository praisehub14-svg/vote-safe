import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'votesafe-server',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api', (_req, res) => {
  res.json({
    name: 'VoteSafe API',
    version: '1.0.0',
    message: 'Secure online voting API is running.',
  });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`VoteSafe server running on http://localhost:${port}`);
});
