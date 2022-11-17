import { GeoLocationData } from "../interfaces/geo-data"
import { filterGeoLocationsByMinimumDistanceToBaseLocation } from "./filter-geolocations-by-minimum-distance-from-base-location";

describe('Filter partners by minimum distance', () => {
    const partner234kmAway: GeoLocationData = {
        latitude: 42.7034111,
        longitude: 20.4862259,
    } 
    const headquarters = {
        latitude: 42.6665921,
        longitude: 23.351723
      };
    it('Should not include in result partner that is located above minimum distance', () => {
        const partners = [partner234kmAway];
        const result = filterGeoLocationsByMinimumDistanceToBaseLocation(partners, 100, headquarters );

        expect(result.length).toBe(0);
    })

    it('Should include in result partner that is located below the minimum distance', () => {
        const partners = [partner234kmAway];
        const result = filterGeoLocationsByMinimumDistanceToBaseLocation(partners, 235, headquarters );

        expect(result.length).toBe(1);
    })

    it('Should include in result partner that is located exatcly at the minimum distance', () => {
        const partners = [partner234kmAway];
        const result = filterGeoLocationsByMinimumDistanceToBaseLocation(partners,  234.25, headquarters );

        expect(result.length).toBe(1);
    })
})