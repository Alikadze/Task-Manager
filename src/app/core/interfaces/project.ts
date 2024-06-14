export interface ProjectPayload {
  id?: string
  name?: string;
  abbreviation: string;
  description: string;
  color: string
}

export interface ProjectResponse {
  welcome: Welcome;
}

export interface Welcome {
  id:           number;
  name:         string;
  abbreviation: string;
  description:  string;
  color:        string;
  boards:       Board[];
}

export interface Board {
  id:          number;
  name:        string;
  description: string;
  position:    number;
  projectId:   number;
  project:     string;
  columns:     Column[];
  tasks:       Task[];
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   Date;
}

export interface Column {
  id:          number;
  name:        string;
  description: string;
  position:    number;
  boardId:     number;
  board:       string;
  tasks:       Task[];
  taskStatus:  string;
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   Date;
}

export interface Task {
  id:            number;
  name:          string;
  description:   string;
  issueTypeId:   number;
  issueType:     IssueType;
  epicId:        number;
  epic:          Epic;
  projectId:     number;
  project:       string;
  boardId:       number;
  board:         string;
  boardColumnId: number;
  boardColumn:   string;
  isBacklog:     boolean;
  priority:      string;
  taskStatus:    string;
  assigneeId:    number;
  assignee:      Assignee;
  reporterId:    number;
  reporter:      Assignee;
  createdById:   number;
  createdBy:     Assignee;
  deletedById:   number;
  deletedBy:     Assignee;
  createdAt:     Date;
  updatedAt:     Date;
  deletedAt:     Date;
}

export interface Assignee {
  id:              number;
  createdAt:       Date;
  firstName:       string;
  lastName:        string;
  email:           string;
  mobileNumber:    string;
  isActive:        boolean;
  userPermissions: string[];
  roles:           string[];
  projects:        string[];
}

export interface Epic {
  id:          number;
  name:        string;
  description: string;
  projectId:   number;
  position:    number;
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   Date;
}

export interface IssueType {
  id:               number;
  name:             string;
  description:      string;
  icon:             string;
  color:            string;
  isActive:         boolean;
  type:             string;
  issueTypeColumns: IssueTypeColumn[];
  createdAt:        Date;
  updatedAt:        Date;
  deletedAt:        Date;
}

export interface IssueTypeColumn {
  id:          number;
  name:        string;
  filedName:   string;
  type:        string;
  isRequired:  boolean;
  issueTypeId: number;
  issueType:   string;
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   Date;
}
