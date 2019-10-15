import {createConnection} from 'typeorm';
import User from '../Entity/User';
import Role from '../Entity/Role';
import Post from '../Entity/Post';
import Comments from '../Entity/Comments';
import Sessions from '../Entity/Sessions';

export async function createConnectionDB(){
    await createConnection({
    type: "mysql",
    host: process.env.host_DB,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.database_DB,
    synchronize: true,
    logging: true,
    entities: [User, Role, Post, Comments, Sessions]
    });
};