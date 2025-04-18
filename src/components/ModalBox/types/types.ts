export enum TaskPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface IModalBoxFormInputs {
  title: string;
  description: string;
  boardId: number;
  priority: string;
  status: string;
  assigneeId: number;
}
