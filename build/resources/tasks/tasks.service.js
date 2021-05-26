"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasksRepo = require('./tasks.memory.repository');
/**
 * Get all tasks by boardId
 * @param {string} boardId The task boardId
 * @returns {Promise<object>} Array of objects(task)
 */
const getAll = (boardId) => tasksRepo.getAll(boardId);
/**
 * Get by id task by boardId
 * @param {string} boardId The task boardId
 * @param {string} id The task id
 * @returns {Promise<object>} The task
 */
const get = (boardId, id) => tasksRepo.get(boardId, id);
/**
 * Add new task by boardId
 * @param {string} boardId The task boardId
 * @param {Object} task The task object
 * @returns {Promise<Object>} The new task
 */
const save = (boardId, task) => tasksRepo.save(boardId, task);
/**
 * Update by id task by boardId
 * @param {string} boardId The task boardId
 * @param {string} id The task id
 * @param {Object} taskUp The new date task
 * @returns {Promise<Object>} The update task
 */
const update = (boardId, id, task) => tasksRepo.update(boardId, id, task);
/**
 * Remove by id task by boardId
 * @param {string} boardId The task boardId
 * @param {string} id The task id
 */
const remove = (boardId, id) => tasksRepo.remove(boardId, id);
module.exports = { getAll, get, remove, save, update };
