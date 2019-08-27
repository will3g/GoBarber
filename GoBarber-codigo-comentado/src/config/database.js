module.exports = {
  dialect: 'postgres', /* Qual banco utilizado? */
  host: 'localhost', /* No host local */
  username: 'postgres', /* Username do banco de dados */
  password: 'vivo1928', /* Senha do banco de dados */
  database: 'gobarber', /* Nome do banco de dados */
  define: { /* Defina também */
    timestamps: true, /* Serve para o created_at e updated_at */
    underscored: true, /* Serve para não utilizar o método camel case, e sim -> Ex: "user_groups" */
    underscoredAll: true, /* No resto das variáveis utilize o tal método -> Ex: "user_id" */
  },
};
