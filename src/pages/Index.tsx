import { useState } from "react";
import { Header } from "../components/Header";
import { InputGroup } from "../components/InputGroup";
import { TodoList } from "../components/TodoList";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export function Index() {
  const [todo, setTodo] = useState<Todo[]>([]);

  console.log(todo);

  return (
    <div className="index">
      <Header />
      <InputGroup todo={todo} setTodo={setTodo} />
      <TodoList todo={todo} setTodo={setTodo} />
    </div>
  );
}
