import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  open = false;
  openSidenav(i) {
    if (this.open) {
      this.open = false;
    } else {
      this.open = true;
    }

    

  }
  constructor() { }
}
