import React from "react";

const PillResources = ({ resourcesList, deleteResource }) => {
    return (
        <>
        {/*  use DOM APIs to store data needed for event handlers provide better optimization */}
            {resourcesList.map((resource, key) => (
                <div key={key} className="pill"  data-resource={resource} onClick={deleteResource}>
                    <span> {resource.replace(/,/g, "")} </span>
                </div>
            ))}
        </>
    );
};

export default PillResources;