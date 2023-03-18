import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channels } from 'src/models/channels';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  constructor(public firestore: AngularFirestore) { }
  
  newChannel() {
    let channels = new Channels();
    this
      .firestore
      .collection('channels')
      .add(channels.toJson())

  }
  ngOnInit(): void {

  }
}
