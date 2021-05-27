"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const boardsService = require('./boards.service');
const request = express.Request;
const response = express.Response;
router.route('/').get(async (_req, res) => {
    const boards = await boardsService.getAll();
    await res.json(boards);
});
router.route('/:id').get(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    if (!board) {
        res.status(404).json();
    }
    res.status(200).send(board);
});
router.route('/').post(async (req, res) => {
    const board = await boardsService.save(req.body);
    if (!board) {
        res.status(404).json();
    }
    res.status(201).send(board);
});
router.route('/:id').put(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    if (!board) {
        res.status(404).json();
    }
    res.status(200).send(board);
});
router.route('/:id').delete(async (req, res) => {
    const board = await boardsService.remove(req.params.id);
    if (!board) {
        res.status(404).json();
    }
    res.status(200).send("Delete completed");
});
module.exports = router;
