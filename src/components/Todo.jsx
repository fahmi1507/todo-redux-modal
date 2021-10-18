import React from "react";
import { useDispatch } from "react-redux";
import { findOne, removeTodo } from "../redux/actions/todoActions";
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

const Todo = ({ data }) => {
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
    closeModal();
  };

  const handleUpdate = (id) => {
    dispatch(findOne(id));
  };

  // modal functionality
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="mb-2">
      <div className="card p-2" style={{ cursor: "pointer" }} onDoubleClick={() => handleUpdate(data.id)}>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0 text-justify" style={{ fontSize: "20px" }}>
            {data.task}
          </p>

          <button className="btn btn-success" onClick={openModal}>
            Details
          </button>
        </div>
      </div>

      {/* modal */}

      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{data.task}</h2>
        <div>
          Date: <p>{moment(data.date).format("MMMM Do YYYY")}</p>
          Status<p>{data.status}</p>
        </div>

        <div className="w-100">
          <div className="d-flex btn-group mb-2">
            <button onClick={() => handleRemove(data.id)} className="btn btn-block btn-danger">
              DELETE
            </button>
            <button className="btn btn-block btn-info">UPDATE</button>
          </div>
        </div>
        <button className="btn btn-primary" onClick={closeModal}>
          CLOSE
        </button>
      </Modal>
    </div>
  );
};

export default Todo;
