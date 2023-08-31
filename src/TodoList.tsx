import { MdDelete, MdOutlineEdit } from "react-icons/md";

import { FcCheckmark } from "react-icons/fc";
import { PiCheckCircleFill } from "react-icons/pi";
import Typewriter from "typewriter-effect";
import React from "react";

interface TodoProps {
  todos: { value: string; id: number; isDone: boolean }[];
  DeleteTodo: (id) => void;
  ToggleTodo: (id) => void;
  setCurrentItem: ({ value, id, isDone }) => void;
  setEdit: (boolean) => void;
}
function TodoList({
  todos,
  DeleteTodo,
  ToggleTodo,
  setCurrentItem,
  setEdit,
}: TodoProps) {
  return (
    <div>
      {todos?.map(({ value, id, isDone }, index) => (
        <section key={id}>
          <div
            style={{
              display: "flex",
              textDecoration: isDone ? "line-through" : "",
              fontStyle: isDone ? "italic" : "",
            }}>
            {++index},
            <div style={{ marginLeft: "5px" }}>
              <Typewriter
                options={{
                  strings: value,
                  autoStart: true,
                  loop: false,
                  cursor: "",
                }}
              />
            </div>
          </div>
          <div>
            <button
              className="done"
              style={{ background: isDone ? "#fff" : "none" }}
              onClick={() => ToggleTodo(id)}>
              {isDone ? <PiCheckCircleFill /> : <FcCheckmark />}
            </button>
            <button className="delete" onClick={() => DeleteTodo(id)}>
              <MdDelete />
            </button>
            <button
              className="edit"
              onClick={() => {
                setEdit(true);
                setCurrentItem({ value, id, isDone });
              }}>
              <MdOutlineEdit />
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

export default TodoList;