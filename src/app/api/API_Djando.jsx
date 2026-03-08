import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/";
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const getAccess = () => localStorage.getItem("access_token");
const getRefresh = () => localStorage.getItem("refresh_token");

export const setTokens = (access, refresh) => {
  if (access) localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

const publicRoutes = [
  "login/",
  "register/",
  "otp/send/",
  "otp/verify/",
  "password-forgot/",
  "password-reset-confirm/",
  "token/refresh/",
  "enseignants/register/",
  "enseignants/login/",
];

api.interceptors.request.use((config) => {
  const token = getAccess();
  const url = config.url || "";
  const isPublicRoute = publicRoutes.some((route) => url.includes(route));

  if (token && !isPublicRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";
    const isPublicRoute = publicRoutes.some((route) => url.includes(route));

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      getRefresh() &&
      !isPublicRoute
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh: getRefresh(),
        });

        const newAccess = refreshRes.data.access;
        setTokens(newAccess, null);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch {
        clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
