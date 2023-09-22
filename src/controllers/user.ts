import express from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.warn(error);
    return res.sendStatus(400);
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;

    if(!id) {
      return res.sendStatus(400);
    }

    const deleteUser = await deleteUserById(id);

    if(!deleteUser) {
      return res.sendStatus(400);
    }

    return res.status(200).json(deleteUser);
  } catch (error) {
    console.warn(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {

    const { id } = req.params;
    const { username } = req.body;

    if(!id || !username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    if(!user) {
      return res.sendStatus(400);
    }

    user.username = username;

    user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.warn(error);
    return res.sendStatus(400);
  }
}
