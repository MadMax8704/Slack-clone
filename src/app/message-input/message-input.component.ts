import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { AuthService } from '../shared/services/auth.service';
import { ThreadService } from '../shared/services/thread.service';
import { Thread } from 'src/models/thread';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public authService: AuthService, public threadService: ThreadService) { }

  id = '';
  public channels: Channels = new Channels;
  public thread: Thread = new Thread;
  message = '';
  uid = '';

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      this.firestore
        .collection('channels')
        .doc(this.id)
        .valueChanges()
        .subscribe((channels: any) => {
          if (channels.userName) {
            this.channels.message = channels.message;
            this.channels.userName = channels.userName;
            this.channels.userPhoto = channels.userPhoto;
            this.channels.userEmail = channels.userEmail;
          } else {
            this.channels.message = [];
            this.channels.userName = [];
            this.channels.userPhoto = [];
            this.channels.userEmail = [];
          }
        })
    })
  }

  

  sendMessage() {
    this.channels.message.push(this.message)
    this.channels.userName.push(this.authService.userData.displayName)
    this.channels.userPhoto.push(this.authService.userData.photoURL)
    this.channels.userEmail.push(this.authService.userData.email)
    this.firestore
      .collection('channels')
      .doc(this.id)
      .update(this.channels.messageToJson())
    this.threadService.makeThread(this.message,
      this.authService.userData.displayName,
      this.authService.userData.photoURL,
      this.authService.userData.email,
      this.id);
    this.message = '';
  }
}
