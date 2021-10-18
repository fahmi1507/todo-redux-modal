import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findOne, removeTodo, addTodo } from "../redux/actions/todoActions";
import Modal from "react-modal";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "400px",
  },
};

Modal.setAppElement("#root");

const Todo = ({ id, title, description, createdAt, status }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
    closeModal();
  };

  const handleUpdate = (e) => {
    // dispatch(findOne(id));

    e.preventDefault();

    dispatch(
      addTodo({
        id,
        title: input,
        description,
        status: newStatus,
        createdAt,
      })
    );

    closeModal();
  };

  // modal functionality
  const [modalIsOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(title);
  const [newStatus, setStatus] = useState(status);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="mb-2">
      <div className="card p-2" style={{ cursor: "pointer" }} onDoubleClick={() => handleUpdate(id)}>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0 text-justify" style={{ fontSize: "20px" }}>
            {title}
          </p>

          <button className="btn btn-success" onClick={openModal}>
            Details
          </button>
        </div>
      </div>

      {/* modal */}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control mb-2" value={input} onChange={(e) => setInput(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input type="number" min="0" max="1" className="form-control mb-2" value={newStatus} onChange={(e) => setStatus(e.target.value)}></input>
          </div>

          <div>
            Date: <p>{moment(createdAt).format("MMMM Do YYYY")}</p>
          </div>

          <div className="w-100">
            <div className="d-flex btn-group mb-2">
              <button type="submit" className="btn btn-block btn-info">
                UPDATE
              </button>
            </div>
          </div>
        </form>
        <div className="btn-group w-100">
          <button disabled={+status === 1} onClick={() => handleRemove(id)} className="btn btn-block btn-danger">
            DELETE
          </button>
          <button className="btn btn-primary" onClick={closeModal}>
            CLOSE
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Todo;
