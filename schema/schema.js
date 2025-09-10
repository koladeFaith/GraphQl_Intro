const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql
const _ = require('lodash')
const BookModel = require('../models/BookModel')
const AuthorModel = require('../models/AuthorModel')
const books = [
    { name: 'Faith', genre: "Yellow", id: '1' },
    { name: 'Oluwafemi', genre: "Red", id: '2' },
    { name: 'Sola', genre: "Blue", id: '3' },
    { name: 'Shewa', genre: "Orange", id: '4' }
]
const author = [
    { name: 'Adelaja', age: 33, id: '1' },
    { name: 'Neon', age: 60, id: '2' },
    { name: 'Queen', age: 29, id: '3' },
    { name: 'Esther', age: 34, id: '4' }
]

const BookType = new graphql.GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})
const AuthorType = new graphql.GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(author, { id: args.id })
            }
        },
        book: {
            type: new graphql.GraphQLList(BookType),
            resolve(parent, args) {
                return books
                // return BookModel.findById(args.id)
            }
        },
        author: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return author
                // return AuthorModel.findById(args.id)

            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery
})
