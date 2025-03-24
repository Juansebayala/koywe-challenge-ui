import { storage } from "./storage";

export const handleGlobalLogout = () => {
  storage.clearTokens();

  setTimeout(() => {
    window.location.href = "/login";
  }, 5000);
};
