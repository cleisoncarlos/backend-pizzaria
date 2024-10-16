
import express from 'express'
import sequelize from './config/database.js'
//import authRoutes from './routes/authRoutes.js' 
import pizzaRoutes from './routes/pizzaRoutes.js'

const app = express();

app.use(express.json());

//app.use('/auth', authRoutes);
app.use('/api', pizzaRoutes); 

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });
