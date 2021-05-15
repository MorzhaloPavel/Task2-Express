const router = require('express').Router({mergeParams: true});
const Task = require('./tasks.model');
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  await res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const tasks = await tasksService.get(req.params.id);
  if(!tasks) {
    res.status(404).json()
  }
  res.status(200).send(tasks);
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.sendStatus(200)
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.save(req.body);
  res.status(201).send(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.id,
    req.body
  );

  res.status(200).send(task);
});

module.exports = router;
