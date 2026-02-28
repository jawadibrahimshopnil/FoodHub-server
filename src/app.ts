import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/Auth/auth.route';
import { UserRoutes } from './modules/User/user.route';
import router from './routes';
import globalErrorHandler from './errors/globalErrorHandler';
import notFound from './errors/notFound';
import config from './config';

const app: Application = express();

// parsers
const allowedOrigins = [
  config.node_env === "development" ? 'http://localhost:3000' : config.frontend_url!
];
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Alhamdulillah FoodHub Server is running !');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
