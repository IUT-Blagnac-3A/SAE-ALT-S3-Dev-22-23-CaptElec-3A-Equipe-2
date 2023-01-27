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
  user: string | null = null;
  token: string | null = null;
  project: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<number> {
    return new Promise<any>(async (resolve, reject) => {
      let path = `${ENV.SERVER_ADRESS_A}/auth/login`;
      await this.http
        .post(path, { username, password })
        .subscribe((response: Object) => {
          let castedResponse = response as LoginResponse;
          if (castedResponse.status === 401) return resolve(-1);
          console.log(castedResponse);
          //@ts-ignore
          this.setSession(username, castedResponse.token);
          resolve(0);
        });
    });
  }

  isThereARunningSession(): boolean {
    let tokenFound = localStorage.getItem("token");
    return tokenFound !== null;
  }

  getToken(): string {
    let tokenFound = localStorage.getItem("token");
    if (tokenFound === null) return "";
    return tokenFound;
  }

  getUsername(): string {
    let usernameFound = localStorage.getItem("username");
    if (usernameFound === null) return "";
    return usernameFound;
  }

  resetSession(): void {
    this.user = null;
    this.token = null;
    this.project = null;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  loadBackSessionFromToken(token: string): Promise<number> {
    let tokenFound = localStorage.getItem(token);
    let usernameFound = localStorage.getItem("username");
    if (tokenFound === null || usernameFound === null)
      return Promise.reject(-1);
    this.setSession(usernameFound, tokenFound);
    return Promise.resolve(0);
  }

  public setSession(
    username: string,
    token: string,
    project: string = "IUT-BLAGNAC"
  ): void {
    this.user = username;
    this.token = token;
    this.project = project;
    localStorage.setItem(token, username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

  public getSession(): UserSession {
    return {
      user: this.user,
      token: this.token,
      project: this.project,
    };
  }

  public set Project(project: string) {
    this.project = project;
  }

  public get Project(): string {
    if (this.project === null) return "DEFAULT__";
    return this.project;
  }

  public get User(): string {
    if (this.user === null) return "";
    return this.user;
  }

  public get Token(): string {
    if (this.token === null) return "";
    return this.token;
  }

  public get IsLoggedIn(): boolean {
    return this.user !== null && this.token !== null;
  }
}
