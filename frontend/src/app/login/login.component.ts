import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public displayErrors = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null,  [Validators.email, Validators.required]),
      password: new FormControl(null, Validators.required)
    });

  }

  public logIn(): void {
    this.displayErrors = true;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        user => {
        this.userService.setLoggedUser(user);
        this.router.navigate(['/admin']);
      });
    }
  }

}
