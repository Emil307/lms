import React from "react";

export const Fallback: React.FC = () => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>Boom</pre>
        </div>
    );
};
