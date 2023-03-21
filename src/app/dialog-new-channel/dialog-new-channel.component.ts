import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Channels } from 'src/models/channels';

@Component({
  selector: 'app-dialog-new-channel',
  templateUrl: './dialog-new-channel.component.html',
  styleUrls: ['./dialog-new-channel.component.scss']
})
export class DialogNewChannelComponent implements OnInit {

  constructor(public firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogNewChannelComponent>) { }

  public channels: Channels = new Channels;
  channelName: string = '';
  

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
