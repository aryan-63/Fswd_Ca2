const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');
app.use('/api', bookRoutes);

dotenv.config();  

const app = express();
app.use(express.json());  


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
