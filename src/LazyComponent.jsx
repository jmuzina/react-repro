import React from "react";

function LazyComponent() {
  return (
    <button
      onClick={() => alert("clicked!")}
    >Click me!</button>
  );
}

export default LazyComponent;
