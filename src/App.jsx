import { useEffect, useState } from "react";
import "./App.css";
import { styled } from "styled-components";
import {
  MdDelete,
  MdOutlineAdd,
  MdOutlineEdit,
  MdUpdate,
} from "react-icons/md";
import { FcCheckmark } from "react-icons/fc";
import { PiCheckCircleFill } from "react-icons/pi";
import Typewriter from "typewriter-effect";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const AddTodo = () => {
    if (text === "") return;
    let todo = {
      id: Math.random().toFixed(3) * 1000,
      value: text,
      isDone: false,
    };
    localStorage.setItem("todos", JSON.stringify([...todos, todo]));
    setTodos((prev) => [...prev, todo]);
    setText("");
  };
  const DeleteTodo = (id) => {
    let deleteData = todos.filter((item) => item.id !== id);
    localStorage.setItem("todos", JSON.stringify(deleteData));
    setTodos(deleteData);
  };
  const UpdateTodo = () => {
    let newData = todos.map((item) => {
      return item.id === currentItem.id ? currentItem : item;
    });
    localStorage.setItem("todos", JSON.stringify(newData));
    setTodos(newData);
    setEdit(false);
  };
  const ToggleTodo = (id) => {
    let Mark = todos.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : { ...item }
    );
    localStorage.setItem("todos", JSON.stringify(Mark));
    setTodos(Mark);
  };
  return (
    <AppCont>
      <div className="form">
        <input
          type="text"
          value={edit ? currentItem.value : text}
          onChange={(e) =>
            edit
              ? setCurrentItem((prev) => ({ ...prev, value: e.target.value }))
              : setText(e.target.value)
          }
          placeholder="add item"
        />

        <button
          className="add"
          onClick={() => (edit ? UpdateTodo() : AddTodo())}>
          {edit ? <MdUpdate /> : <MdOutlineAdd />}
        </button>
      </div>

      <div className="todo">
        {!todos.length ? (
          <h3>Add todo item </h3>
        ) : (
          <>
            <h3>TODO LIST</h3>
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
          </>
        )}
      </div>
    </AppCont>
  );
}

export default App;

const AppCont = styled.div`
  width: 70%;
  margin: 100px auto;
  .form {
    height: 40px;
    display: flex;
    align-items: center;
    .add {
      background: #fff;
      color: #000;
      border: none;
    }
    .add:hover {
      background: none;
      color: #fff;
      border: 1px solid #fff;
      transition: all 0.3s ease-in-out;
    }
  }
  input {
    height: 75%;
    padding: 5px;
    width: 100%;
    border: 1px dashed #ffff;
    outline: none;
    border-radius: 4px;
    background: none;
    color: #fff;
  }
  button {
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #ffff;
    margin: 0px 5px;
    text-align: center;
    cursor: pointer;
    width: 40px;
    height: 100%;
    padding: 5px;
    font-size: large;
    background: none;
  }
  .todo {
    margin-top: 30px;
    section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 8px 0px;

      button {
        font-size: medium;
        margin-top: 3px;
      }
      button:hover {
        background: #758283;
        border: none;
        transition: all 0.3s ease-in-out;
      }

      .delete {
        color: red;
        background: #000;
        border: 1px dashed #758283;
      }
      .done {
        border: 1px solid #fff;
        color: green;
      }
      .done:hover {
        border: 1px dashed #fff;
        transition: all 1s ease-in-out;
      }
    }
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    section {
      font-size: smaller;
    }
    .delete,
    .done,
    .edit {
      font-size: smaller;
      height: 70%;
      padding: 2px;
    }
  }
`;
