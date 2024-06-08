import inside from "point-in-polygon"; // Import a library for point-in-polygon algorithm

export const calculateRegionCenter = (coords, geomType) => {
  let longitude, latitude;

  const calculateCentroid = (polygonCoords) => {
    const centroid = polygonCoords.reduce(
      (acc, val) => {
        acc[0] += val[0] / polygonCoords.length;
        acc[1] += val[1] / polygonCoords.length;
        return acc;
      },
      [0, 0]
    );
    return centroid;
  };

  let allCoords = [];
  if (geomType === "Polygon") {
    [longitude, latitude] = calculateCentroid(coords[0]);
    allCoords = coords[0];
  } else if (geomType === "MultiPolygon") {
    allCoords = coords.flat(2);
    longitude =
      allCoords.reduce((acc, val) => acc + val[0], 0) / allCoords.length;
    latitude =
      allCoords.reduce((acc, val) => acc + val[1], 0) / allCoords.length;
  }

  // Calculate spans for dynamic zoom
  const latitudes = allCoords.map((coord) => coord[1]);
  const longitudes = allCoords.map((coord) => coord[0]);
  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);
  const maxLon = Math.max(...longitudes);
  const minLon = Math.min(...longitudes);

  const latitudeDelta = maxLat - minLat + 0.1; // Added padding
  const longitudeDelta = maxLon - minLon + 0.1; // Added padding

  return { longitude, latitude, latitudeDelta, longitudeDelta };
};

// export const getRandomLocationWithinRegion = (coords, geomType) => {
//   console.log("Random Location in Region", geomType);
//   const getRandomNumberInRange = (min, max) =>
//     Math.random() * (max - min) + min;

//   let allCoords = [];
//   if (geomType === "Polygon") {
//     allCoords = coords[0];
//   } else if (geomType === "MultiPolygon") {
//     allCoords = coords.flat(2);
//   }

//   // Calculate the bounding box for the given coordinates
//   const latitudes = allCoords.map((coord) => coord[1]);
//   const longitudes = allCoords.map((coord) => coord[0]);
//   const maxLat = Math.max(...latitudes);
//   const minLat = Math.min(...latitudes);
//   const maxLon = Math.max(...longitudes);
//   const minLon = Math.min(...longitudes);

//   // Generate a random location within the bounding box
//   const latitude = getRandomNumberInRange(minLat, maxLat);
//   const longitude = getRandomNumberInRange(minLon, maxLon);

//   return { latitude, longitude };
// };

export const getRandomLocationWithinRegion = (coords, geomType) => {
  console.log("Random Location in Region", geomType);
  const getRandomNumberInRange = (min, max) =>
    Math.random() * (max - min) + min;

  let allCoords = [];
  if (geomType === "Polygon") {
    allCoords = coords[0];
  } else if (geomType === "MultiPolygon") {
    allCoords = coords.flat(2);
  }

  const latitudes = allCoords.map((coord) => coord[1]);
  const longitudes = allCoords.map((coord) => coord[0]);
  const maxLat = Math.max(...latitudes);
  const minLat = Math.min(...latitudes);
  const maxLon = Math.max(...longitudes);
  const minLon = Math.min(...longitudes);

  let latitude, longitude;
  let isInsideRegion = false;
  let attempts = 0;
  const maxAttempts = 10; // Limit the number of attempts to prevent infinite loop

  while (!isInsideRegion && attempts < maxAttempts) {
    latitude = getRandomNumberInRange(minLat, maxLat);
    longitude = getRandomNumberInRange(minLon, maxLon);

    if (geomType === "Polygon") {
      isInsideRegion = inside([longitude, latitude], coords[0]);
    } else if (geomType === "MultiPolygon") {
      isInsideRegion = coords.some((polygon) =>
        inside([longitude, latitude], polygon)
      );
    }
    attempts++;
  }

  console.log("Random Location", { latitude, longitude });
  return { latitude, longitude };
};

export const generateRandomVoteMarkers = (coords, geomType, n) => {
  const markers = Array.from({ length: n }, () => ({
    ...getRandomLocationWithinRegion(coords, geomType),
  }));
  return markers;
};
