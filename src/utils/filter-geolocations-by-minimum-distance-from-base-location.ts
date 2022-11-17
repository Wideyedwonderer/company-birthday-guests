import { calculateDistanceBetweenCoordinates } from "./calculate-distance-between-coordinates";
import { GeoLocationData } from "../interfaces/geo-data";

export const filterGeoLocationsByMinimumDistanceToBaseLocation = <T extends GeoLocationData>(geoLocationsData: T[], minimumDistance: number, baseLocation: GeoLocationData) => {
    const distancesToPartnersInKm = geoLocationsData.map((partnerGeoData) => calculateDistanceBetweenCoordinates(baseLocation, partnerGeoData));
    
    const shouldInvitePartner = (distanceToPartnerInKm: number) => distanceToPartnerInKm <= minimumDistance;
    return geoLocationsData.filter((_, index) => shouldInvitePartner(distancesToPartnersInKm[index]));  
}