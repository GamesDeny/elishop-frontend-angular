import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/models/path.enum';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navToHome() {
    this.router.navigate([Path.Mainpage]);
  }
}
