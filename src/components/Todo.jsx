import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTodo, addTodo } from "../redux/actions/todoActions";
import Modal from "react-modal";
import Swal from "sweetalert2";

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

const Todo = ({ id, title, description, createdAt, status, done }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTodo(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        closeModal();
      }
    });
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
        createdAt: newDate,
      })
    );

    Swal.fire("Success!", "Task Updated", "success");

    closeModal();
  };

  // modal functionality
  const [modalIsOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(title);
  const [newStatus, setStatus] = useState(status);
  const [newDesc, setNewDesc] = useState(description);
  const [newDate, setNewDate] = useState(createdAt.slice(0, 10));

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
          <p className="m-0 text-justify" style={{ textDecoration: done ? "line-through" : "none" }}>
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
              Description
            </label>
            <input type="text" className="form-control mb-2" value={newDesc} onChange={(e) => setNewDesc(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <input type="number" min="0" max="1" className="form-control mb-2" value={newStatus} onChange={(e) => setStatus(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="Date" className="form-label">
              Date
            </label>
            <input type="date" className="form-control mb-2" value={newDate} onChange={(e) => setNewDate(e.target.value)}></input>
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
