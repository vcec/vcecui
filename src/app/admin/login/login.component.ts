import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {CookieService} from "angular2-cookie/core";
import {Router, ActivatedRoute} from "@angular/router";
import {DataService} from "../../services/dataService.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  loginError = "";

  constructor(private _cookieService: CookieService, private dataService: DataService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.invalid) {
      return false;
    }
    let userId = this.loginForm.value.userId;
    this.dataService.login(this.loginForm.value).subscribe((res) => {
      this._cookieService.put("accessToken", res['token']);
      this._cookieService.put("userId", userId);
      this.dataService.setAccessToekn(res['token']);
      this.router.navigate(['/admin/groups'], {relativeTo: this.route});
    }, (err) => {
      if (err.status === 0) {
        this.loginError = "Server is down.";
      }else if (err.status == 401) {
        this.loginError = "Invalid User";
      } else {
        this.loginError = err.error.error || err;
      }
    });
  }


}
