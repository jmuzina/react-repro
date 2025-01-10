import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import Application from "../../Application.jsx";

console.log("hydrating");

hydrateRoot(document.getElementById('root'), <Application/>);

console.log("hydrated");