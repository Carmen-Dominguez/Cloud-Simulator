import React, { useEffect, useReducer, useState } from "react";
import { reducer, AppState, TimeEvent } from "../../reducer";
import axios from "axios";

export const TimeOfDay = async () => {
  const [state, dispatch] = useReducer(reducer, {
    TimeState: "day",
    WeatherState: "clear",
  } as AppState);
  const [dayPhaseTimes, setDayPhaseTimes] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("https://api.sunrisesunset.io/json", {
          params: {
            lat: "-33.92584",
            lng: "18.42322",
            date_start: "2024-10-01",
            date_end: "2024-10-01",
          },
        });

        setDayPhaseTimes(response.data);
        console.log(response);
      };

      fetchData();
    } catch (err: any) {
      console.error(err);
      return null;
    }
  }, []);
};


