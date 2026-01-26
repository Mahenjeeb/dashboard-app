import instance from "@/services/auth_service";
class TokenManager {
  constructor() {
    this.token = localStorage.getItem("token");
    this.refreshPromise = null;
  }
  async setAccessToken(token) {
    if (token) {
      this.token = token;
      localStorage.setItem("token", token);
    } else {
      await this.refreshToken();
    }
  }
  async refreshToken() {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }
    this.refreshPromise = (async () => {
      try {
        const { data } = await instance.post("/refresh");
        this.token = data.accessToken;
        localStorage.setItem("token", this.token);
        return this.token;
      } catch (error) {
        console.error("Token refresh failed:", error);
        this.clearToken();
        throw error;
      } finally {
        this.refreshPromise = null;
      }
    })();
    return this.refreshPromise;
  }
  getAccessToken() {
    return this.token;
  }
  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }
  isTokenValid() {
    return !!this.token;
  }
}
// Create singleton instance
const tokenManager = new TokenManager();
export default tokenManager;