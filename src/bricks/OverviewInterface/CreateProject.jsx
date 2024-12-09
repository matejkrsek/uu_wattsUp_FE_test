import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import ProjectModal from "./ProjectModal";

const CreateProject = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isCreatedToastShown, setIsCreatedToastShown] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    date: "", // eventDate,
    creationDate: "",
    organization: "",
    description: "",
    createdBy: "",
    instructor: "",
    roundCount: "",
    roundDuration: "",
    studentCount: null,
    generatorList: [], // Array to store selected generator IDs
    status: "true",
  });

  return (
    <div className="w-full md:w-auto">
      <Button
        variant="success"
        className="w-full md:w-auto"
        onClick={() => setIsModalShown(true)}
      >
        <Icon path={mdiPlus} size={1} />
      </Button>

      <ProjectModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        version="create"
        setIsCreatedToastShown={setIsCreatedToastShown}
      />

      <Toast
        style={{
          position: "fixed",
          top: "10px", // Nastaví horní odsazení
          right: "10px", // Nastaví pravé odsazení
          zIndex: 1050,
        }}
        bg="success"
        show={isCreatedToastShown}
        onClose={() => setIsCreatedToastShown(false)}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Created!</strong>
        </Toast.Header>
        <Toast.Body>The new project was successfully created</Toast.Body>
      </Toast>
    </div>
  );
};

export default CreateProject;
