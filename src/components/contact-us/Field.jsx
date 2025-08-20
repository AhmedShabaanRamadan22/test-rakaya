import React from "react";
import Container from "../Container";


/**
 * @param {{title:string, description:string, badge:string}} 
 */
const Field = ({ children, title, description, badge}) => {
   return (
      <Container className="my-4 px-0 mx-0">
         <div className="d-flex align-items-center gap-4 mb-0 pb-0">
            <h4 className="mt-1 fw-bold">{title}</h4>
            <h4>
            <span className="badge bg-primary">{badge}</span>
            </h4>
         </div>
         <p className="py-0 my-1 mt-0 text-secondary fw-semibold">{description}</p>
         {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
               style: {
                  borderRadius: 5,
                  padding: "5px",
                  width:'100%',
               },
            });
         })}
      </Container>
   );
};

export default Field;
