import { MdDelete, MdOutlineEdit } from "react-icons/md";

import { FcCheckmark } from "react-icons/fc";
import { PiCheckCircleFill } from "react-icons/pi";
import Typewriter from "typewriter-effect";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
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
  const [viewStates, setViewStates] = useState(todos.map(() => false)); // Initialize view state for each item
  const handleToggleView = (index) => {
    const updatedViewStates = [...viewStates];
    updatedViewStates[index] = !updatedViewStates[index];
    setViewStates(updatedViewStates);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check the screen size and update state
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the breakpoint as needed
    };

    // Initial check when the component mounts
    checkScreenSize();

    // Add a resize event listener to update the state when the window size changes
    window.addEventListener("resize", checkScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  return (
    <div>
      {todos?.map(({ value, id, isDone }, index) => (
        <section key={id} style={{ position: "relative" }}>
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
          <BtnCont>
            {isMobile ? (
              <button
                className="view-btn"
                onClick={() => handleToggleView(index)}>
                {viewStates[index] ? <MdClose /> : <FaBars />}
              </button>
            ) : (
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
            )}
            {viewStates[index] ? (
              <div className={isMobile ? "btn-cont" : "btn-flex"}>
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
            ) : null}
          </BtnCont>
        </section>
      ))}
    </div>
  );
}

export default TodoList;

const BtnCont = styled.div`
  .btn-cont {
    position: absolute;
    background: #111;
    left: 100;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }
  .btn-Flex {
    display: flex;
  }
  .view-btn {
    /* position: absolute; */
    right: 0;
  }
  @media screen and (max-width: 768px) {
    .btn-Flex {
      display: flex;
    }
  }
`;
