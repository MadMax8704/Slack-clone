import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Channels } from 'src/models/channels';
import { DialogNewChannelComponent } from '../dialog-new-channel/dialog-new-channel.component';
import { ThreadService } from '../shared/services/thread.service';


@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  constructor(public firestore: AngularFirestore, public dialog: MatDialog, private router: Router, public threadService: ThreadService) { }


  channelsId: string = '';
  public channels: Channels = new Channels;
  channelsOverview = [];
  panelOpenState = true;
  id: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNewChannelComponent);
    dialogRef.afterClosed().subscribe(channelName => {
      if (channelName) {
        this.channels.message = [];
        this.channels.channelName = channelName
        this
          .firestore
          .collection('channels')
          .add(this.channels.toJson())
          .then((info: any) => {
            this.channels.channelId = info.id;
            this.id = info.id;
            this.threadService.open = false;
            this.updateChannel();
            this.openChannel(this.id);
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
      })
  }

  updateChannel() {
    this.firestore
      .collection('channels')
      .doc(this.id)
      .update(this.channels.toJson())
  }


  openChannel(channelId) {
    this.threadService.open = false;
    this.router.navigateByUrl('/channel/' + channelId);
    this.channels.message = [];
    this.firestore
      .collection('channels')
      .doc(channelId)
      .valueChanges()
      .subscribe((channels: any) => {
        this.channels.message = channels.message;
        this.channels.channelId = channels.channelId;
        this.channels.channelName = channels.channelName;
        this.threadService.threadIds = channels.threadId;
      })
  }
}
