import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p505',
  templateUrl: './p505.component.html',
})
export class P505Component implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  backToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }
}
