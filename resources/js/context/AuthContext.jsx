import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios to send cookies
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/user");
                setUser({ ...response.data, is_admin: response.data.is_admin === 1 || response.data.is_admin === true });
            } catch (error) {
                // User is not logged in, which is fine
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            // Get CSRF token first (Laravel Sanctum/Session requirement)
            await axios.get('/sanctum/csrf-cookie').catch(() => { }); // Ignore error if route missing, usually Laravel handles this via headers automatically if session holds it

            const response = await axios.post("/api/login", { email, password });

            const loggedUser = response.data.user;
            setUser({ ...loggedUser, is_admin: loggedUser.is_admin === 1 || loggedUser.is_admin === true });

            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const signup = async (name, email, password, password_confirmation) => {
        try {
            // Get CSRF token first
            await axios.get('/sanctum/csrf-cookie').catch(() => { });

            const response = await axios.post("/api/register", {
                name,
                email,
                password,
                password_confirmation,
            });

            const loggedUser = response.data.user;
            setUser({ ...loggedUser, is_admin: loggedUser.is_admin === 1 || loggedUser.is_admin === true });

            return true;
        } catch (error) {
            console.error("Signup failed", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/logout");
        } catch (e) {
            // ignore error on logout
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin: user?.is_admin }}>
            {children}
        </AuthContext.Provider>
    );
};
