import bcrypt from 'bcrypt';
import { Client } from 'pg';
import { IUser } from './../components/users/types';
import { v4 as uuid } from 'uuid';

export async function getAll(db : Client) : Promise<Array<IUser>>{
    const users = await db.query("SELECT * FROM public.user");
    return users.rows;
}

export async function save(db: Client, user: IUser) {
  const rounds = 10;
  const guid = uuid();
  const password = bcrypt.hashSync(user.password, rounds);
  const result =  await db.query("INSERT INTO public.\"user\"( guid, email, name, password) VALUES ($1, $2, $3, $4) RETURNING guid, email, name", [
    guid,
    user.email,
    user.name,
    password
  ]);
  return result.rows[0];
}

export async function exist(db: Client, user: IUser) {
  const exist = await db.query('SELECT * FROM public.user WHERE email = $1',[user.email]);
  return exist.rowCount === 0 ? false : true;
}

export async function getByGUID(db : Client, guid: string): Promise<IUser> {
  const user = await db.query('SELECT email,name,guid FROM public.user WHERE guid = $1', [guid]);

  return user.rows[0];
}

export async function getByEmail(db: Client, email: string): Promise<IUser> {
  const user = await db.query('SELECT email,name,guid FROM public.user WHERE email = $1', [email]);
  return user.rows[0];
}

export async function verifyUser(db: Client, email: string, password: string): Promise<undefined | IUser> {
  const user = await db.query('SELECT email,name,guid,password FROM public.user WHERE email = $1', [email]);
  const result = bcrypt.compareSync(password, user.rows[0].password);
  return result ? user.rows[0] : undefined;
}
