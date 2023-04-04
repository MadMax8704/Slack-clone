import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore, public authService: AuthService) { }

  id = '';
  public channels: Channels = new Channels;
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
          }
         
        })
    })
  }

  

  sendMessage() {
    this.channels.message.push(this.message)
    this.channels.userName.push(this.authService.userData.displayName)
    this.channels.userPhoto.push(this.authService.userData.photoURL)
    this.firestore
      .collection('channels')
      .doc(this.id)
      .update(this.channels.messageToJson())
    this.message = '';
  }
}
