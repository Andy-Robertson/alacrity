import React from "react";

const PillResources = ({ resourcesList, deleteResource }) => {
    return (
        <div className="resources-pill-wrapper">
        {/*  use DOM APIs to store data needed for event handlers provide better optimization */}
            {resourcesList.map((resource, key) => (
                <div key={key} className="resources-pill"  data-resource={resource} onClick={deleteResource}>
                    <span> {resource.replace(/,/g, "")} </span>
                </div>
            ))}
        </div>
    );
};

export default PillResources;