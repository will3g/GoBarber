//----------------------------------------------------------------------------//
// POR MEIO DESSE ARQUIVO FAZEMOS A CONEXÃO DA APLICAÇÃO COM O BANCO DE DADOS //
//----------------------------------------------------------------------------//

//importação de Sequelize, serve para manipulação de BD relacionais
import Sequelize from 'sequelize';

//Importação do model User que servirá como
import User from '../app/models/User';

//Importando a configuração do banco de dados
import databaseConfig from '../config/database';

//Aqui temos um array com os models dessa aplicação
const models = [User];

class Database { //Classe Database
  constructor() { //Contrutor da classe
    this.init(); //Chama o método init(); para realização da conexão
  }

  init() { //Faz a conexão com o banco de dados e carregar os models
    //Nessa linha importamos a configuração de databaseConfig para realizar a conexão
    this.connection = new Sequelize(databaseConfig);

    //Na próxima linha estamos chamando [ static init(sequelize) ] de User.js
    // que recebe this.connection com as configurações de databaseConfig
    //Consequentemente todo o array de models é percorrido e todos os modelos são conectados
    models.map(model => model.init(this.connection));
  }
}

 /* ---------------------------------------------------------------------------
  *   Agora essa classe precisa ser importada em algum local... Logo, importamos
  * a tal classe em app.js
  * --------------------------------------------------------------------------- */

export default new Database(); //Exporte Database como default
