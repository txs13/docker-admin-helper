export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginError {
  errorMessage: string;
}

export interface CookiesData {
  accessToken?: string;
  refreshToken?: string;
  sessionTtl?: number;
  storedEmail?: string;
}

export interface UserInput {
  email: string;
  password: string;
  name: string;
  familyname?: string;
  phone?: string;
  address?: string;
  company?: string;
  position?: string;
  description?: string;
  userrole_id: string; // Types.ObjectId; - this item is different from UserInput in back-end
}

export interface UserDocument extends Omit<UserInput, "password"> {
  _id: string; // Types.ObjectId; - this item is different from UserDocument in back-end
  createdAt: Date;
  updatedAt: Date;
  isConfirmed?: boolean;
  __v: number;
  password?: string;
}

export interface RoleInput {
  role: string;
  description?: string;
}

export interface RoleDocument extends RoleInput {
  _id: string; // Types.ObjectId; - this item is different from UserDocument in back-end
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface AppSettings {
  currentUser?: UserDocument;
  currentRole?: RoleDocument;
  appRoles?: RoleDocument[];
  appUsers?: UserDocument[];
  cookiesData?: CookiesData;
  isAdmin?: boolean;
}