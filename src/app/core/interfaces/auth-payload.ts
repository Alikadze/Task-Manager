export interface AuthPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponce {
  user: User
  token: Token
}

export interface User {
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

export interface Token {
  expiresIn: number
  accessToken: string
  refreshToken: string
}
