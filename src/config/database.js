 import {Sequelize} from 'sequelize'
 import 'dotenv/config'

 const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
   host: process.env.DB_HOST,
   dialect: 'postgres',
 });

 // Test connection and log errors
 sequelize.authenticate()
   .then(() => {
     console.log('Conexão com a base de dados foi realizada com sucesso!.');
   })
   .catch(err => {
     console.log(`Não foi possivel realizar a conexão com a base de dados: ${err.message}`);
     });

export default sequelize
