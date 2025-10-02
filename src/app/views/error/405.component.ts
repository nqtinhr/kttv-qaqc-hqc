import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: '405.component.html',
})
export class P405Component {
  constructor(private router: Router) {}

  backToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
