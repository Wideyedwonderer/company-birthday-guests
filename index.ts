import { calculateDistanceBetweenCoordinates } from "./src/utils/calculate-distance-between-coordinates";
import { fetchPartnersGeolocationData } from "./src/data/fetch-partners-data";
import { PartnerGeolocationData } from "./src/interfaces/partner-data";
import { Config } from "./src/constants/config";
import { filterGeoLocationsByMinimumDistanceToBaseLocation } from "./src/utils/filter-geolocations-by-minimum-distance-from-base-location";

const printOutPartnersInvitationList = async () => {
  try {
    const partnersGeocationData: PartnerGeolocationData[] = await fetchPartnersGeolocationData();
   
    const invitationList = filterGeoLocationsByMinimumDistanceToBaseLocation(partnersGeocationData, Config.MINIMUM_PARTNER_DISTANCE_IN_KM, Config.HEADQUARTERS_COORDINATES);
    const sortedInvitationList = invitationList.sort((a, b) => a.partnerId - b.partnerId);

    console.log(sortedInvitationList.map(({partnerId, name}) => ({partnerId, name})));
  } catch(e) {
    console.log(e)
  }
 
}
printOutPartnersInvitationList();

