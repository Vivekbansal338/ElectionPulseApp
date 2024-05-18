import { createSlice } from "@reduxjs/toolkit";

// {"coords": {"accuracy": 2599.9990234375, "altitude": 0, "altitudeAccuracy": 0,
// "heading": 0, "latitude": 28.3560531, "longitude": 76.5338301, "speed": 0},
// "mocked": false, "timestamp": 1714847104956}

const initialState = {
  locations: [],
  lastLocationCoords: {
    latitude: 0,
    longitude: 0,
  },
};

const LocationSlice = createSlice({
  name: "Location",
  initialState: initialState,
  reducers: {
    AddLocation(state, action) {
      const { latitude, longitude } = action.payload.coords;

      // Simulate movement by adding random distance to the coordinates
      // const randomLat = latitude + (Math.random() - 0.5) * 0.005;
      // const randomLng = longitude + (Math.random() - 0.5) * 0.005;
      // console.log("random", (Math.random() - 0.5) * 0.005);

      const randomLat =
        state.locations.length > 0
          ? state.locations[0].coords.latitude + 0.003733292498637625 * 20
          : latitude;

      const randomLng =
        state.locations.length > 0
          ? state.locations[0].coords.longitude + 0.003733292498637625 * 20
          : longitude;

      const newLocation = {
        ...action.payload,
        coords: {
          ...action.payload.coords,
          latitude: randomLat,
          longitude: randomLng,
        },
      };

      state.locations.unshift(newLocation); // Add to the front
    },

    RemoveLocation(state) {
      // Remove from the front
      if (state.locations.length > 0) {
        state.locations.shift();
      }
    },
    SetLastLocationCoords(state, action) {
      state.lastLocationCoords = action.payload;
    },
  },
});

export const { AddLocation, RemoveLocation, SetLastLocationCoords } =
  LocationSlice.actions;
export default LocationSlice.reducer;
