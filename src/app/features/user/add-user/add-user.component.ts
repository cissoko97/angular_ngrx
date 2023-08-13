import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  title: string = 'bonjour';
  constructor() { }

  ngOnInit(): void {
  }


  close(): void {
  }
}
