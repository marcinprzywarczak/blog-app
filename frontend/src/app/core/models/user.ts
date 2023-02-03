import { Role } from './role';

export interface User {
  id: number;
  name: string;
  email: string;
  avatarName: string;
  avatarUrl: string;
  roles: Role[];
}
