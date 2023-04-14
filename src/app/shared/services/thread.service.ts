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
  public userEmail;
  public threadIds;
  public messagetime;

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
        this.firestore
          .collection('threads')
          .doc(this.tid)
          .valueChanges()
          .subscribe((thread: any) => {
            this.message = thread.message;
            this.userName = thread.userName;
            this.userPhoto = thread.userPhoto;
            this.userEmail = thread.userEmail;
            this.messagetime = thread.messagetime;
          })
      })
  }


  makeThread(message, userName, userPhoto, userEmail, messagetime, channelId) {
    this.thread.message = [];
    this.thread.userName = [];
    this.thread.userPhoto = [];
    this.thread.userEmail = [];
    this.thread.messagetime = [];
    this.thread.message.push(message);
    this.thread.userName.push(userName);
    this.thread.userPhoto.push(userPhoto);
    this.thread.userEmail.push(userEmail);
    this.thread.messagetime.push(messagetime);
    this.firestore
      .collection('threads')
      .add(this.thread.toJson())
      .then((info: any) => {
        this.tid = info.id;
        this.channels.threadId = this.threadIds;
        this.channels.threadId.push(this.tid);
        this.firestore
          .collection('channels')
          .doc(channelId)
          .update(this.channels.threadToJson())
      });
  }
}
