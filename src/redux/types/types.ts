export interface IUser {
  avatarUrl: string;
  description: string;
  email: string;
  fullName: string;
  id: number;
  tasksCount: number;
  teamId: number;
  teamName: string;
}

export interface IUsersState {
  users: IUser[];
  usersLoading: boolean;
  usersErr: string | undefined;
}

export interface IAssignee {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
}

export interface ITask {
  assignee: IAssignee;
  boardId: number;
  boardName: string;
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

export interface ITasksState {
  tasks: ITask[];
  tasksLoading: boolean;
  tasksErr: string | undefined;
}

export interface ITaskState {
  task: ITask;
  taskLoading: boolean;
  taskErr: string | undefined;
}

export interface IBoards {
  description: string;
  id: number;
  name: string;
  taskCount: number;
}

export interface IBoardsState {
  boards: IBoards[];
  boardsLoading: boolean;
  boardsErr: string | undefined;
}

export interface IModalPayload {
  isOpen: boolean;
  isNewTask: boolean;
  isIssues?: boolean;
  boardId?: number;
}

export interface IModalState {
  modal: IModalPayload;
}

export interface ISortState {
  search: string;
  status: string;
  boardId: number | null;
}

export interface IBoardTasksState {
  boardTasks: ITask[];
  boardTasksLoading: boolean;
  boardTasksErr: string | undefined;
}
