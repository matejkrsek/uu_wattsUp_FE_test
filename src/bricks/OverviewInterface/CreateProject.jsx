import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ProjectModal from "./ProjectModal";

const CreateProject = () => {
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    date: "2032-41-5", // FIX ME
    organization: "",
    description: "",
    createdBy: "",
    student: "",
    rounds: "",
    generatorList: [], // Array to store selected generator IDs
    status: true,
  });

  return (
    <div>
      <Button variant="success" onClick={() => setIsNewModalShown(true)}>
        Create new modal
      </Button>

      <ProjectModal
        isNewModalShown={isNewModalShown}
        setIsNewModalShown={setIsNewModalShown}
        incomingFormData={formData}
        incomingVersion="create"
      />
    </div>
  );
};

export default CreateProject;
