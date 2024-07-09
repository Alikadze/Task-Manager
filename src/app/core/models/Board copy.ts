import { Column, ColumnPayload, ProjectResponse, Task2 } from "../interfaces/project";

export class BoardTestCopy {
  constructor(
    public name: string,
    public description: string,
    public position: number,
    public columns: Column[]
  ) {
  }
}