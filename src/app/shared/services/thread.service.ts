import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { Thread } from 'src/models/thread';


@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(public firestore: AngularFirestore, private route: ActivatedRoute) { }
  public thread: Thread = new Thread;
  public channels: Channels = new Channels;

  open = false;
  tid = '';
  i;


  

  openSidenav(i, channelId) {
    this.open = true;
    this.i = i;
      this.firestore
        .collection('channels')
        .doc(channelId)
        .valueChanges()
        .subscribe((channels: any) => {
          this.tid = channels.threadId[i];
          console.log(this.tid)
        })
  }


  makeThread(message, userName, userPhoto, channelId) {
    this.thread.message.push(message);
    this.thread.userName.push(userName);
    this.thread.userPhoto.push(userPhoto);
    this.firestore
      .collection('threads')
      .add(this.thread.toJson())
      .then((info: any) => {
        console.log('ID thread', info.id)
        this.tid = info.id;
        this.channels.threadId.push(this.tid);
        this.firestore
          .collection('channels')
          .doc(channelId)
          .update(this.channels.threadToJson())
      });

  }


}
