export interface Location {
  name: string;
  description: string;
  lat: number;
  lng: number;
}

const locations: Location[] = [
  {
    name: "Location 1",
    description: "Description for location 1.",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    name: "Location 2",
    description: "Description for location 2.",
    lat: 34.0522,
    lng: -118.2437,
  },
  // Add more locations as needed
];

export default locations;
