import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ isShown, setIsShown }) => {
  // Component state and logic here

  const handleClose = () => {
    setIsShown(false);
  };

  const handleDelete = () => {};

  return (
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
  );
};

export default DeleteModal;
