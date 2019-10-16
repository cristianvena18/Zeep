import {createConnection} from 'typeorm';
import User from '../../Domain/Entity/User';
import Role from '../../Domain/Entity/Role';
import Post from '../../Domain/Entity/Post';
import Comments from '../../Domain/Entity/Comments';
import Sessions from '../../Domain/Entity/Sessions';

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