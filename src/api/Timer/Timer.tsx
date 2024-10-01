import React, { useEffect, useReducer, useState } from "react";
import { reducer, AppState } from "../../reducer";
import axios from "axios";
import {
  emptyTimeEventTimes,
  TimeEvent,
  TimeEventTimes,
} from "src/models/models";

export const TimeOfDay = async () => {
  const [state, dispatch] = useReducer(reducer, {
    TimeEventTimes: emptyTimeEventTimes,
  } as AppState);
  const date = new Date();
  const currentData = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("https://api.sunrisesunset.io/json", {
          params: {
            lat: "-33.92584",
            lng: "18.42322",
            date_start: currentData,
            date_end: currentData,
          },
        });

        dispatch({
          TimeEventTimes: response.data.results[0] as TimeEventTimes,
        } as TimeEvent);
        console.log(response.data.results[0] as TimeEventTimes);
      };

      fetchData();
    } catch (err: any) {
      console.error(err);
      return null;
    }
  }, []);
};
