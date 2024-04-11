const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/authRoleValidator');
const { NURSE } = require('./enums/roleEnum');

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 3300;

app.get('/api/health', (req, res) => {
  console.log('Health check...');
  res.send('OK!');
});

app.get('/api/health/secured', auth(NURSE), (req, res) => {
  console.log('Sec Health check...');
  res.send('OK! Secured!');
});

// MongoDB connection
mongoose.connect('mongodb+srv://admin123:test123@cluster0.wqs3jie.mongodb.net/comp308db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
