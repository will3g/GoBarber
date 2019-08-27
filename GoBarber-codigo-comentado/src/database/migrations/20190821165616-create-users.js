'use strict';

//Depois de já ter configurado esse arquivo com a tabela desejada
//podemos dar o comando >>> [ yarn sequelize db:migrate ] para enviar
//para o banco de dados postgres
module.exports = {
  up: (queryInterface, Sequelize) => { //Método que é enviado para o BD
      return queryInterface.createTable('users', { //Onde retorna uma tabela chamada de users
        id: { // Com um campo ID que é...
          type: Sequelize.INTEGER, //Do tipo inteiro
          allowNull: false, //Onde não pode ser nulo
          autoIncrement: true, //Que é auto incrementador
          primaryKey: true, //E é chave primária
        },
        name: { //Com um campo nome que é...
          type: Sequelize.STRING, //Do tipo string
          allowNull: false, //E não pode ser nulo
        },
        email: { //Com um campo email que é...
          type: Sequelize.STRING, //Do tipo string
          allowNull: false, //Onde não pode ser nulo
          unique: true, //E é único, não pode ter dois ou mais emails iguais
        },
        password_hash: { //Com um campo de senha em hash que é...
          type: Sequelize.STRING, //Do tipo string
          allowNull: false, //Onde não pode ser nulo
        },
        provider: { //Com um campo de prestador de serviço (provider) que é...
          type: Sequelize.BOOLEAN, //Do tipo boolean
          defaultValue: false, //Com valor padrão em "false", logo todo novo
          //cadastro é um cliente, que pode se tornar um prestador de serviço
          allowNull: false, //Onde não pode ser nulo
        },
        created_at: { //Com um campo que mostra a data de criação do cadastro que é...
          type: Sequelize.DATE, //Do tipo date
          allowNull: false, //Onde não pode ser nulo
        },
        updated_at: { //Com um campo que mostra a data de atualização do cadastro que é...
          type: Sequelize.DATE, //Do tipo date
          allowNull: false, //Onde não pode ser nulo
        }

      });
  },

  down: queryInterface => { //O down serve para dropar o BD, Migration...
      return queryInterface.dropTable('users'); //Que é a tabela "users"
  }
};
