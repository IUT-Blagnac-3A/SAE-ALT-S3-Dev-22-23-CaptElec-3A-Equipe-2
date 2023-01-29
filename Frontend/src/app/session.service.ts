import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import ENV from "./environments/environment";

interface LoginResponse {
  status: number;
  body: any;
}

interface UserSession {
  user: string | null;
  token: string | null;
  project: string | null;
}

@Injectable({
  providedIn: "root",
})
export class SessionService {
  user: string | null;
  token: string | null;
  project: string | null;

  constructor(private http: HttpClient) {
    this.user = localStorage.getItem("user");
    this.token = localStorage.getItem("token");
    this.project = localStorage.getItem("project");
  }

  login(username: string, password: string): Promise<UserSession | null> {
    return new Promise<any>(async (resolve, reject) => {
      let path = `${ENV.SERVER_ADRESS_A}/auth/login`;
      await this.http
        .post(path, { username, password })
        .subscribe(async (response: Object) => {
          let castedResponse = response as LoginResponse;
          if (castedResponse.status === 401) return resolve(-1);
          let userSession = await this.setSession(
            username,
            //@ts-ignore
            castedResponse.token
          );
          resolve(userSession);
        });
    });
  }

  async setSession(
    user: string,
    token: string,
    project: string = "IUT-BLAGNAC"
  ): Promise<UserSession | null> {
    this.user = user;
    this.token = token;
    this.project = project;
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
    localStorage.setItem("project", project);
    localStorage.setItem(token, user);
    localStorage.setItem(user, project);
    return this.getSession();
  }

  getSession(): UserSession | null {
    if (this.user === null || this.token === null || this.project === null)
      return null;
    return {
      user: this.user,
      token: this.token,
      project: this.project,
    };
  }

  resetSession(): void {
    this.user = null;
    this.token = null;
    this.project = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("project");
  }

  isThereARunningSession(): boolean {
    return this.user !== null && this.token !== null && this.project !== null;
  }

  loadBackSessionFromToken(token: string): void {
    this.token = token;
    this.user = localStorage.getItem(token);
    this.project = localStorage.getItem(this.user as string);
  }

  reachToken(): string | null {
    return localStorage.getItem("token");
  }

  getToken(): string | null {
    return this.token;
  }

  getProject(): string | null {
    return this.project;
  }

  getUser(): string | null {
    return this.user;
  }
}
