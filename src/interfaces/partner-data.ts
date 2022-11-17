import { GeoLocationData} from './geo-data';

export type PartnerGeolocationData = GeoLocationData & {
    partnerId: number;
    name: string;
} 