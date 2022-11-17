import { parsePartnersData } from "./partners-data-parser";

describe('Partners data parser',  () => {
    const validLine = '{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';
    it('Should return latitude correctly if valid',async () => {
        const validData = [validLine];

        const result = await parsePartnersData(validData);
        const parsedLine = result[0];
        expect(parsedLine.latitude).toBe(42.6661417);
    })
    it('Should throw error if latitude more than 90',async () => {
        const biggerLatitude = ['{"latitude": "90.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}'];

        let error;
        try {
             await parsePartnersData(biggerLatitude);           

        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if latitude less than -90',async () => {
        const biggerLatitude = ['{"latitude": "-90.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if latitude is missing',async () => {
        const biggerLatitude = ['{"partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if longitude is less than -180',async () => {
        const biggerLatitude = ['{"latitude": "-9.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "-183.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if longitude is more than -180',async () => {
        const biggerLatitude = ['{"latitude": "-9.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "183.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if longitude is missing',async () => {
        const biggerLatitude = ['{"partner_id": 12, "name": "Bluebell Robles", "latitude": "23.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if name is missing' ,async () => {
        const biggerLatitude = ['{"latitude": "-9.6661417", "partner_id": 12,  "longitude": "18.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if name id is missing' ,async () => {
        const biggerLatitude = ['{"latitude": "-9.6661417", "name": "X", "longitude": "18.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if name id is negative' ,async () => {
        const biggerLatitude = ['{"latitude": "-9.6661417",  "partner_id": -2, "name": "X", "longitude": "18.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if name id is 0' ,async () => {
        const biggerLatitude = ['{"latitude": "-9.6661417",  "partner_id": 0, "name": "X", "longitude": "18.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if wrong syntax' , async () => {
        const biggerLatitude = ['"latitude": "-9.6661417",  "partner_id": 10, "name": "X", "longitude": "18.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })

    it('Should throw error if duplicate ids' , async () => {
        const biggerLatitude = ['{"latitude": "-9.6661417",  "partner_id": 10, "name": "X", "longitude": "18.293435"}','{"latitude": "-9.6661417",  "partner_id": 10, "name": "X", "longitude": "18.293435"}'];

        let error;
        try {
            await parsePartnersData(biggerLatitude);           
        } catch(e) {
            error = e;
        }
        expect(error).toBeDefined()
    })
})