import { StatusesService } from './statuses.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {
  public statusText: string; // Status text
  public statuses: any[]; // Statuses available
  public canPostStatus = false; // Flag to see if a new status can be added or not
  constructor(public status: StatusesService) { }

  ngOnInit() {
    this.status.recent(50); // Get the 50 most recent statuses
  }

  // Get the status of the text if is valid or not
  typingStatus() {
    this.canPostStatus = this.status.valid(this.statusText) && this.status.updating() === false;
  }

  // Post the status if is valid
  postStatus() {
    // tslint:disable-next-line:no-unused-expression
    this.status.valid(this.statusText) && this.status.post(this.statusText);
  }

  // React to an exiting post
  react(reaction: string, status) {
    this.status.react(reaction, status);
  }

}
