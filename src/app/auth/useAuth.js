export function useAuth() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const accessToken = localStorage.getItem("access_token");

  return { user, accessToken, loading: false };
}
