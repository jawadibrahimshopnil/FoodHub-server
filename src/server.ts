import app from './app';
import config from './config';

const env = process.env.NODE_ENV;

if(env === 'development'){
  async function main() {
    try {
      app.listen(config.port, () => {
        console.log(`Example app listening on port ${config.port}`);
      });
    } catch (err) {
        console.log(err);
      }
  }

  main();
}

export default app;


