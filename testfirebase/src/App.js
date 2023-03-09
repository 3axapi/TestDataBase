import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useCallback } from 'react';

// https://firebase.google.com/

function App() {

  const [myData, setMyDate] = useState("");

  function inputHandler(event) {
    setMyDate(event.currentTarget.value);
    //console.log(myData);
  }

  // fetch().then().then().cought() ...

  const getDataHandler = useCallback(async () => {
    const response = await fetch('https://testbase-r-default-rtdb.firebaseio.com/pirewsze_kroki.json'); // zwraca objektnicą
    // console.log(response);
    const data = await response.json();
    // console.log(data);

    const loadedData = [];
    for (const key in data) {
      loadedData.push({
        moj: data[key].my_key
      })
    }

    console.log(data);
    // console.log(loadedData);
  });

  async function sendDataHandler(event) {
    event.preventDefault()

    const my_object = {
      my_key: myData
    };

    console.log(myData);
    const response = await fetch('https://testbase-r-default-rtdb.firebaseio.com/pirewsze_kroki.json',
    {
      method: 'POST',
      body: JSON.stringify(my_object),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(myData);
    setMyDate('');
  }

  useEffect(() => {
    getDataHandler()
  }, [getDataHandler])

  return (
    <div className="App">
      
      <form onSubmit={sendDataHandler}>
        <input type="text"
          onChange={inputHandler}
        />
        <button type="submit"> Prześlij dane do bazy </button>
      </form>
      <button onClick={getDataHandler}> Pobierz dane </button>
    </div>
  );
}

export default App;
