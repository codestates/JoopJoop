// AuthService 에 http 모듈과 tokenStorage를 가지고 옴
// 토큰을 저장하고 읽을 수 있는 클래스이다.

export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }
  // UI 로부터 데이터를 받는다
  async signup(username, password, passwordConfirm, nickname, email) {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        passwordConfirm,
        nickname,
        email,
      }),
    });
    // 성공이라면 tokenStorage에 저장.
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  // 성공이라면 토큰스토리지에 저장.
  async login(username, password) {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  // 토큰을 읽어와서 토큰을 헤더에 추가해서 보내준다.
  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch("/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // 클라이언트 자체적으로 토큰 지우면 된다.
  async logout() {
    this.tokenStorage.clearToken();
  }
}
