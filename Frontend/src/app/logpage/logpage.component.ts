import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-logpage',
  templateUrl: './logpage.component.html',
  styleUrls: ['./logpage.component.scss'],
})
export class LogpageComponent {
  session: SessionService;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient) { 
    this.session = new SessionService(http);

  }

  async onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.value.username == "" || this.loginForm.value.password == "") return;
    this.session.login(this.loginForm.value.username as string, this.loginForm.value.password as string)

  }
}
