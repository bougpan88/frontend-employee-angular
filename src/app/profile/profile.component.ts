import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  user : User | undefined;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
