import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SessionService } from "../session.service";
import { ViewService } from "../view.service";
import { forbiddenPasswordValidator } from "./create-account.directive";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.component.html",
  styleUrls: ["./create-account.component.scss"],
})
export class CreateAccountComponent {
  session: SessionService;
  loginForm = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.email,
    ]),
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      forbiddenPasswordValidator(),
    ]),
  });

  constructor(
    private http: HttpClient,
    private viewService: ViewService,
    private sessionService: SessionService
  ) {
    this.session = new SessionService(http);
  }

  get email() {
    return this.loginForm.get("email");
  }

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }

  async onSubmit() {
    console.log(this.loginForm.value);
    if (
      this.loginForm.value.username == "" ||
      this.loginForm.value.password == ""
    )
      return;
    // this.session.login(this.loginForm.value.username as string, this.loginForm.value.password as string)
    if (true) {
      this.sessionService.setSession(
        this.loginForm.value.username as string,
        "token",
        "userid"
      );
      this.viewService.setView("Dashboard");
    }
  }

  onRegister() {
    this.viewService.setView("Log");
  }
}
