import { GeoLocationData } from "../interfaces/geo-data"
import { calculateDistanceBetweenCoordinates } from "./calculate-distance-between-coordinates";
import { filterGeoLocationsByMinimumDistanceToBaseLocation } from "./filter-geolocations-by-minimum-distance-from-base-location";

describe('Calculate distance between coordinates', () => {
    const coordinateOne: GeoLocationData = {
        latitude: 42.7034111,
        longitude: 20.4862259,
    } 
    const coordinateTwo = {
        latitude: 42.6665921,
        longitude: 23.351723
      };

    const coordinateThree = {
        latitude: -56.655,
        longitude: -78.901
    }

    const coordinateFour = {
        latitude: -56.655,
        longitude: -90.901
    }

    const northPole = {
        latitude: 90,
        longitude: -180,
    }

    const southPole = {
        latitude: -90,
        longitude: -180,
    }
    it('Should calculate distance between existing positive coordinates correctly', () => {
        const result: number = calculateDistanceBetweenCoordinates(coordinateOne, coordinateTwo);

        expect(result.toFixed(1)).toBe('234.2');
    })

    it('Should calculate distance between same coordinates as 0', () => {
        const result: number = calculateDistanceBetweenCoordinates(coordinateOne, coordinateOne);

        expect(result).toBe(0);
    })

    it('Should calculate distance between negative and positive coordinates correctly', () => {
        const result: number = calculateDistanceBetweenCoordinates(coordinateOne, coordinateThree);

        expect(result.toFixed(1)).toBe('14369.8');
    })

    it('Should calculate distance between negative coordinates correctly', () => {
        const result: number = calculateDistanceBetweenCoordinates(coordinateThree, coordinateFour);

        expect(result.toFixed(1)).toBe('732.5');
    })

    it('Should calculate distance between poles', () => {
        const result: number = calculateDistanceBetweenCoordinates(northPole, southPole);

        expect(result.toFixed(1)).toBe('20015.1');
    })
})