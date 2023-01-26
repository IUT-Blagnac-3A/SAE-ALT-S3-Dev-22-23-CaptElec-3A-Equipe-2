import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SessionService } from "../session.service";
import { ViewService } from "../view.service";

@Component({
  selector: "app-logpage",
  templateUrl: "./logpage.component.html",
  styleUrls: ["./logpage.component.scss"],
})
export class LogpageComponent {
  session: SessionService;
  incorrectPassword = false;
  loginForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private http: HttpClient,
    private viewService: ViewService,
    private sessionService: SessionService
  ) {
    this.session = new SessionService(http);
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
    if (false) {
      this.sessionService.setSession(
        this.loginForm.value.username as string,
        "token",
        "userid",
        "firstname",
        "lastname"
      );
      this.viewService.setView("Dashboard");
    } else {
      this.incorrectPassword = true;
    }
  }

  onRegister() {
    this.viewService.setView("Create Account");
  }
}
