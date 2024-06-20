export interface ProjectPayload {
  id?: string
  name?: string;
  abbreviation: string;
  description: string;
  color: string
}

export interface ProjectResponse {
createdAt: any;
  id: number
  name: string
  abbreviation: string
  description: string
  color: string
  boards: Board[]
}

export interface Board {
  id: number
  name: string
  description: string
  position: number
  projectId: number
  project: ProjectResponse
  columns: Column[]
  tasks: Task2[]
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Column {
  id: number
  name: string
  description: string
  position: number
  boardId: number
  board: string
  tasks: Task[]
  taskStatus: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Task {
  id: number
  name: string
  description: string
  issueTypeId: number
  issueType: IssueType
  epicId: number
  epic: Epic
  projectId: number
  project: string
  boardId: number
  board: string
  boardColumnId: number
  boardColumn: string
  isBacklog: boolean
  priority: string
  taskStatus: string
  assigneeId: number
  assignee: Assignee
  reporterId: number
  reporter: Reporter
  createdById: number
  createdBy: CreatedBy
  deletedById: number
  deletedBy: DeletedBy
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface IssueType {
  id: number
  name: string
  description: string
  icon: string
  color: string
  isActive: boolean
  type: string
  issueTypeColumns: IssueTypeColumn[]
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface IssueTypeColumn {
  id: number
  name: string
  filedName: string
  type: string
  isRequired: boolean
  issueTypeId: number
  issueType: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Epic {
  id: number
  name: string
  description: string
  projectId: number
  position: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Assignee {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}

export interface Reporter {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}

export interface CreatedBy {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}

export interface DeletedBy {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}

export interface Task2 {
  id: number
  name: string
  description: string
  issueTypeId: number
  issueType: IssueType2
  epicId: number
  epic: Epic2
  projectId: number
  project: string
  boardId: number
  board: string
  boardColumnId: number
  boardColumn: string
  isBacklog: boolean
  priority: string
  taskStatus: string
  assigneeId: number
  assignee: Assignee2
  reporterId: number
  reporter: Reporter2
  createdById: number
  createdBy: CreatedBy2
  deletedById: number
  deletedBy: DeletedBy2
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface IssueType2 {
  id: number
  name: string
  description: string
  icon: string
  color: string
  isActive: boolean
  type: string
  issueTypeColumns: IssueTypeColumn2[]
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface IssueTypeColumn2 {
  id: number
  name: string
  filedName: string
  type: string
  isRequired: boolean
  issueTypeId: number
  issueType: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Epic2 {
  id: number
  name: string
  description: string
  projectId: number
  position: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface Assignee2 {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}

export interface Reporter2 {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}

export interface CreatedBy2 {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}

export interface DeletedBy2 {
  id: number
  createdAt: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  isActive: boolean
  userPermissions: string[]
  roles: string[]
  projects: string[]
}
