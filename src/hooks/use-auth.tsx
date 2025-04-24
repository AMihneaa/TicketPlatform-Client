import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("Authorization", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}