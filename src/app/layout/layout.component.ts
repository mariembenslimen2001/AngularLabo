import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthService } from 'src/services/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user !:any;
  constructor(private authService:AuthService, private router:Router , private ngZone:NgZone){

    this.authService.getUserClaims().then((u)=>
    {
      this.user = u;
      console.log(this.user.displayName);
      console.log(this.user.photoURL);

    })

  }

  isAuth():boolean{
    return !!this.user;
  }
  tryLogout(): void
  {
    this.authService.doLogout().then(()=>{this.successRedirect();//location.reload();
    interval(30).subscribe(() => {
      location.reload();});

    })
  }

  successRedirect(): void
  {
    this.ngZone.run(()=>this.router.navigate([ '/']));
  }

  ngOnInit(): void {

  }


}
