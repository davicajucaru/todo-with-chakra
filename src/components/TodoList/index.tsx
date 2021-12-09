import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { Todo } from "../../pages/Index";

import "./styles.scss";

interface TodoProps {
  todo: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoList({ todo, setTodo }: TodoProps) {
  useEffect(() => {
    const loadTasks = () => {
      const oldTodo: any = [localStorage.getItem("tasks")];

      const newTodo: Todo[] = JSON.parse(oldTodo);
      setTodo(newTodo);
    };

    loadTasks();
  }, [setTodo]);

  const handleDeleteTask = (id: number) => {
    const newTodo = todo.filter((todo) => todo.id !== id);
    const json = JSON.stringify(newTodo);
    localStorage.setItem("tasks", json);
    setTodo(newTodo);
  };

  function handleCompletedTask(id: number) {
    const newTodo = todo.map((task) =>
      task.id === id
        ? {
            ...task,
            isCompleted: !task.isCompleted,
          }
        : task
    );

    const json = JSON.stringify(newTodo);
    localStorage.setItem("tasks", json);
    setTodo(newTodo);
  }

  return (
    <div className="todo">
      <div className="todoTitle">
        <h2>My tasks</h2>
      </div>
      <ul>
        {todo.map((todo) => (
          <li key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => {
                  handleCompletedTask(todo.id);
                }}
              />
              <span
                style={
                  todo.isCompleted
                    ? { textDecoration: "line-through" }
                    : { textDecoration: "none" }
                }
              >
                {todo.title}
              </span>
            </div>

            <button
              onClick={() => {
                handleDeleteTask(todo.id);
              }}
            >
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
