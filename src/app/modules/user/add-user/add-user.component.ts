import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  title: string = 'bonjour';
  constructor(public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
  }


  close(): void {
    this.dialogRef.close({})
  }
}
