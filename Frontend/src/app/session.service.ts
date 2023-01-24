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
    userid: string | null;
}

@Injectable({
    providedIn: "root",
})
export class SessionService {
    user: string | null = null;
    token: string | null = null;
    project: string | null = null;
    userid: string | null = null;
    firstname: string | null = null;
    lastname: string | null = null;

    constructor(private http: HttpClient) {}


    login(username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let path = `${ENV.SERVER_ADRESS_A}/auth/login`;
            this.http.post(path, {username, password}).subscribe(
                (response: Object) => {
                    let castedResponse = response as LoginResponse;
                    if (castedResponse.status === 401) reject();
                    else resolve(0);
                }
            );
        });
    }


    public setSession(username: string, token: string, userid: string, firstname: string, lastname: string, project: string = "DEFAULT__"): void {
        this.user = username;
        this.token = token;
        this.project = project;
        this.userid = userid;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public getSession(): UserSession {
        return {
            user: this.user,
            token: this.token,
            project: this.project,
            userid: this.userid,
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

    public get UserID(): string {
        if (this.userid === null) return "";
        return this.userid;
    }

    public get FirstName(): string {
        if (this.firstname === null) return "";
        return this.firstname;
    }

    public get LastName(): string {
        if (this.lastname === null) return "";
        return this.lastname;
    }

    public get FullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }

    public get IsLoggedIn(): boolean {
        return this.user !== null && this.token !== null;
    }
}