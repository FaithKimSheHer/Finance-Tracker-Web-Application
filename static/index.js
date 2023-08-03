import usersRoutes from './users.js'; 
import path from 'path';

const constructorMethod = (app) => { 
  app.use('/users', usersRoutes);
  app.use('*', (req, res) => {res.redirect('/users');}); 
};

export default constructorMethod;