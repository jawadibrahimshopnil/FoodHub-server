import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwtSecret: process.env.JWTSECRET,
  node_env: process.env.NODE_ENV,
  frontend_url: process.env.FRONTEND_URL,
  stripe_key: process.env.STRIPE_KEY as string,
  whsec_key: process.env.WHSEC_KEY as string
};
