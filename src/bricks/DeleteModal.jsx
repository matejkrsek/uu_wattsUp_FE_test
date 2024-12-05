import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { Button, Modal, Toast } from "react-bootstrap";
import { useProject } from "../ProjectProvider";
import { useNavigate } from "react-router";

const DeleteModal = ({ project, isShown, setIsShown }) => {
  const navigate = useNavigate();
  const [isErrorToastShown, setIsErrorToastShown] = useState(false);
  const [isSuccessToastShown, setIsSuccessToastShown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const { deleteProject } = useProject();

  const handleClose = () => {
    setIsShown(false);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(project);
      setIsSuccessToastShown(true);

      // Start countdown
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval); // ukončuje setInverval funkci
            navigate("/overview");
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setIsErrorToastShown(true);
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
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Error occurred while deleting the project!</Toast.Body>
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
          <strong className="me-auto">Successfully deleted!</strong>
        </Toast.Header>
        <Toast.Body>
          Successfully deleted! You are being redirected to the home page in:{" "}
          {countdown} seconds.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default DeleteModal;
