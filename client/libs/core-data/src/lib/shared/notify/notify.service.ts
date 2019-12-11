import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(message: string, action = 'Ok') {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }
}
