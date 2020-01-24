import bcrypt from 'bcrypt';
import { Client } from 'pg';
import { IUser } from './../components/users/types';
import { v4 as uuid } from 'uuid';

export async function getAll(db : Client) : Promise<Array<IUser>> {
  const users = await db.query('SELECT * FROM public.user;');

  return users.rows;
}

export async function save(db: Client, user: IUser) {
  const rounds = 10;
  const guid = uuid();
  const password = await bcrypt.hash(user.password, rounds);
  const result =  await db.query(`INSERT INTO public.user(guid, email, name, password) VALUES ($1, $2, $3, $4) RETURNING guid, email, name`, [
    guid,
    user.email,
    user.name,
    password
  ]);

  return result.rows[0];
}

export async function exist(db: Client, user: IUser): Promise<boolean> {
  return !!(await getByEmail(db, user.email));
}

export async function getByGUID(db : Client, guid: string): Promise<IUser | undefined> {
  const user = await db.query('SELECT email, name, guid FROM public.user WHERE guid = $1', [guid]);

  return user.rows[0];
}

export async function getByEmail(db: Client, email: string): Promise<IUser | undefined> {
  const user = await db.query('SELECT email, name, guid FROM public.user WHERE email = $1', [email]);

  return user.rows[0];
}

export async function verifyUser(db: Client, email: string, password: string): Promise<boolean> {
  const user = await db.query('SELECT email, name, guid, password FROM public.user WHERE email = $1', [email]);

  return user.rows[0] ? await bcrypt.compare(password, user.rows[0].password) : false;
}
