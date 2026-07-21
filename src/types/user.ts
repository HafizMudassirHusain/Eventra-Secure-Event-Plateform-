export type Role = "USER" | "ORGANIZER" | "ADMIN";

export interface Profile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: Role;
  hasPassword: boolean;
}
