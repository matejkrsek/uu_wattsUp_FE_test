import React from "react";
import { useFilters } from "../FiltersProvider";
import { Button } from "react-bootstrap";

const ProjectModalForm = (isModalShown, setIsModalShown) => {
 

 

  return (
    <Modal show={isModalShown} onHide={()=> (setIsModalShown(false))}>
  

    <Modal.Header closeButton>
      <Modal.Title>Create new project</Modal.Title>
    </Modal.Header>

    <Modal.Body>
   
  </Modal.Body>
  
  <Modal.Footer>
     <Button 
       
        onClick={()=> (setIsModalShown(false))}
     >
         Create
     </Button>
     <Button 
        variant="outline-secondary"
        onClick={()=> (setIsModalShown(false))}    
    >
         Close  
    </Button>
  </Modal.Footer>  
  
  
  
</Modal>
  );
};

export default ProjectModalForm;
