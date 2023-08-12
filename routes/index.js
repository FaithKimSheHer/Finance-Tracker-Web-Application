// import transactionFuncs from './transactions.js';
import landingRoutes from './dashboard.js';
import userRoutes from './user.js'; 

const constructorMethod = (app) => { 
  app.use("/", landingRoutes);
  app.use('/user', userRoutes);
  // app.use('/transactions', transactionFuncs);
  app.use('*', (req, res) => {res.redirect('/');}); 
};

export default constructorMethod;
