import jwt from 'jsonwebtoken'; //Importação do jsonwebtoken

import * as Yup from 'yup'; //Importação do yup (Lembrando... O yup tem como função de validar schemas)
import User from '../models/User'; //Importação do modelo de User
import authConfig from '../../config/auth'; //Importação de config/auth.js

class SessionController { //Sessão
  async store(req, res) { //Middleware resposável pela criação de uma nova sessão
    const schema = Yup.object().shape({ //Aqui temos um schema validation...
      //O email é do tipo string, com formato email e é um campo obrigatório
      email: Yup.string().email().required(),
      //O password é do tipo string e obrigatório
      password: Yup.string().required(),
    });

    //Se o corpo da requisição de acordo com o schema, não for válido...
    if (!(await schema.isValid(req.body))){
      //Retorne um bad request dizendo que a validação falhou em formato JSON
      return res.status(400).json({ error: 'Validation fails' });
    }

    //Caso o schema seja válido...
    const { email, password } = req.body; //O corpo da requisição "terá" um email e um password

    // De acordo com o model User, procure por um email (O email é único),
    //onde seja igual ao email requisitado no corpo...
    const user = await User.findOne({ where: { email } });

    //Se o usuário não existir, retorne...
    if(!user) {
      //UNAUTHORIZED usuário não encontrado.
      return res.status(401).json({ error: 'User not found' });
    }

    //Se o password estiver errado, retorne...
    if (!(await user.checkPassword(password))) { //Aqui estamos comparando código hash [ importado de models/User.js ]
      //UNAUTHORIZED "password errado"...
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user; //Por meio dessa linha "pegamos" por meio de desestruturação o id e name do usuário

    return res.json({ //Retorna um response em formato JSON
      user: { //Com um "object" user
        id, //com id,
        name, //name
        email, //e email.
      }, //Em seguida temos um "object" token

      //  Aqui passamos um "payload" de [ jwt.sign({ id } ],
      // que é o id do usuário + authConfig.secret + authConfig.expiresIn
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
