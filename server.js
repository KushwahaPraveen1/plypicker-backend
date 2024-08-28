const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongoConfig');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const requestRoutes = require('./routes/requestRoutes');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors());
connectDB();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
