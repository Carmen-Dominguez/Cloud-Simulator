import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { TimeEventTimes } from "src/models/models";
import { reducer, AppState, TimeEvent } from "../../reducer";

const date = new Date();
const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export class Timer {
  async getTimes() {
    try {
        const response = await axios.get("https://api.sunrisesunset.io/json", {
          params: {
            lat: "-33.92584", // Cape Town
            lng: "18.42322",
            date_start: currentDate,
            date_end: currentDate,
          },
        });

        return response;
    } catch (err: any) {
      console.error(err);
      return null;
    }
  }
}
