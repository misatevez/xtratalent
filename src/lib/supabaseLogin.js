import supabase from "./supabaseClient";

// Login function
const login = async (email, password) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
console.log(data, error);
        if (error) {
            throw new Error(error.message);
        }

        return user;
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};

// Logout function
const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(error.message);
        }

        console.log('Logged out successfully');
    } catch (error) {
        console.error('Logout error:', error.message);
        throw error;
    }
};

// Export the Supabase client, login, and logout functions
export { login, logout };
