import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(express.json()); //A partir deste momento,
    //essa aplicação já está pronta para receber requisições no formato JSON
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes(){
    this.server.use(routes);
  }
}

export default new App().server;
