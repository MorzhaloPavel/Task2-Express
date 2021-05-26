export {}
const express = require('express')

const router = express.Router();
const User = require('./user.model.ts');
const usersService = require('./user.service.ts');

const request = express.Request()
const response = express.Response()

router.route('/').get(async (req: typeof request, res: typeof response): Promise<void> => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req:  typeof request, res: typeof response): Promise<void> => {
  const user = await usersService.get(req.params.id);
  if(!user) { res.status(404).json() }
  res.status(200).send(User.toResponse(user));
});

router.route('/').post(async (req:  typeof request, res: typeof response): Promise<void> => {
  const user = await usersService.save(req.body);
  if(!user) { res.status(404).json() }
  res.status(201).send(User.toResponse(user));
});

router.route('/:id').put(async (req:  typeof request, res: typeof response): Promise<void> => {
  const user = await usersService.update(
    req.params.id,
    req.body
  );
  if(!user) { res.status(404).json() }
  res.status(200).send(User.toResponse(user));
});

router.route('/:id').delete(async (req:  typeof request, res: typeof response): Promise<void> => {
  const user = await usersService.remove(req.params.id);
  if(!user) { res.status(404).json() }
  res.status(200).send("Delete completed")
});

module.exports = router;