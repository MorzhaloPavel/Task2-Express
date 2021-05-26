export {}
const express = require('express')

const router = express.Router({mergeParams: true});
const Task = require('./tasks.model.ts');
const tasksService = require('./tasks.service.ts');

const request = express.Request
const response = express.Response

router.route('/').get(async (req: typeof request, res: typeof response): Promise<void> => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(200).json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req: typeof request, res: typeof response): Promise<void> => {
  const task = await tasksService.save(
    req.params.boardId,
    req.body
  )
  if(!task) { res.status(404).json() }
  res.status(201).send(Task.toResponse(task));
});

router.route('/:id').get(async (req: typeof request, res: typeof response): Promise<void> => {
  const task = await tasksService.get(req.params.boardId, req.params.id);
  if(!task) { res.status(404).json() }
  res.status(200).send(task);
});

router.route('/:id').put(async (req: typeof request, res: typeof response): Promise<void> => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  if(!task) { res.status(404).json() }
  res.status(200).send(task);
});

router.route('/:id').delete(async (req: typeof request, res: typeof response): Promise<void> => {
  const task = await tasksService.remove(req.params.boardId, req.params.id)
  if(!task) { res.status(404).json() }
  res.status(200).send("Delete completed");
});

module.exports = router;
