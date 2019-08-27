import express from 'express'; //Importação da lib express, retorna uma função chamada express();
import routes from './routes'; //Importação de routes.js

import './database'; //Importação da pasta database inteira

class App { //Classe App destinada a aplicação
  constructor() { //Contrutor do App
    //Quando a classe for chamada, o construtor inicia automáticamente as seguintes funções...
    this.server = express(); //A função retornada da lib express é armazena em "this.server"

    this.middlewares(); //Aqui estamos chamandp uma função para envio e recebimento de arquivos em JSON
    this.routes(); //Aqui estamos chamando a função routes();
  }

  middlewares(){
    this.server.use(express.json()); //A partir deste momento,
    //essa aplicação já está pronta para receber requisições no formato JSON
  }

  routes(){
    this.server.use(routes); //Por meio desta linha estamos chamando as rotas de routes.js
    //para tudo que esteja lá seja utilizado ("Use tudo de routes.js").
  }
}

export default new App().server; //Exporta como default uma nova classe App com um server de express
