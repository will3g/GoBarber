import { Router } from 'express'; //Importação da "Função" Router da lib express

import UserController from './app/controllers/UserController'; //Importação de UserController
import SessionController from './app/controllers/SessionController'; //Importação de SessionController

import authMiddleware from './app/middlewares/auth'; //Importação do middlewares de autenticação do token/senha/hash

const routes = new Router(); //Chamando a função Router da lib express

routes.post('/users', UserController.store); //Essa rota cria um novo usuário (cria uma nova conta)
routes.post('/sessions', SessionController.store); //Essa rota é destinada a sessão (acesso de login)

routes.use(authMiddleware); //Use o middlewares como global a partir desta linha
//Serve para validação do código hash/token do usuário logado que fizer a requisição de update
routes.put('/users', UserController.update); //Chama a "função" de upadte (atualiza dados da conta)
//Ou podemos adicionar o middleware authMiddleware como local [ routes.put('/users', authMiddleware, UserController.update); ]

export default routes; //Exporta as rotas como default
