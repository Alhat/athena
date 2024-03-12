import "./App.sass";
import Main from "./Pages/Main/Main.js";

export default function App() {

  /**
   * The parameters must be formatted as a hex string. EX: new_primary = '#12372A'
   * syntax found in: https://stackoverflow.com/questions/41370741/how-do-i-edit-a-css-variable-using-js
   * 
   * @param {*} new_primary 
   * @param {*} new_secondary 
   * @param {*} new_tertiary 
   * @param {*} new_quaternry 
   */
  function updateTheme(new_primary, new_secondary, new_tertiary, new_quaternry) {

    document.documentElement.style.setProperty('--primary-color', new_primary);
    document.documentElement.style.setProperty('--secondary-color', new_secondary);
    document.documentElement.style.setProperty('--third-color', new_tertiary);
    document.documentElement.style.setProperty('--fourth-color', new_quaternry);

  }


  return (
    <div className="app_toplevel">
      <Main updateTheme={updateTheme}/>
    </div>
  );
}