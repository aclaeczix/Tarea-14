require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3300;
const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri)
  .then(() => console.log('DB connected'))
  .catch(error => {
    console.error('Error connecting to the database', error);
    process.exit(1); // Detener el proceso si la conexión falla
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
