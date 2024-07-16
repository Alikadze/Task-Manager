import { Task } from "../interfaces/project";

export class ColumnTestCopy {
  constructor(
    public name: string,
    public description: string,
    public position: number,
    public boardId: number,
    public taskStatus: string,
    public tasks?: Task[]
  ){

  }
}