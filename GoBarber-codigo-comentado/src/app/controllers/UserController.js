import * as Yup from 'yup'; //Importação do Yup
import User from '../models/User'; //Importação do model User

class UserController { //Classe UserController
  async store(req, res) { //Middleware que serve para criar um novo usuário

    const schema = Yup.object().shape({ //Schema que é definido como objeto
      name: Yup.string().required(), //Tendo um nome como string e obrigatório
      email: Yup.string().email().required(), //Tendo um email como string e obrigatório
      password: Yup.string().required().min(6), //Tendo como string e obrigatorio, com um minimo de 6 caracteres
    });

    if (!(await schema.isValid(req.body))){ //Se os dados não forem válidos, entra nesse bloco e retorna um erro
      return res.status(400).json({ error: 'Validation fails' }); //Erro 400, Validação falhou!
    }

    //  Por meio dessa linha procuramos no sistema se o usuário existe, logo,
    // utilizamos o método findOne(); para buscar um email que seja igual a requisição
    // do req.body.email, utilizando como referência o modelo de [ models/User ]
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if(userExists) { //Se durante o cadastro o usuário já existir, entra nesse bloco...
      return res.status(400).json({ error: 'User already exists.' }); //Usuário já existe
    }

    /*
     * Se a validação do email ocorrer perfeitamente, então damos inicio a criação de um novo usuário
     */

    //Aqui pegamos os dados de acordo com o corpo da requisição
    const { id, name, email, provider } = await User.create(req.body); //Criamos um usuário

    return res.json({ //Retornamos um id, name, email e provider
      id, //Aqui estamos utilizando o conceito de short syntax
      name,
      email,
      provider,
    });
  }

  async update(req, res) { //Middleware de Update
    //console.log(req.userId);
    const schema = Yup.object().shape({ //Aqui temos um schema como objeto
      name: Yup.string(), //O nome é do tipo string
      email: Yup.string().email(), //O email é do tipo string com formato de email
      oldPassword: Yup.string().min(6), //O oldPassword é do tipo string com no mínimo 6 char
      password: Yup.string() //O password é do tipo string
        .min(6) //Com o minimo de 6 caracteres
        .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))){ //Se a requisição do corpo não for válida
      //entra dentro do bloco e vai dar um erro 400 dizendo que a validação falhou
      return res.status(400).json({ error: 'Validation fails' });
    }

    //Aqui pegamos o email e o oldPassword do corpo da requeisição
    const { email, oldPassword } = req.body; //Linha CORPO

    //Logo, nessa linha abaixo dizemos para procurar no modelo User
    // a chave primaria de req.userId
    const user = await User.findByPk(req.userId); //Linha PEGA por id

    //Se o [ email da linha CORPO ] for diferente de [ user.email da linha PEGA por id ]
    if (email !== user.email) { //Entra dentro desse bloco
      const userExists = await User.findOne({ where: { email } }); //Onde o email existir

      if (userExists) { //Se o email existe entra dentro desse bloco, emitindo
        // erro de usuário existente
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    //  O user.checkPassword(oldPassword) retorna um true ou false (ou "0" e "1"),
    // comparando a string que seria ( oldPassword ) com o código hash, se a
    // conversão da string oldPassword for igual a conversão do código hash
    // já salvo no BD (CHAMA O MÉTODO >>>[ checkPassword(oldPassword) ]<<< DE User.js)
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      //
      return res.status(401).json({ error: 'Password does not match' });
    }

    //Se tudo der certo, pegamos os dados do corpo da requisição
    const { id, name, provider } = await user.update(req.body);

    return res.json({ //E as enviamos como retorno em JSON
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController(); //Exportando a classe UserController com default
