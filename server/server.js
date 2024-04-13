require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const nurseRoutes = require('./routes/nurseRoutes');
const auth = require('./middleware/authRoleValidator.js');
const {NURSE} = require("./enums/roleEnum");

// graphql
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {verify} = require("jsonwebtoken");
const jwtAuthUtils = require('./utils/jwtAuthUtils');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        let user = null;
        try {
            user = jwtAuthUtils(req);
            console.log('user:', user)
        } catch (err) {
            console.log('Invalid token');
        }
        // Add the user info to the context
        return {user};
    },
});

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
const port = process.env.PORT || 3300;

// Health check
app.get('/api/health', (req, res) => {
    console.log('Health check...');
    res.send('OK!');
});

// Secured Health check
app.get('/api/health/secured', auth(NURSE), (req, res) => {
    console.log('Sec Health check...');
    res.send('OK! Secured!');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


// Routes
app.use("/api/users", userRoutes);
app.use("/api/nurse", auth(NURSE), nurseRoutes);


async function startServer() {
    // Start the Apollo Server
    await server.start();

    // Apply middleware to Express app after server is started
    server.applyMiddleware({app, path: '/api/graphql'});

    app.listen(port, () => console.log(`Server listening on port ${port}`));
    console.log(`Server is running on port ${port}${server.graphqlPath}`);
}

startServer().then(r => console.log('Server started...'));