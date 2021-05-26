"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Board = require('./boards.model');
const DBTASK = require('../tasks/tasks.memory.repository');
let DBBoards = [];
/**
 * Get all boards with DBBoards
 * @async
 * @returns {Promise<object>} Array of objects(board)
 */
const getAll = async () => DBBoards;
/**
 * Get by id board with DBBoards
 * @async
 * @param {string} id The board id
 * @returns {Promise<object>} The board
 */
const get = async (id) => {
    const board = await DBBoards.filter(bd => bd.id === id)[0];
    return board;
};
/**
 * Add new board in DBBoards
 * @async
 * @param {Object} board The board object
 * @returns {Promise<object>} The new board
 */
const save = async (board) => {
    const newBoard = new Board(board);
    DBBoards = [...DBBoards, newBoard];
    return newBoard;
};
/**
 * Update by id board with DBBoards
 * @async
 * @param {string} id The board id
 * @param {Object} boardUp The new date board
 * @returns {Promise<object>} The update board
 */
const update = async (id, boardUp) => {
    DBBoards = DBBoards.map(board => {
        if (board.id === id) {
            return { id, ...boardUp };
        }
        return board;
    });
    return get(id);
};
/**
 * Remove by id board with DBBoards
 * @async
 * @param {string} id The board id
 * @returns {Promise<object>} The remove board
 */
const remove = async (id) => {
    const delBoard = get(id);
    DBBoards = await DBBoards.filter(board => board.id !== id);
    DBTASK.removeTasksBoard(id);
    return delBoard;
};
module.exports = { getAll, get, save, remove, update };
