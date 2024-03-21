require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const auth = require('./middleware/authRoleValidator')
const {NURSE} = require("./enums/roleEnum");

// graphql
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json())
const port = process.env.PORT || 5000;
// Health check
app.get('/api/health', (req, res) => {
  console.log('Health check...');
  res.send('OK!');
});
// Secured Health check
app.get('/api/health/secured',auth(NURSE), (req, res) => {
  console.log('Sec Health check...');
  res.send('OK! Secured!');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


// Routes
app.use("/api/users", userRoutes);


async function startServer() {
  // Start the Apollo Server
  await server.start();

  // Apply middleware to Express app after server is started
 server.applyMiddleware({ app, path: '/api/graphql' });

  app.listen(port, () => console.log(`Server listening on port ${port}`));
  console.log(`Server is running on port ${port}${server.graphqlPath}`);
}

startServer().then(r => console.log('Server started...'));