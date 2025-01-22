import React, {Suspense, useState, lazy} from "react";

const LazyButton = lazy(() =>
  new Promise((resolve) => {
    setTimeout(
      () => import("./LazyComponent.jsx")
        .then(lazyComponentModule => {
          console.log("resolved lazy component");
          resolve(lazyComponentModule);
        }),
      2000
    )
  })
);

function Application() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>React Repro</h1>
      <Suspense fallback={"Loading..."}>
        <LazyButton/>
      </Suspense>
      <p>
        Count: {count}<br/>
        <button
          onClick={() => setCount(count + 1)}
        >Increment count</button>
      </p>
    </>
  );
}

export default Application;
