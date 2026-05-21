import { Response } from 'express';
import { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllUsers, createUser, deleteUser } from '../models/userModel';
import { getAllRoles } from '../models/roleModel';

export const listUsers = async (req: AuthRequest, res: Response) => {
  const users = await getAllUsers();
  const roles = await getAllRoles();
  res.render('layouts/main', {
    title: 'User Management',
    body: 'users/list',
    users,
    roles,
    userRole: req.user?.role_id
  });
};

export const storeUser = async (req: AuthRequest, res: Response) => {
  const { username, password, role_id } = req.body;
  await createUser({ username, password, role_id: parseInt(role_id) });
  res.redirect('/users');
};

export const removeUser = async (req: AuthRequest, res: Response) => {
  await deleteUser(parseInt(req.params.id));
  res.redirect('/users');
};
