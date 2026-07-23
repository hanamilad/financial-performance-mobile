import { api } from "@/lib/api";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResponse = { token: string; user: AuthUser };

export async function login(
  credentials: LoginCredentials & { device_name: string },
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/api/v1/auth/mobile/login",
    credentials,
  );
  return data;
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const { data } = await api.get<{ data: AuthUser }>("/api/v1/auth/mobile/me");
  return data.data;
}

export async function logout(): Promise<void> {
  await api.post("/api/v1/auth/mobile/logout");
}
