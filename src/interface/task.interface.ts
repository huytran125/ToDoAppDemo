export enum TaskStatusEnum {
  OnGoing = 'OnGoing',
  Completed = 'Completed',
}

export interface ITask {
  id: string;
  content: string;
  status: TaskStatusEnum;
  priority: string;
}
