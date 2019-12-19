import { IUser } from './../components/users/types';
import { Client } from 'pg';
import { Context } from 'koa';

export async function getAll(db : Client) : Promise<Array<IUser>>{
    const users = await db.query("SELECT * FROM public.user");
    return users.rows;
}