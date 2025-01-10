import React, {Suspense, useState, lazy, useEffect} from "react";

const LazyButton = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import("./LazyComponent.jsx")), 2000);
  })
);

function Application() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>React Repro</h1>
      <h2>React Vite template</h2>
      <Suspense fallback={"Loading..."}>
        <LazyButton/>
      </Suspense>
      <div>
        {count}
        <button
          onClick={() => setCount(count + 1)}
        >Count is: {count}</button>
      </div>
    </>
  );
}

export default Application;
