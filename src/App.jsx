import { useEffect, useState } from "react";
import { apiHotels } from "./constants/api";
function App() {
  const [hotels, setHotels] = useState([]);

  useEffect(
    () =>
      async function fetchData() {
        try {
          const response = await fetch(apiHotels);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setHotels(data.data);
          }
        } catch (error) {
          console.log(error);
        }
      },
    []
  );
  console.log(hotels);
  return (
    <div>
      {hotels.map(function (hotel) {
        return hotel.attributes.name;
      })}
    </div>
  );
}

export default App;
