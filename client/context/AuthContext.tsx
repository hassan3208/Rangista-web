// // import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
// // import axios from "axios";

// // export type User = { id: string; email: string; name: string } | null;

// // interface AuthContextValue {
// //   user: User;
// //   loading: boolean;
// //   signup: (name: string, username: string, email: string, password: string) => Promise<void>;
// //   login: (email: string, password: string) => Promise<void>;
// //   logout: () => void;
// // }

// // const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// // const LS_USER_KEY = "rangista_user";
// // const API_BASE = "http://127.0.0.1:8000"; // FastAPI backend URL

// // export function AuthProvider({ children }: { children: ReactNode }) {
// //   const [user, setUser] = useState<User>(null);
// //   const [loading, setLoading] = useState(true);

// //   // On mount, check localStorage for logged-in user
// //   useEffect(() => {
// //   const raw = localStorage.getItem(LS_USER_KEY);
// //   console.log("🔹 useEffect triggered | Raw user from localStorage:", raw);

// //   if (raw) {
// //     const parsedUser = JSON.parse(raw);
// //     console.log("✅ Parsed user object:", parsedUser);
// //     setUser(parsedUser);
// //   } else {
// //     console.log("⚠️ No user found in localStorage");
// //   }

// //   setLoading(false);
// //   console.log("⏳ Loading set to false");
// //   }, []);


// //   // Signup function
// //   const signup = async (name: string, username: string, email: string, password: string) => {
// //     try {

// //       console.log("Signup payload:", { name, username, email, password });
// //       const response = await axios.post(`${API_BASE}/signup`, {
// //         name,
// //         username,
// //         email,
// //         password,
// //       });
// //       const userData = response.data; // backend returns UserResponse
// //       localStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
// //       setUser(userData);
// //     } catch (error: any) {

// //       console.log("Signup error:", error.response?.data);
// //       throw new Error(error.response?.data?.detail || "Signup failed");
// //     }
// //   };

// //   // Login function
// //   const login = async (username: string, password: string) => {
// //     try {
// //       const formData = new URLSearchParams();
// //       formData.append("username", username);
// //       formData.append("password", password);

// //       const response = await axios.post(`${API_BASE}/signin`, formData, {
// //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //       });

// //       const token = response.data.access_token;
// //       localStorage.setItem("token", token);

// //       // Fetch current user info
// //       const userResp = await axios.get(`${API_BASE}/users/me`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const userData = userResp.data;
// //       localStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
// //       setUser(userData);
// //     } catch (error: any) {
// //       throw new Error(error.response?.data?.detail || "Login failed");
// //     }
// //   };

// //   // Logout function
// //   const logout = () => {
// //     localStorage.removeItem(LS_USER_KEY);
// //     localStorage.removeItem("token");
// //     setUser(null);
// //   };

// //   const value = useMemo(
// //     () => ({ user, loading, signup, login, logout }),
// //     [user, loading]
// //   );

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // }

// // // Hook to use Auth context
// // export function useAuth() {
// //   const ctx = useContext(AuthContext);
// //   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
// //   return ctx;
// // }











// import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "@/lib/api-config";

// export type User = { id: string; email: string; name: string; username: string; contact_number: string } | null;

// interface AuthContextValue {
//   user: User;
//   loading: boolean;
//   signup: (
//     name: string,
//     username: string,
//     email: string,
//     password: string,
//     contact_number: string,
//     permanent_address: string,
//     country: string,
//     city: string,
//     contact_number_2?: string
//   ) => Promise<void>;
//   login: (login: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// const LS_USER_KEY = "rangista_user";
// const LS_TOKEN_KEY = "token";
// const API_BASE = API_BASE_URL; // FastAPI backend URL

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User>(null);
//   const [loading, setLoading] = useState(true);

//   // Check for token, clean localStorage, and attempt to log in on mount
//   useEffect(() => {
//     // Clean localStorage: remove all keys except 'rangista_favorites' and 'token'
//     Object.keys(localStorage).forEach((key) => {
//       if (key !== "rangista_favorites" && key !== LS_TOKEN_KEY) {
//         console.log(`🗑️ Removing unauthorized localStorage key: ${key}`);
//         localStorage.removeItem(key);
//       }
//     });

//     const token = localStorage.getItem(LS_TOKEN_KEY);
//     if (token) {
//       console.log("✅ Found token in localStorage, attempting to fetch user...");
//       axios
//         .get(`${API_BASE}/users/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           const userData = response.data;
//           console.log("✅ Fetched user data:", userData);
//           sessionStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
//           setUser(userData);
//         })
//         .catch((error) => {
//           console.log("⚠️ Token-based login failed:", error.response?.data || error.message);
//           localStorage.removeItem(LS_TOKEN_KEY); // Remove invalid token
//           sessionStorage.removeItem(LS_USER_KEY); // Clear user data
//         })
//         .finally(() => {
//           setLoading(false);
//           console.log("⏳ Loading set to false");
//         });
//     } else {
//       // Check sessionStorage for user data if no token is found
//       const raw = sessionStorage.getItem(LS_USER_KEY);
//       if (raw) {
//         const parsedUser = JSON.parse(raw);
//         console.log("✅ Parsed user object from sessionStorage:", parsedUser);
//         setUser(parsedUser);
//       } else {
//         console.log("⚠️ No token or user found");
//       }
//       setLoading(false);
//       console.log("⏳ Loading set to false");
//     }
//   }, []);

//   // Signup function
//   const signup = async (
//     name: string,
//     username: string,
//     email: string,
//     password: string,
//     contact_number: string,
//     permanent_address: string,
//     country: string,
//     city: string,
//     contact_number_2?: string
//   ) => {
//     try {
//       console.log("Signup payload:", {
//         name,
//         username,
//         email,
//         password,
//         contact_number,
//         permanent_address,
//         country,
//         city,
//         contact_number_2,
//       });
//       const response = await axios.post(`${API_BASE}/signup`, {
//         name,
//         username,
//         email,
//         password,
//         contact_number,
//         permanent_address,
//         country,
//         city,
//         contact_number_2,
//       });
//       const userData = response.data; // backend returns UserResponse
//       sessionStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
//       setUser(userData);
//     } catch (error: any) {
//       console.log("Signup error:", error.response?.data);
//       throw new Error(error.response?.data?.detail || "Signup failed");
//     }
//   };

//   // Login function
//   const login = async (login: string, password: string) => {
//     try {
//       const formData = new URLSearchParams();
//       formData.append("username", login); // Backend accepts username, email, or contact_number
//       formData.append("password", password);

//       const response = await axios.post(`${API_BASE}/signin`, formData, {
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       });

//       const token = response.data.access_token;
//       localStorage.setItem(LS_TOKEN_KEY, token);

//       // Fetch current user info
//       const userResp = await axios.get(`${API_BASE}/users/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const userData = userResp.data;
//       sessionStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
//       setUser(userData);
//     } catch (error: any) {
//       throw new Error(error.response?.data?.detail || "Login failed");
//     }
//   };

//   // Logout function
//   const logout = () => {
//     sessionStorage.removeItem(LS_USER_KEY);
//     localStorage.removeItem(LS_TOKEN_KEY);
//     setUser(null);
//   };

//   const value = useMemo(
//     () => ({ user, loading, signup, login, logout }),
//     [user, loading]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// // Hook to use Auth context
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }






















import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api-config";

export type User = { id: string; email: string; name: string; username: string; contact_number: string } | null;

interface AuthContextValue {
  user: User;
  loading: boolean;
  signup: (
    name: string,
    username: string,
    email: string,
    password: string,
    contact_number: string,
    permanent_address: string,
    country: string,
    city: string,
    contact_number_2?: string
  ) => Promise<void>;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LS_USER_KEY = "rangista_user";
const LS_TOKEN_KEY = "token";
const API_BASE = API_BASE_URL; // FastAPI backend URL

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Check for token, clean localStorage, and attempt to log in on mount
  useEffect(() => {
    // Clean localStorage: remove all keys except 'rangista_favorites' and 'token'
    Object.keys(localStorage).forEach((key) => {
      if (key !== "rangista_favorites" && key !== LS_TOKEN_KEY) {
        console.log(`🗑️ Removing unauthorized localStorage key: ${key}`);
        localStorage.removeItem(key);
      }
    });

    const token = localStorage.getItem(LS_TOKEN_KEY);
    if (token) {
      console.log("✅ Found token in localStorage, attempting to fetch user...");
      axios
        .get(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const userData = response.data;
          console.log("✅ Fetched user data:", userData);
          sessionStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
          setUser(userData);
        })
        .catch((error) => {
          console.log("⚠️ Token-based login failed:", error.response?.data || error.message);
          localStorage.removeItem(LS_TOKEN_KEY); // Remove invalid token
          sessionStorage.removeItem(LS_USER_KEY); // Clear user data
        })
        .finally(() => {
          setLoading(false);
          console.log("⏳ Loading set to false");
        });
    } else {
      // Check sessionStorage for user data if no token is found
      const raw = sessionStorage.getItem(LS_USER_KEY);
      if (raw) {
        const parsedUser = JSON.parse(raw);
        console.log("✅ Parsed user object from sessionStorage:", parsedUser);
        setUser(parsedUser);
      } else {
        console.log("⚠️ No token or user found");
      }
      setLoading(false);
      console.log("⏳ Loading set to false");
    }
  }, []);

  // Signup function
  const signup = async (
    name: string,
    username: string,
    email: string,
    password: string,
    contact_number: string,
    permanent_address: string,
    country: string,
    city: string,
    contact_number_2?: string
  ) => {
    try {
      console.log("Signup payload:", {
        name,
        username,
        email,
        password,
        contact_number,
        permanent_address,
        country,
        city,
        contact_number_2,
      });
      const response = await axios.post(`${API_BASE}/signup`, {
        name,
        username,
        email,
        password,
        contact_number,
        permanent_address,
        country,
        city,
        contact_number_2,
      });
      const userData = response.data; // backend returns UserResponse
      sessionStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      console.log("Signup error:", error.response?.data);
      throw new Error(error.response?.data?.detail || "Signup failed");
    }
  };

  // Login function
  const login = async (login: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", login); // Backend accepts username, email, or contact_number
      formData.append("password", password);

      const response = await axios.post(`${API_BASE}/signin`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = response.data.access_token;
      localStorage.setItem(LS_TOKEN_KEY, token);

      // Fetch current user info
      const userResp = await axios.get(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = userResp.data;
      sessionStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Login failed");
    }
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem(LS_USER_KEY);
    localStorage.removeItem(LS_TOKEN_KEY);
    setUser(null);
  };

  // Refresh user from server using stored token
  const refreshUser = async () => {
    const token = localStorage.getItem(LS_TOKEN_KEY);
    if (!token) throw new Error("Missing auth token");
    const userResp = await axios.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = userResp.data;
    sessionStorage.setItem(LS_USER_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const value = useMemo(
    () => ({ user, loading, signup, login, logout, refreshUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use Auth context
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
