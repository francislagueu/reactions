import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import {FirebaseListObservable } from 'angularfire2/database-deprecated';
import 'rxjs/add/operator/map';



@Injectable()
export class StatusesService {
  private inProgress = false; // Flag to see if the status update is in progress
  private reactions: string[] = ['like', 'love', 'dislike']; // Possible available reactions
  public statuses: FirebaseListObservable<any[]>; // All the statuses avalaible
  public maxLength = 500; // max and min length of the status
  public minLength = 0;
  public statusTextValid = false; // Flag that determines if the status text is valid or not
  constructor(private db: AngularFireDatabase) { }

  // Method to post the status to firebase
  // tslint:disable-next-line:one-line
  post(status: string){
    if (!this.updating()) {
      this.inProgress = true;
      const payload = {text: status, like: 0, dislike: 0, love: 0, createdAt: {'.sv': 'timestamp'}};
      this.statuses.push(payload).then(snapshot => {
        this.inProgress = false;
      });
    }
  }
// Method to check the inProgress flag
  updating(): boolean {
    return this.inProgress;
  }

  // Method to send a reaction to a status to firebase
  react(reaction: string, status) {
    if (~this.reactions.indexOf(reaction)) {
      const reacts: any = {};
      // tslint:disable-next-line:radix
      const count: number = isNaN(parseInt(status[reaction])) ? 0 : parseInt(status[reaction]);
      reacts[reaction] = count + 1;
      this.statuses.update(status.$key, reacts);
    }
  }

  // Method to get the most recent status from firebase
  recent(amount: number): FirebaseListObservable<any[]> {
    return this.statuses = this.db.list('/statuses').map(arr => arr.reverse()) as FirebaseListObservable<any[]>;
  }

  // Method to check the validity of a status update
  valid(status: string): boolean {
    return status.length >= this.minLength && status.length <= this.maxLength;
  }

}
