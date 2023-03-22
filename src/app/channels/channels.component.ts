import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { DialogNewChannelComponent } from '../dialog-new-channel/dialog-new-channel.component';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  constructor(public firestore: AngularFirestore, public dialog: MatDialog, private route: ActivatedRoute) { }


  channelsId: string = '';
  public channels: Channels = new Channels;
  channelsOverview = [];
  panelOpenState = false;
  id: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewChannelComponent);
    dialogRef.afterClosed().subscribe(channelName => {
      if (channelName) {
        this.channels.channelName = channelName
        this
          .firestore
          .collection('channels')
          .add(this.channels.toJson())
          .then((info: any) => {
            this.channels.channelId = info.id;
            this.id = info.id;
            this.updateChannel();
          })
      }
    })
  }


  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channels: any) => {
        this.channelsOverview = channels;
        // console.log(this.channelsOverview)
      })
  }

  updateChannel() {
    this.firestore
    .collection('channels')
    .doc(this.id)
    .update(this.channels.toJson())
  }

  
  openChannel(channelId) {
    console.log(channelId)
    // ROUTING TO CHANNEL ID AND OPEN CHAT!!!!
  }
}
