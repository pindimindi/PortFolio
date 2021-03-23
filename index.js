const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// DB SETUP
connectDB();


// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({
    type: '*/*', limit: '50mb'
}));
app.use(cors());

// Routes setup
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/portfolios', require('./routes/api/portfolios'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/subCategories', require('./routes/api/subCategories'));
app.use('/api/geo', require('./routes/api/geo'));
app.use('/api/posts', require('./routes/api/posts'))



// Server setup
const PORT = process.env.PORT || 3030;
const server = http.createServer(app);

server.listen(PORT);
console.log(`Server listening on : ${PORT}`);