import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { Todo } from "../../pages/Index";
import "./styles.scss";

interface InputGroupProps {
  todo: {
    id: number;
    title: string;
    isCompleted: boolean;
  }[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function InputGroup({ todo, setTodo }: InputGroupProps) {
  const [value, setValue] = useState("");

  const handleCreateTask = () => {
    const task = {
      id: todo.length + 1,
      title: value,
      isCompleted: false,
    };

    const newTodo = [...todo, task];

    const json = JSON.stringify(newTodo);
    localStorage.setItem("tasks", json);
    setTodo(newTodo);
    setValue("");
  };

  return (
    <form className="input-group">
      <Input
        type="text"
        placeholder="Add your activity here"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <IconButton
        colorScheme="teal"
        aria-label="Call "
        size="lg"
        icon={<AddIcon />}
        onClick={() => {
          handleCreateTask();
        }}
        disabled={!value}
        type="submit"
      />
    </form>
  );
}
