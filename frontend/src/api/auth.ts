import apiClient from "./client";
import type {User, Token} from "../types";

export type RegisterBody = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export async function register(data: RegisterBody): Promise<User> {
  const {data: user} = await apiClient.post<User>("/auth/register", data);
  return user;
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<Token> {
  const {data: token} = await apiClient.post<Token>("/auth/login", data);
  return token;
}

export async function getProfile(): Promise<User> {
  const {data: user} = await apiClient.get<User>("/users/me");
  return user;
}

export async function updateProfile(patch: Partial<Pick<User, "email"|"first_name"|"last_name">>): Promise<User> {
  const {data: user} = await apiClient.put<User>("/users/me", patch);
  return user;
}
