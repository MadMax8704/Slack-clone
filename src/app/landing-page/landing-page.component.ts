import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Channels } from 'src/models/channels';
import { User } from '../shared/services/user';
import { ThreadService } from '../shared/services/thread.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent implements OnInit {
  showFiller = false;
  constructor(public threadservice: ThreadService, public authService: AuthService) { }
  ngOnInit(): void { }
}
