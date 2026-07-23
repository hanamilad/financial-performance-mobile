import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchCurrentUser,
  login,
  logout,
  type AuthUser,
  type LoginCredentials,
} from "@/lib/auth";
import { getDeviceName } from "@/lib/device-name";
import { useSession } from "@/providers/session-provider";

export const currentUserKey = ["auth", "mobile-me"] as const;

export function useCurrentUser(enabled: boolean) {
  return useQuery<AuthUser>({
    queryKey: currentUserKey,
    queryFn: fetchCurrentUser,
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const { signIn } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      login({ ...credentials, device_name: getDeviceName() }),
    onSuccess: async ({ token, user }) => {
      await signIn(token);
      queryClient.setQueryData(currentUserKey, user);
    },
  });
}

export function useLogout() {
  const { signOut } = useSession();

  return useMutation({
    mutationFn: logout,
    onSettled: () => signOut(),
  });
}
