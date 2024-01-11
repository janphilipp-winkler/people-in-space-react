import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [activeCraft, setActiveCraft] = useState("All");

  useEffect(() => {
    async function fetchPeopleInSpace() {
      const response = await fetch("http://api.open-notify.org/astros.json");
      const data = await response.json();
      setPeopleInSpace(data.people);
    }
    fetchPeopleInSpace();
  }, []);

  const handleCraftChange = (event) => {
    setActiveCraft(event.target.value);
  };

  const filteredPeople =
    activeCraft === "All"
      ? peopleInSpace
      : peopleInSpace.filter((person) => person.craft === activeCraft);

  return (
    <>
      <main>
        <h1 className="firstSentence">
          There {filteredPeople.length === 1 ? "is" : "are"} currently{" "}
          <span className="dynamic">{filteredPeople.length}</span> people{" "}
          {activeCraft === "All" ? "in" : "on the"}
        </h1>
        <select value={activeCraft} onChange={handleCraftChange}>
          <option value="All">space</option>
          <option value="ISS">ISS</option>
          <option value="Tiangong">Tiangong</option>
        </select>
        {filteredPeople.length > 0 && (
          <>
            <h1>Their names are: </h1>
            <h1 className="dynamic">
              {filteredPeople.map((person, index) => (
                <span key={person.name}>
                  {person.name}
                  {index < filteredPeople.length - 1 && ", "}
                </span>
              ))}
            </h1>
          </>
        )}
      </main>
      <footer>
        <p>
          Made in REACT with love and thanks to{" "}
          <a href="http://open-notify.org/Open-Notify-API/People-In-Space/">
            Open Notify API
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
