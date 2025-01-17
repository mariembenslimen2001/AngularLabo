import { Component, NgZone } from '@angular/core';
import { Route, Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService, private router:Router , private ngZone:NgZone){}
  tryGoogleLogin(): void
  {
    this.authService.doGoogleLogin().then(()=>{ this.successRedirect();//location.reload();
    interval(30).subscribe(() => {
      location.reload();});
    })

  }

  successRedirect(): void
  {
    this.ngZone.run(()=>this.router.navigate([ '/dashboard']));
  }


}
