//Importando o jsonwebtoken
import jwt from 'jsonwebtoken';

//  Por meio do pomisify não precisamos
// utilizar o método de callback, e sim somente o asyn/await
import { promisify } from 'util';

//Importando config/auth.js
import authConfig from '../../config/auth'; //Logo, é importado secret e expiresIn

//Exportamos uma função default async
export default async (req, res, next) => {
  //Nessa próxima linha utilizamos um cod_hash pelo insominia, em Auth>Bearrer Token
  const authHeader = req.headers.authorization;

  if (!authHeader) { //Se o token não estiver no header, então retorna...
    //Bad request de "token não encontrado"
    return res.status(401).json({ erro: 'Token not provided' });
  }

  // ------------------------------------------------------------------- //
  //- Isso aqui > authHeader.split(' '); divide strings, ints etc... Por espaços.
  // ou authHeader.split('.'); divide string, ints, etc... Por pontos.
  const [, token] = authHeader.split(' '); // bearer 33fd3966d34886fa836d6418a3f86d0e
  //Aqui recebemos da seguinte maneira > [ bearer, token ]; usamos uma short syntax [ ,token];
  // Dessa forma só estamos utilizando o token...

  // Com o authHeader.split(' '); e a desestruturação [, token], temos como retorno um
  //array ->  [
  //            bearer,
  //            token,
  //          ];
  // ------------------------------------------------------------------- //

  try { //Tente
    // I - O [ const decoded ] é o valor retornado do jwt.verify
    // II - O [ promisify(jwt.verify) ] retorna outra função sem precisar passar o [ callback ]
    // III - Logo, await promisify(jwt.verify)(token, authConfig.secret); AGORA SIM!
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); //Dessa forma o promisify tenta decodificar o hash
    //console.log(decoded);

    //Se deu tudo certo...
    //  Dessa forma o id passado por meio do [ token: jwt.sign({ id } ].
    // E apartir desse momento o id do usuário está dentro do decoded
    // [ Var da requisição req.userId ] e [ decoded.id do decoded ]
    req.userId = decoded.id;

    return next(); //Pode acessar o controller normalmente, porque o usuário está autenticado
    //Próxima instrução

  } catch (err) { //Se der errado...
    //UNAUTHORIZED, erro... token invalid.
    //Como não tem o return next(); o sistema para aqui no erro...
    return res.status(401).json({ error: 'Token invalid' });
  }
};
