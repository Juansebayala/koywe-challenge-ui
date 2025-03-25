import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  return { handleLogout };
};
