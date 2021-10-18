import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import { addTodo, emptyTodo } from "../redux/actions/todoActions";
import "./home.css";
const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.allTodos.todos);
  const todo = useSelector((state) => state.allTodos.todo);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === "") {
      return;
    }

    if (todo.id) {
      dispatch(
        addTodo({
          id: todo.id,
          task: input,
        })
      );
    } else {
      dispatch(
        addTodo({
          id: new Date(),
          task: input,
          status: 0,
        })
      );
    }

    setInput("");
    dispatch(emptyTodo({ id: "", task: "" }));
  };

  useEffect(() => {
    setInput(todo.task);
  }, [todo]);

  // status 0; belum selesai

  const pending = todos.filter((i) => i.status === 0);
  const done = todos.filter((i) => i.status !== 0);

  return (
    <div className="container">
      <div className="home">
        <h1>todos</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column mb-3">
          <input className="my-1" id="new-todo" type="text" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" />
          <button className="my-1 btn btn-primary" type="submit">
            ADD
          </button>
        </form>

        <div className="row">
          <div className="col-lg-6">
            {pending.map((e, i) => (
              <Todo key={i} data={e} />
            ))}
          </div>
          <div className="col-lg-6">
            {done.map((e, i) => (
              <Todo key={i} data={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
