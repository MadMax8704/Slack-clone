import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/models/thread';


@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  
  constructor(public firestore: AngularFirestore) { }
  public thread: Thread = new Thread;

  open = false;
  tid = '';
  i ;

  openSidenav(i) {
    this.open = true;
    this.i = i;
  }

  makeThread() {
    this.firestore
    .collection('threads')
          .add(this.thread.toJson())
          .then((info: any) => {
            console.log('ID thread', info.id)
            this.tid = info.id;
          });
}


}
