export interface EpicPayload {
  name: string,
  description: string,
  position: number
}

export interface Epic {
  id: number,
  name: string,
  description: string,
  projectId: number,
  position: number,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date
}