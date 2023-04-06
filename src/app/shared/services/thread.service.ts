import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { Thread } from 'src/models/thread';
import { ThreadComponent } from 'src/app/thread/thread.component';


@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  constructor(public firestore: AngularFirestore, private route: ActivatedRoute) { }
  public thread: Thread = new Thread;
  public channels: Channels = new Channels;
  public message;
  public userName;
  public userPhoto;

  open = false;
  tid = '';
  i;

  openSidenav(i, channelId) {
    this.open = true;
    this.i = i;
    this.channels.threadId = [];
    console.log('before subscribe channels', this.channels.threadId)
    this.firestore
      .collection('channels')
      .doc(channelId)
      .valueChanges()
      .subscribe((channels: any) => {
        this.tid = channels.threadId[i];
        console.log(this.tid)
        this.channels.threadId = channels.threadId[i];
        console.log('after subscribe channels', this.channels.threadId)
        // this.threadComponent.loadThread(this.tid);
        this.firestore
          .collection('threads')
          .doc(this.tid)
          .valueChanges()
          .subscribe((thread: any) => {
            console.log('service', thread)
            this.message = thread.message;
            this.userName = thread.userName;
            this.userPhoto = thread.userPhoto;
          })
      })
  }


  makeThread(message, userName, userPhoto, channelId) {
    this.thread.message = [];
    this.thread.userName = [];
    this.thread.userPhoto = [];
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
