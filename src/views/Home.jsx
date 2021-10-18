import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import { addTodo, setError, setLoading, setTodo } from "../redux/actions/todoActions";
import "./home.css";
import Swal from "sweetalert2";

const url = "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";

const Home = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.allTodos.todos);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || taskDate === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All field required!",
      });

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

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const req = await fetch(url);
        const data = await req.json();
        dispatch(setTodo(data));
      } catch (error) {
        dispatch(setError(error));
        console.log(error);
      }
    };

    fetchData();

    dispatch(setLoading(false));
  }, [dispatch]);

  const pending = todos
    .filter((i) => +i.status === 0)
    .sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  const completed = todos
    .filter((i) => +i.status !== 0)
    .sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="container pb-3">
      <div className="newTodo__container mx-auto  pt-3">
        <h3 className="text-center">Add New Todo</h3>
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
      <div className="row gy-3 justify-content-center">
        <div className="col-md-6 text-center  ">
          <div className="todos p-2">
            <h4>ACTIVE</h4>
            {pending.map(({ id, title, description, createdAt, status }) => (
              <Todo key={id} id={id} title={title} description={description} createdAt={createdAt} status={status} />
            ))}
          </div>
        </div>
        <div className="col-md-6 text-center   ">
          <div className="todos done p-2">
            <h4>COMPLETED</h4>
            {completed.map(({ id, title, description, createdAt, status }) => (
              <Todo key={id} id={id} title={title} description={description} done={true} createdAt={createdAt} status={status} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
