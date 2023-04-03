import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {

  constructor(private route: ActivatedRoute, public firestore: AngularFirestore) { }

  id = '';
  public channels: Channels = new Channels;
  userImg = '';
  userName = '';



  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      this.firestore
        .collection('channels')
        .doc(this.id)
        .valueChanges()
        .subscribe((channels: any) => {
          this.channels.message = channels.message;
        })
    })
  }
 
}
