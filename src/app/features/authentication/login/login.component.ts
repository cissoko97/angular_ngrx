import { Component, inject, OnInit } from '@angular/core';
import { NgForm, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthRequest, IUser } from 'app/core/models';
import { Observable } from 'rxjs';
import { AuthState } from '../redux';
import { AuthAction } from '../redux/authentication.action';
import { getAccesToken, getIsLoggedIn, getLoggedUser, getRefreshToken } from '../redux/authentication.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formBuilder = inject(NonNullableFormBuilder);
  authStore = inject(Store) as Store<AuthState>;
  router = inject(Router);

  mouseOverLogin = false;
  login = '';
  password = '';


  selectIsLoggedIn$: Observable<boolean> = this.authStore.select(getIsLoggedIn);
  selectLoggedUser$: Observable<Partial<IUser>> = this.authStore.select(getLoggedUser) as Observable<Partial<IUser>>;

  selectAccesToken$: Observable<string> = this.authStore.select(getAccesToken) as Observable<string>;
  selectRefreshToken$: Observable<string> = this.authStore.select(getRefreshToken) as Observable<string>;

  onLogOut(): void {
    this.authStore.dispatch(AuthAction.logOut())
  }



  ngOnInit(): void {
    const observer = {
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => { }
    }

    const request = indexedDB.open("MyTest", 3);

    const customerData = [
      { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
      { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
    ];

    request.onupgradeneeded = (event) => {
      // Save the IDBDatabase interface
      const db = (event?.target as any).result;

      // Create an objectStore for this database
      const objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

      // Create an index to search customers by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex("name", "name", { unique: false });

      // Create an index to search customers by email. We want to ensure that
      // no two customers have the same email, so use a unique index.
      objectStore.createIndex("email", "email", { unique: true });

      // Use transaction oncomplete to make sure the objectStore creation is
      // finished before adding data into it.
      objectStore.transaction.oncomplete = (e: Event) => {
        // Store values in the newly created objectStore.
        const customerObjectStore = db
          .transaction("customers", "readwrite")
          .objectStore("customers");
        customerData.forEach((customer) => {
          customerObjectStore.add(customer);
        });
      };
    };

    console.log(request);


  }

  submitForm(formValue: any): void {

    console.log(formValue);
    const payload: AuthRequest = {
      username: formValue?.login,
      password: formValue?.password,
      withRefreshToken: false,
      grantType: 'password',
    }

    this.authStore.dispatch(AuthAction.login(payload));
  }

  cancel(form: NgForm): void {
    form.reset()
  }

  mouseEvent(event: Event, status: boolean): void {
    event.preventDefault();
    this.mouseOverLogin = status;
  }
}
