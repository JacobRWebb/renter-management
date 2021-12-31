export enum Role {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  TENANT = "TENANT",
  WORKER = "WORKER",
}
export interface Name {
  firstName: string;
  middleInitial: string;
  lastName: string;
}

export interface User {
  id: string;
  name: Name;
  email: string;
  roles: Role[];
  avatar: {
    change: false;
    pending: boolean;
  };
  createdAt: string;
  updatedAt: string;
}
