import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ProjectModal from "./ProjectModal";

const CreateProject = () => {
  const [isNewModalShown, setIsNewModalShown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "", // eventDate
    organization: "",
    description: "",
    createdBy: "",
    student: "",
    roundCount: "",
    roundDuration: "",
    studentCount: null,
    generatorList: [], // Array to store selected generator IDs
  });

  return (
    <div>
      <Button variant="success" onClick={() => setIsNewModalShown(true)}> + </Button>

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