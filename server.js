const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/booksCatalogApp')
    .then(() => console.log('DB Connection established successfully'))
    .catch((err) => console.log('Error while connecting database', err));

app.use(cors());
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`server is up and running on PORT ${PORT}`);
});
