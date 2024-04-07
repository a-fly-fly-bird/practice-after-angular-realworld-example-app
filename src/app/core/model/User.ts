import { Role } from './Role';

export interface User {
  email: string;
  name: string;
  token: string;
  age: string;
  isDeleted: boolean;
  role?: Role[];
}
