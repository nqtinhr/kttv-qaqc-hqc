import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: '500.component.html',
})
export class P500Component {
  constructor(private router: Router) {}
  backToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
