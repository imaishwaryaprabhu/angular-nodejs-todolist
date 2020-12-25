export interface Task {
    id: number;
    title: string;
    description: string,
    createdTime?: Date,
    reminderTime: Date
}