import { TodoStatus } from "./todo.enum";

export type TodoProps = {
  id: string;
  status: TodoStatus;
  description: string;
};
