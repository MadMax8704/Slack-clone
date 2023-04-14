import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { ThreadService } from '../shared/services/thread.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  constructor(public threadservice: ThreadService, private route: ActivatedRoute, public firestore: AngularFirestore) { }

  id = '';
  public channels: Channels = new Channels;



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
          this.channels.userEmail = channels.userEmail;
        })
    })
  }
}

