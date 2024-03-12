import React from "react";
import "./Main.css";
import "./Main.sass";
import Column from "./Column";
import Task from "./Task";

function menuDisactivate() {
  document
    .querySelector(".home_menu_links_parent")
    .classList.toggle("toggleMenuChange");
}
function menuActivate() {
  document
    .querySelector(".home_menu_links_parent")
    .classList.toggle("toggleMenuChange");
}
function ShowMenuLinks(updateTheme) {
  const menulinkslist = [
    { name: "A", id: "#a" },
    { name: "B", id: "#b" },
    { name: "C", id: "#c" },
  ];
  return (
    <div className="home_menu_links_parent">
      {menulinkslist.map((item) => (
        <a className="home_menu_links" onClick={menuDisactivate} href={item.id}>
          {item.name}
        </a>
      ))}

      <a className="home_menu_links">
          <b className="home_menu_theme" onClick={() => handleTheme(updateTheme, "green")}>Green</b>
          <b className="home_menu_theme" onClick={() => handleTheme(updateTheme, "blue")}>Blue</b>
          <b className="home_menu_theme" onClick={() => handleTheme(updateTheme, "pink")}>Pink</b>
      </a>
    </div>
  );
}


/**
 * 
 * @param {*} updateTheme the function in App.js to update theme colors in App.sass
 * @param {*} color 
 */
function handleTheme(updateTheme, color) {

  switch (color) {

    case "green":
      updateTheme("#12372A", "#436850", "#adbc9f", "#FBFADA");
      break;

    case "blue":
      updateTheme("#070F2B", "#1B1A55", "#535C91", "#9290C3");
      break;

    case "pink":
      updateTheme("#944E63", "#B47B84", "#CAA6A6", "#FFE7E7");
      break;
  
    default:
      // defaults to green
      updateTheme("#12372A", "#436850", "#adbc9f", "#FBFADA");
      break;
  }
}

const AlterMain = ({ updateTheme }) => {

  return (
    <div>
      <div className="home_menu">
        <a className="home_menu_name" href={"#"}>
          <b>AI Calendar</b>
        </a>
        <div>{ShowMenuLinks(updateTheme)}</div>
        <div className="home_menu_button" onClick={menuActivate}>
          <div className="home_menu_button_line home_menu_button_line1" />
          <div className="home_menu_button_line home_menu_button_line2" />
        </div>
      </div>

      <div className="main-toplevel fs2">
        <Column title="TO DO">
          <Task
            type="todo"
            title="Task 1"
            description="This is a to-do task."
          />
        </Column>
        <Column title="IN PROGRESS">
          <Task
            type="in-progress"
            title="Task 2"
            dueDate="Feb 8, 2024"
            status="50%"
          />
        </Column>
        <Column title="COMPLETED">
          <Task
            type="completed"
            title="Task 3"
            description="This task is complete."
          />
        </Column>
      </div>
    </div>
  );
};

export default AlterMain;
