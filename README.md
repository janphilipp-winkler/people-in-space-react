<img src="1.jpg" />
<img src="2.jpg" />
<img src="3.jpg" />

# Challenges: Self Directed Learning 5

## 📡 People in Space - React Style 🚀

> Required Sessions:
>
> - React Basics
> - React State 1-3
> - React useEffect with Fetch

Let's build a website that displays the current number of people in space (again!). Hints are provided if you get stuck. Try to build as much as possible without looking at the hints. We will use the [following API](http://open-notify.org/Open-Notify-API/People-In-Space/) to determine how many people are current in space.

1.  Create a new React project using `create-react-app`. `cd` into the new directory that get's created and don't forget to install the packages.
     <details>
     <summary>🙈 Hint</summary>

    ```bash
    npx create-react-app people-in-space-react
    cd people-in-space-react
    npm i

    ```

    </details>
    &nbsp;

2.  Start the dev server
       <details>
       <summary>🙈 Hint</summary>

    ```bash
    npm run start
    ```

    </details>
    &nbsp;

3.  Add an element to the html where we will put the number of people currently in space. We probably want to keep track of the number of people in space via state (try and think of a good react hook for this). We can set the initial value to 0 for now.
    <details>
    <summary>🙈 Hint</summary>

    ```js
    import { useState } from "react";
    import "./App.css";

    function App() {
      const [numberInSpace, setNumberInSpace] = useState(0);

      return (
        <main>
          <h1>People in Space: {numberInSpace}</h1>
        </main>
      );
    }

    export default App;
    ```

     </details>
     &nbsp;

4.  Now we want to fetch the data from the api. There is another hook from React that we want to think about here. Fetching data from an external source can be seen as a side effect. Once you have fetched the data don't forget to call `setPeopleInSpace`
    <details>
    <summary>🙈 Hint</summary>

    ```js
    import { useEffect, useState } from "react";
    import "./App.css";

    function App() {
      const [numberInSpace, setNumberInSpace] = useState(0);

      useEffect(() => {
        async function fetchPeopleInSpace() {
          const response = await fetch(
            "http://api.open-notify.org/astros.json"
          );
          const data = await response.json();
          setNumberInSpace(data.number);
        }
        fetchPeopleInSpace();
      }, []);

      return (
        <main>
          <h1>People in Space: {numberInSpace}</h1>
        </main>
      );
    }

    export default App;
    ```

    </details>
    &nbsp;

Congratulations! You have now made a website that shows the current number of people in space using React. Compare this with the `people in space` project you worked on last week.

As a **_bonus_** feature you could add a `ul` to the page that gets updated with the names of the people currently in space (this information is also included in the response from the API). You will probably want to create another state variable. Then we need to remember how to loop over an array in React.

  <details>
  <summary>🙈 Hint</summary>

```js
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [numberInSpace, setNumberInSpace] = useState(0);
  const [peopleInSpace, setPeopleInSpace] = useState([]);

  useEffect(() => {
    async function fetchPeopleInSpace() {
      const response = await fetch("http://api.open-notify.org/astros.json");
      const data = await response.json();
      setNumberInSpace(data.number);
      setPeopleInSpace(data.people);
    }
    fetchPeopleInSpace();
  }, []);

  return (
    <main>
      <h1>People in Space: {numberInSpace}</h1>
      {peopleInSpace.length > 0 && (
        <ul>
          {peopleInSpace.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
```

  </details>
      &nbsp;

As an **_extra bonus_** you could add 3 buttons to the page. `All`, `ISS` and `Tiangong`. Then when you click on one of the buttons you update the list of people displayed on the page based on which space craft they are on. i.e. if you click on the ISS button, your list of people should only include those on the `ISS`. We learnt about an array method that would be particularly helpful in this scenario.

  <details>
  <summary>🙈 Hint</summary>

There are several ways we could achieve this. Here is one possible solution.

```js
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [numberInSpace, setNumberInSpace] = useState(0);
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [activeCraft, setActiveCraft] = useState("All");

  useEffect(() => {
    async function fetchPeopleInSpace() {
      const response = await fetch("http://api.open-notify.org/astros.json");
      const data = await response.json();
      setNumberInSpace(data.number);
      setPeopleInSpace(data.people);
    }
    fetchPeopleInSpace();
  }, []);

  const filteredPeople =
    activeCraft === "All"
      ? peopleInSpace
      : peopleInSpace.filter((person) => person.craft === activeCraft);

  return (
    <main>
      <h1>People in Space: {numberInSpace}</h1>
      <h2>Craft: {activeCraft}</h2>
      <button type="button" onClick={() => setActiveCraft("All")}>
        All
      </button>
      <button type="button" onClick={() => setActiveCraft("ISS")}>
        ISS
      </button>
      <button type="button" onClick={() => setActiveCraft("Tiangong")}>
        Tiangong
      </button>
      {filteredPeople.length > 0 && (
        <ul>
          {filteredPeople.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
```

  </details>
