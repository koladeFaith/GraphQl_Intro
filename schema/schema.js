const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = graphql
const _ = require('lodash')
const BookModel = require('../models/BookModel')
const AuthorModel = require('../models/AuthorModel')
const books = [
    { name: 'Faith', genre: "Yellow", id: '1', authorId: "1" },
    { name: 'Oluwafemi', genre: "Red", id: '2', authorId: "2" },
    { name: 'Sola', genre: "Blue", id: '3', authorId: "3" },
    { name: 'Shewa', genre: "Orange", id: '4', authorId: "4" }
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
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(author, { id: parent.authorId })

            }
        }
    })
})
const AuthorType = new graphql.GraphQLObjectType({
    name: 'author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            async resolve(parent, args) {
                try {
                    let author = new authorModel({
                        name: args.name,
                        age: args.age,
                        nationality: args.nationality
                    });
                    console.log('author saved');
                    return await author.save();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
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
