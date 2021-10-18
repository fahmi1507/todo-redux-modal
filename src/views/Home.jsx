import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import { addTodo, emptyTodo, setError, setLoading, setTodo } from "../redux/actions/todoActions";
import "./home.css";

const url = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.allTodos.todos);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [pendingTodo, setPendingTodo] = useState([]);
  const [doneTodo, setDoneTodo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || taskDate === "") {
      return;
    }

    dispatch(
      addTodo({
        id: new Date(),
        title,
        description,
        status: 0,
        createdAt: taskDate,
      })
    );

    setTitle("");
    setDescription("");
  };

  useEffect(async () => {
    dispatch(setLoading(true));
    try {
      const req = await fetch(url);
      const data = await req.json();
      console.log(data);
      dispatch(setTodo(data));
    } catch (error) {
      dispatch(setError({ error, err: true }));
      console.log(error);
    }

    dispatch(setLoading(false));
  }, []);

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
    <div className="app">
      <div className="row justify-content-center">
        <div className="col-lg-3  pt-2">
          <h3>Add New Todo</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title" value={title} className="mb-2 form-control" />
            </div>
            <div className="form-floating mb-2">
              <textarea className="form-control" id="floatingTextarea2" value={description} onChange={(e) => setDescription(e.target.value)} style={{ height: "100px" }}></textarea>
              <label htmlFor="floatingTextarea2">Description</label>
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Due Date
              </label>
              <input id="myDate" type="date" onChange={(e) => setTaskDate(e.target.value)} className="mb-2 form-control" />
            </div>

            <button className="my-2 btn btn-primary" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
        <div className="col-lg-4 text-center pt-2">
          <h3>On Going</h3>
          {pendingTodo.map(({ id, title, description, createdAt, status }) => (
            <Todo key={id} id={id} title={title} description={description} createdAt={createdAt} status={status} />
          ))}
        </div>
        <div className="col-lg-4 text-center pt-2">
          <h3>Done</h3>
          {doneTodo.map(({ id, title, description, createdAt, status }) => (
            <Todo key={id} id={id} title={title} description={description} createdAt={createdAt} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
