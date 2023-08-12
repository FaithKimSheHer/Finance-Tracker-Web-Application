// import transactionFuncs from './transactions.js';
import landingRoutes from './home.js';
import usersRoutes from './users.js'; 

const constructorMethod = (app) => { 
  app.use("/", landingRoutes);
  app.use('/users', usersRoutes);
  // app.use('/transactions', transactionFuncs);
  app.use('*', (req, res) => {res.redirect('/');}); 
};

export default constructorMethod;
