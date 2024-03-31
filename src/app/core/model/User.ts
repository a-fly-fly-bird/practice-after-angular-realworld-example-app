import { Role } from "./Role";

export interface User {
  email: string;
  username: string;
  token: string;
  age: string;
  role?: Role[];
}
