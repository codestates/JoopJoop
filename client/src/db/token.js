const TOKEN = "token";

// 브라우저 API인 로컬스토리지 이용 (기본 수준)

export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}
