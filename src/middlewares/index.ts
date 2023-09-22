import express, { NextFunction, Request, Response } from 'express';
import { getUserBySessionToken } from '../db/users';
import { AUTH_COOKIE } from '../controllers/authentication';
import { get, merge } from 'lodash';

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!id || !currentUserId || currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.warn(error);
    return res.sendStatus(400);
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies[AUTH_COOKIE];

    if(!sessionToken) {
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if(!existingUser) {
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.warn(error);
    return res.sendStatus(400);
  }
}