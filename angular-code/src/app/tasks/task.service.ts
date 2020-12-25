import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first, debounceTime } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Task } from './task.model';
import { Subject, Observable } from 'rxjs';
const baseUrl = `${environment.apiUrl}/tasks`;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskListChangedSubject = new Subject<{ tasks: Task[] }>();
  taskListChanged$: Observable<{ tasks: Task[] }>;

  constructor(private http: HttpClient) { 
    this.taskListChanged$ = this.taskListChangedSubject.asObservable();
  }

  getAll() {
    this.http.get<{message: string, tasks: Task[]}>(`${baseUrl}`)
    .subscribe(data => {
      this.taskListChangedSubject.next({
        tasks: data.tasks
      });
    });
  }

  create(task: Task) {
    return this.http.post<{message: string, task: Task}>(`${baseUrl}`, task)
    .pipe(map(response => {
      this.getAll();

      return response;
    }));
  }

  update(id:number, updateData: { description: string, reminderTime: Date }) {
    return this.http.put<{message: string, task: Task}>(`${baseUrl}/${id}`, { ...updateData })
    .pipe(map(response => {
      this.getAll();

      return response;
    }));
  }

  delete(id:number) {
    return this.http.delete<{message: string, task: Task}>(`${baseUrl}/${id}`)
      .pipe(map(response => {
        this.getAll();
        
        return response;
      }));
  }
}
