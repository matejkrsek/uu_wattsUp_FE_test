import React, { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import ProjectModal from "./ProjectModal";

const CreateProject = () => {
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [isProjectedCreatedToastShown, setIsProjectCreatedToastShown] =
    useState(false);
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
        onClick={() => setIsNewModalShown(true)}
      >
        <Icon path={mdiPlus} size={1} />
      </Button>

      <ProjectModal
        isNewModalShown={isNewModalShown}
        setIsNewModalShown={setIsNewModalShown}
        incomingVersion="create"
        setIsProjectCreatedToastShown={setIsProjectCreatedToastShown}
      />

      <Toast
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
        }}
        bg="success"
        show={isProjectedCreatedToastShown}
        onClose={() => setIsProjectCreatedToastShown(false)}
      >
        <Toast.Header>
          <strong className="me-auto">Created!</strong>
        </Toast.Header>
        <Toast.Body>The new proeject was successfully created</Toast.Body>
      </Toast>
    </div>
  );
};

export default CreateProject;
