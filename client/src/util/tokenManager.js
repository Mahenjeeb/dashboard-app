import instance from "@/services/auth_service";
class TokenManager {
  token = null;
  refreshPromise = null;

  getAccessToken() {
    return this.token;
  }

  setAccessToken(token) {
    this.token = token;
  }

  async refreshToken() {
    if (this.refreshPromise) return this.refreshPromise;
    this.refreshPromise = instance
      .post("/refresh")
      .then(res => {
        this.token = res.data.accessToken;
        console.log(this.token);
        return this.token;
      })
      .finally(() => {
        this.refreshPromise = null;
      });
    return this.refreshPromise;
  }

  logout() {
    this.token = null;
    window.location.href = "/signup";
  }
}

export default new TokenManager();