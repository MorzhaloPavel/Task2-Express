"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const User = require('./user.model');
const usersService = require('./user.service');
const request = express.Request;
const response = express.Response;
router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
});
router.route('/:id').get(async (req, res) => {
    const user = await usersService.get(req.params.id);
    if (!user) {
        res.status(404).json();
    }
    res.status(200).send(User.toResponse(user));
});
router.route('/').post(async (req, res) => {
    const user = await usersService.save(req.body);
    if (!user) {
        res.status(404).json();
    }
    res.status(201).send(User.toResponse(user));
});
router.route('/:id').put(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    if (!user) {
        res.status(404).json();
    }
    res.status(200).send(User.toResponse(user));
});
router.route('/:id').delete(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    if (!user) {
        res.status(404).json();
    }
    res.status(200).send("Delete completed");
});
module.exports = router;
