import Cache from "./cache"

export const isAuthenticated = (token: string) => {
    const storedToken = Cache.get(token);
    if (storedToken) {
        return true;
    } else {
        return false;
    }
}
