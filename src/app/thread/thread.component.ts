import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { ThreadService } from '../shared/services/thread.service';
import { AuthService } from '../shared/services/auth.service';
import { Thread } from 'src/models/thread';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {
  id = '';
  message = '';
  public channels: Channels = new Channels;
  public thread : Thread = new Thread;

  constructor(public authService: AuthService, public threadservice: ThreadService, private route: ActivatedRoute, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      this.firestore
        .collection('channels')
        .doc(this.id)
        .valueChanges()
        .subscribe((channels: any) => {
          this.channels.message = channels.message;
          this.channels.userName = channels.userName;
          this.channels.userPhoto = channels.userPhoto;
        })
    })
    
  }

  // loadThread(id) {
  //   this.firestore
  //       .collection('threads')
  //       .doc(id)
  //       .valueChanges()
  //       .subscribe((thread: any) => {
  //         console.log('thread', thread)
  //         this.thread.message = thread.message;
  //         this.thread.userName = thread.userName;
  //         this.thread.userPhoto = thread.userPhoto;
  //       })
    
  // }


  sendAnswer() {
    this.threadservice.message.push(this.message)
    this.threadservice.userName.push(this.authService.userData.displayName);
    this.threadservice.userPhoto.push(this.authService.userData.photoURL);
    this.thread.message = this.threadservice.message;
    this.thread.userName = this.threadservice.userName;
    this.thread.userPhoto =this.threadservice.userPhoto;
    this.firestore
      .collection('threads')
      .doc(this.threadservice.tid)
      .update(this.thread.toJson())
    this.message = '';
  }
}
