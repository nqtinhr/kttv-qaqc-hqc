import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p403',
  templateUrl: './p403.component.html'
})
export class P403Component implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  backToHome(): void {
    this.router.navigateByUrl('/dashboard');
  }

}
