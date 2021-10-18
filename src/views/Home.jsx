import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import { addTodo, emptyTodo } from "../redux/actions/todoActions";
import "./home.css";

const url = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.allTodos.todos);
  const [input, setInput] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [pendingTodo, setPendingTodo] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input === "" || taskDate === "") {
      return;
    }

    dispatch(
      addTodo({
        id: new Date(),
        date: taskDate,
        task: input,
        status: 0,
      })
    );

    setInput("");
    // dispatch(emptyTodo({ id: "", task: "" }));
  };

  useEffect(() => {
    setPendingTodo(
      todos
        .filter((i) => +i.status === 0)
        .sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        })
    );
  }, [todos]);

  useEffect(() => {
    setDoneTodo(
      todos
        .filter((i) => +i.status !== 0)
        .sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        })
    );
  }, [todos]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4 text-center pt-2">
          <h3>Add New Todo</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-floating">
              <textarea className="form-control" id="floatingTextarea2" value={input} onChange={(e) => setInput(e.target.value)} style={{ height: "100px" }}></textarea>
              <label htmlFor="floatingTextarea2">Enter task here...</label>
            </div>

            <div className="form-group">
              <input id="myDate" type="date" onChange={(e) => setTaskDate(e.target.value)} className="my-1 form-control" />
            </div>

            <button className="my-2 btn btn-primary" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
        <div className="col-lg-4 text-center pt-2">
          <h3>On Going</h3>
          {pendingTodo.map((e, i) => (
            <Todo key={i} data={e} />
          ))}
        </div>
        <div className="col-lg-4 text-center pt-2">
          <h3>Done</h3>
          {doneTodo.map((e, i) => (
            <Todo key={i} data={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
