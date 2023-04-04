import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Channels } from 'src/models/channels';
import { User } from '../shared/services/user';
import { ThreadService } from '../shared/services/thread.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent implements OnInit {
  showFiller = false;
  id='';
  channelName;

  constructor(public threadservice: ThreadService, public authService: AuthService, private route: ActivatedRoute, public firestore: AngularFirestore) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;
      this.firestore
        .collection('channels')
        .doc(this.id)
        .valueChanges()
        .subscribe((channels: any) => {
          this.channelName = channels.channelName;
        })
    })
   }
}