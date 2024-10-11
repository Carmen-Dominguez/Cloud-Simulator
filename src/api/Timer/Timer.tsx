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
            lat: "67.9222", // Cape Town 67.9222° N, 26.5046° E
            lng: "26.5046",
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
