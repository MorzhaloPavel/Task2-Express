import { IColumn } from "src/shared/interfaces"

export class CreateBoardsDto {
    readonly title
    readonly columns: IColumn[] | null
}