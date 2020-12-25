import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AddTaskComponent } from './add-task/add-task.component';
import { Task } from './task.model';
import { Subscription } from 'rxjs';
import { TaskService } from './task.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  editMode = false;
  editForm: FormGroup;
  selectedTask: Task;
  tasks: Task[] = [];
  taskSubscription: Subscription;
  minDate = new Date();
  maxDate = new Date(this.minDate.getFullYear() + 1, 11, 31);
  
  constructor(
    private dialog: MatDialog, 
    private taskService: TaskService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.taskService.getAll();
    this.taskSubscription = this.taskService.taskListChanged$.subscribe(taskData => {
      this.tasks = taskData.tasks;
    });
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(() => console.log("dialog closed"));
  }

  onEdit(task: Task) {
    this.editMode = true;
    this.selectedTask = task;
    this.editForm = new FormGroup({
      'description': new FormControl("", [Validators.required]),
      'reminderTime': new FormControl("", [Validators.required])
    });

    this.editForm.patchValue({
      'description': task.description,
      'reminderTime': task.reminderTime
    });
  }

  onEditTask() {
    this.taskService.update(this.selectedTask.id, this.editForm.value)
    .subscribe(taskData => {
      this.editMode = false;
      this.snackBar.open('Task has been updated!');
    });
  }

  onDeleteTask(taskId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { 
        'title': "Confirm Task Deletion",
        'question': "Are you sure?"
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskService.delete(taskId).subscribe(response => {
          this.snackBar.open('Task has been deleted!');
        });
      }
    });
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }
}
