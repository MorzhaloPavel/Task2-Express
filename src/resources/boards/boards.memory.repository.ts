import {getManager} from "typeorm";
import { IBoard } from '../../utils/types';
import ApiErroe from '../../utils/ApiErroe';
import Board from "../../entity/boards";
import Columns from "../../entity/columns";

const getAll = async (): Promise<IBoard[]> => {
  const boardRepository = getManager().getRepository(Board);
  const boards = await  boardRepository.find({relations: ["columns"]})
  if(!boards){
    throw ApiErroe.badRequest("Not Found!");
  }
  return boards
}

const get = async (boardId: string): Promise<IBoard | undefined> => {
  const boardRepository = getManager().getRepository(Board);
  const board = await boardRepository.findOne(boardId, {relations: ["columns"]})
  if(!board){
    throw ApiErroe.badRequest("Not Found!");
  }
  return board
}

const create = async (boardData: IBoard): Promise<IBoard | undefined> => {
  const columnRepository = getManager().getRepository(Columns);
  const boardRepository = getManager().getRepository(Board);
  const boardCreate = await boardRepository.create(boardData)
  const columnsCreate = await columnRepository.create(boardData.columns)
  boardCreate.columns = columnsCreate
  await columnRepository.save(columnsCreate);
  const newBoard = await boardRepository.save(boardCreate);
  if(!newBoard){
    throw ApiErroe.badRequest("Not Found!");
  }
  return newBoard
};

const update = async (
  boardId: string,
  boardData: Board
): Promise<IBoard | null | undefined> => {
  const boardRepository = getManager().getRepository(Board);
  let board = await boardRepository.findOne(boardId)
  board = {...board, ...boardData}
  const boardUpdate = await boardRepository.save(board);
  if(!boardUpdate){
    throw ApiErroe.badRequest("Not Found!");
  }
  return boardUpdate;
};

const remove = async (itemId: string): Promise<boolean> => {
  const boardRepository = getManager().getRepository(Board);
  const boardRemove = await boardRepository.delete(itemId)
  if(!boardRemove){
    throw ApiErroe.badRequest("Not Found!");
  }
  return !!boardRemove
};

export { 
  getAll, 
  get, 
  create, 
  update, 
  remove };
