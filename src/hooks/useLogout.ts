import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const { logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();

    setTimeout(() => {
      router.push("/login");
    }, 5000);
  };

  return { handleLogout };
};
