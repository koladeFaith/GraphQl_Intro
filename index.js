const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const app = express()
const port = 2323
const graphqlHTTP = require('express-graphql').graphqlHTTP
const schema = require("./schema/schema")
app.use('/queries', graphqlHTTP({ schema, graphiql: true }))
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
app.listen(port, () => {
    console.log(`Server started at ${port}`);
})