import Sequelize, { Model } from 'sequelize'; //Importação de Model dentro do Sequelize e Sequelize
import bcrypt from 'bcryptjs'; //Importação do bcryptjs para criptografar a senha

class User extends Model { //A classe User herda as propriedades da classe Model
  static init(sequelize){ //Método que é chamado automáticamente pelo Sequelize
    super.init( //O "super" é referente a classe pai, que é Model
    //LOGO, ESTAMOS CHAMANDO O MÉTODO init() DA CLASSE PAI "Model"
      { //Aqui nesse bloco estamos definindo um modelo para devolução dos dados para o usuario
        name: Sequelize.STRING, //Nome, sendo do tipo string
        email: Sequelize.STRING, //Email, sendo do tipo string
        password: Sequelize.VIRTUAL, //Esse tipo virtual nunca será armazenado no BD, somente na aplicação
        password_hash: Sequelize.STRING, //password_hash, sendo do tipo string
        provider: Sequelize.BOOLEAN, //Provider, sendo do tipo boolean (seu valor default é false)
      },
      {
        sequelize, //Necessário chamar o sequelize
      }
    );

    this.addHook('beforeSave', async (user) => { //Hooks são métodos que são chamados automaticamente
      // antes ou depois da aplicação ser executada.
      // Temos como exemplo >>> beforeSave, afterSave, beforeCreate e etc... //
      if(user.password){ //Se o campo password do tipo virtual...
        //Aqui chamamos o bcrypt com seu metodo hash(object, força do código hash)
        user.password_hash = await bcrypt.hash(user.password, 8); //Dessa forma, convertemos o user.password
        // do tipo virtual em código hash de força 8. Logo, só armazenamos o código hash,
        // e na hora de login, comparamos somente "hash com hash"
      }
    });

    return this; //retorne isto
  }

  checkPassword(password) {
    //  O compare recebe uma string e um cod_hash
    // Logo fica >>> compare(string, codigo_hash);
    // retornando um boolean, comparando a conversão
    // do password com o código hash
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User; //Exportando como default
