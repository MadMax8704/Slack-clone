import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Channels } from 'src/models/channels';
import { User } from '../shared/services/user';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent implements OnInit {
  constructor(public authService: AuthService) { }
  ngOnInit(): void { }
}
