import React from "react";
import NewProject from "../proyectos/NewProject";
import ListProject from "../proyectos/ListProject";

export default function Sidebar() {
  return (
    <aside>
      <h1>
        MERN<span>Task</span>
      </h1>
      <NewProject />
      <div className="proyectos">
        <h2>Tus Proyectos</h2>
        <ListProject />
      </div>
    </aside>
  );
}
