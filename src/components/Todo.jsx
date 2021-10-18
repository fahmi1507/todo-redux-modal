import React from "react";
import { useDispatch } from "react-redux";
import { findOne, removeTodo } from "../redux/actions/todoActions";

const Todo = ({ data }) => {
  const dispatch = useDispatch();
  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  const handleUpdate = (id) => {
    dispatch(findOne(id));
  };

  return (
    <div className="my-2">
      <div className="card p-2" style={{ cursor: "pointer" }} onDoubleClick={() => handleUpdate(data.id)}>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0" style={{ fontSize: "20px" }}>
            {data.task}
          </p>
          <button onClick={() => handleRemove(data.id)} className="btn btn-danger">
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
