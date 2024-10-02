import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { TimeEventTimes } from "src/models/models";

const date = new Date();
const currentData = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export class Timer {
  getTimes(): TimeEventTimes{
    try {
      const fetchData = async () => {
        const response = await axios.get("https://api.sunrisesunset.io/json", {
          params: {
            lat: "-33.92584", // Cape Town
            lng: "18.42322",
            date_start: currentData,
            date_end: currentData,
          },
        });

        console.log(response.data.results[0] as TimeEventTimes);
        return response.data.results[0] as TimeEventTimes
      };

      fetchData();
    } catch (err: any) {
      console.error(err);
      return null;
    }
  }
}
