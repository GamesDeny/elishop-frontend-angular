import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/models/path.enum';

@Component({
  selector: 'app-operation-forbidden',
  templateUrl: './operation-forbidden.component.html',
  styleUrls: ['./operation-forbidden.component.css']
})
export class OperationForbiddenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navToLogin(){
    this.router.navigate([Path.Login]);
  }

}
