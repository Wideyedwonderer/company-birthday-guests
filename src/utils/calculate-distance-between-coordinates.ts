import { GeoLocationData } from "../interfaces/geo-data";
const haversine = require('haversine')

// Harvestine method ignores ellipsoidal effects of earth's shape, which is accurate enough for most purposes, including ours
export const calculateDistanceBetweenCoordinates = (pointOne: GeoLocationData, pointTwo: GeoLocationData) => haversine(pointOne, pointTwo);