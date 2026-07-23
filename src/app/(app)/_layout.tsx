import { useEffect } from "react";
import { Redirect, Stack } from "expo-router";

import { useSession } from "@/providers/session-provider";
import { useCurrentUser } from "@/hooks/use-auth";
import { FullScreenLoader } from "@/components/full-screen-loader";

export default function AppLayout() {
  const { token, signOut } = useSession();
  const { isLoading, isError } = useCurrentUser(Boolean(token));

  useEffect(() => {
    if (isError) {
      void signOut();
    }
  }, [isError, signOut]);

  if (!token) {
    return <Redirect href="/login" />;
  }

  if (isLoading || isError) {
    return <FullScreenLoader label="جارٍ التحقق من الجلسة..." />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
