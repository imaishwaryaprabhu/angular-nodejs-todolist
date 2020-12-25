import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(this.minDate.getFullYear() + 1, 11, 31);
  
  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>, 
    private taskService: TaskService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onAddTask(form: NgForm) {
    this.taskService.create(form.value)
    .subscribe((taskData) => {
      this.dialogRef.close();
      this.snackBar.open('Task has been added!');
    } );
  }

}
