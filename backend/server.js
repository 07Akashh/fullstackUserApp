const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors())
connectDB();


app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/profile'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
