import { memoryDb } from '../../memoryDb/memoryDb.js';
const { boards } = memoryDb;
const getAll = async () => [...boards];
const get = async (boardId) => boards.find((board) => board.id === boardId);
const create = async (boardData) => {
    boards.push(boardData);
    return get(boardData.id);
};
const update = async (boardId, boardData) => {
    const index = boards.findIndex((board) => board.id === boardId);
    if (index === -1)
        return null;
    boards[index] = { ...boards[index], ...boardData, id: boardId };
    return get(boardId);
};
const remove = async (itemId) => {
    const index = boards.findIndex((item) => item.id === itemId);
    if (index === -1)
        return false;
    return !!boards.splice(index, 1).length;
};
export { getAll, get, create, update, remove };
