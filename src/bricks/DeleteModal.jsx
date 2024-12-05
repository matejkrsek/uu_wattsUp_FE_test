import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { Button, Modal, Toast } from "react-bootstrap";
import { useProject } from "../ProjectProvider";
import { useNavigate } from "react-router";

const DeleteModal = ({ project, isShown, setIsShown }) => {
  const navigate = useNavigate();
  // Component state and logic here

  const [isErrorToastShown, setIsErrorToastShown] = useState(false);
  const [isSuccessToastShown, setIsSuccessToastShown] = useState(false);
  const { deleteProject, fetchProject, status } = useProject();

  const handleClose = () => {
    setIsShown(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(project);
      console.log("Success from FE");
      setIsShown(false);
      setIsSuccessToastShown(true);
      // delay
      setTimeout(() => {
        navigate("/overview");
      }, 3000);
    } catch (error) {
      setIsErrorToastShown(true);

      console.log("error on FE:" + error);
    } finally {
      setIsShown(false);
    }
  };

  return (
    <div>
      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Icon path={mdiAlert} size={2} color="red" />
            <p style={{ margin: 0 }}>
              Do you really want to delete this project?!
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
        }}
        bg="danger"
        show={isErrorToastShown}
        onClose={() => setIsErrorToastShown(false)}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">ERROOR</strong>
        </Toast.Header>
        <Toast.Body>Error!!!!</Toast.Body>
      </Toast>

      <Toast
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
        }}
        bg="success"
        show={isSuccessToastShown}
        onClose={() => setIsSuccessToastShown(false)}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Succesfully deleted!</strong>
        </Toast.Header>
        <Toast.Body>Succesfully deleted!!!!!</Toast.Body>
      </Toast>
    </div>
  );
};

export default DeleteModal;
