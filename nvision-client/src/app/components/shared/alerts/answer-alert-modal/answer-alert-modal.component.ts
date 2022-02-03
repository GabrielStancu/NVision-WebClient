import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WatcherAlertReply } from 'src/app/replies/watcher-data.reply';

@Component({
  selector: 'app-answer-alert-modal',
  templateUrl: './answer-alert-modal.component.html',
  styleUrls: ['./answer-alert-modal.component.css']
})
export class AnswerAlertModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AnswerAlertModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WatcherAlertReply) { }

  ngOnInit(): void {
  }

  onAnswerAlert(wasAccurate: boolean): void {
    this.data.wasTrueAlert = wasAccurate;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
