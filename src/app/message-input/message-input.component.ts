import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore) { }

  id;
  public channels: Channels = new Channels;
  message;

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
    })
  }


  loadChat() {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
    })
    this.firestore
      .collection('channels')
      .doc(this.id)
      .valueChanges()
      .subscribe((channels: any) => {
        // this.channels.message = channels.message;
        // this.channels.channelId = channels.channelId;
        // this.channels.channelName = channels.channelName;
      })
  }


  sendMessage() {
    this.loadChat();
    this.channels.message.push(this.message)
    this.firestore
      .collection('channels')
      .doc(this.id)
      .update(this.channels.toJson())
    this.message = '';
  }






  //GET CHANNEL ID FROM URL AND THEN PUSH INPUT INTO CHANNELS.MESSAGES!!!

}
