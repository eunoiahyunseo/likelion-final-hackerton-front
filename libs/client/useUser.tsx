import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}
export default function useUser(pathname?: string) {
  // const router = useRouter();

  const { data, error } = useSWR<ProfileResponse>(
    pathname !== "/enter"
      ? typeof window === "undefined"
        ? null
        : "/api/users/me"
      : null
  );

  // useEffect(() => {
  //   if (data && !data.ok) {
  //     router.replace("/enter");
  //   }
  // }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
