import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/models/channels';
import { ThreadService } from '../shared/services/thread.service';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {
  id = '';
  thread : any = [];
  public channels: Channels = new Channels;

  constructor(public authService: AuthService, public threadservice: ThreadService, private route: ActivatedRoute, public firestore: AngularFirestore) { }

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
          this.channels.thread = channels.thread;
        })
    })
  }
  loadThread() {
    this.channels.thread.push(this.thread)
    this.channels.userName.push(this.authService.userData.displayName)
    this.channels.userPhoto.push(this.authService.userData.photoURL)
    this.firestore
      .collection('channels')
      .doc(this.id)
      .update(this.channels.messageToJson())
    this.thread = '';
  }
}
