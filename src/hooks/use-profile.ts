import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, getProfile, updateProfile } from "@/lib/api";

export function useProfile(token: string | undefined) {
  return useQuery({
    queryKey: ["profile", token],
    queryFn: () => getProfile(token as string),
    enabled: Boolean(token),
  });
}

export function useUpdateProfile(token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => updateProfile(name, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useChangePassword(token: string | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { currentPassword?: string; newPassword: string }) =>
      changePassword(payload, token as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
