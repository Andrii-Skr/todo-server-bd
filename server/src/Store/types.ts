import { JwtPayload } from "jsonwebtoken";

export enum Category {
  Task = "Task",
  Idea = "Idea",
  Random_Thought = "Random Thought",
}

export type Note = {
  dates: string[];
  id: number;
  name: string;
  created: string;
  category: Category;
  content: string;
  archive: boolean;
};

export type TempNote = Omit<Note, "dates" | "id" | "created">;

export type CategoryStat = { [key: string]: { archive: number; active: number; id: number } };

export type Stat = {
  archive: number;
  active: number;
  id: number;
  category: string;
};

export interface MyPayload extends JwtPayload {
  email: string;
  id: string;
  isActivated: boolean;
}

export type Payload = { email: string; id: string; isActivated: boolean };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      port?: string;

      DbUrl: string;

      JWT_AccessKey: string;
      JWT_RefreshKey: string;

      SMTP_Host: string;
      SMTP_Post: string;
      Mail_auth_log: string;
      Mail_auth_pass: string;

      Api_Url: string;
      Client_Url: string;
    }
  }
  interface JwtPayload {
    email: string;
    id: string;
    isActivated: boolean;
  }
  namespace Express {
    interface Request {
      user: Payload;
    }
  }
}
