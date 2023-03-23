import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(this.route)
    })
  }


  sendMessage() {
    
  }
 


 

  //GET CHANNEL ID FROM URL AND THEN PUSH INPUT INTO CHANNELS.MESSAGES!!!

}
