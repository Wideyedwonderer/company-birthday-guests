import { readBufferLineByLine } from "./read-buffer-line-by-line";

describe('Read buffer line by line',  () => {
    it('Should read correct 0 number of lines, when file is empty',async () => {
        const bufferText = '';

        let buf = Buffer.from(bufferText, 'utf8');
        const result = await readBufferLineByLine(buf);
        expect(result.length).toBe(0);
    })

    it('Should read correct number of lines, when file has more than 1 line',async () => {
        const lineOne ='{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';
        const lineTwo ='{"latitude": "42.617", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';

        const bufferText = `${lineOne}\n${lineTwo}`;

        let buf = Buffer.from(bufferText, 'utf8');
        const result = await readBufferLineByLine(buf);

        expect(result.length).toBe(2);
    })

    it('Should read first line correctly',async () => {
        const lineOne ='{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';
        const lineTwo ='{"latitude": "42.617", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';

        const bufferText = `${lineOne}\n${lineTwo}`;

        let buf = Buffer.from(bufferText, 'utf8');
        const result = await readBufferLineByLine(buf);

        expect(result[0]).toBe(lineOne);
    })

    it('Should read last line correctly',async () => {
        const lineOne ='{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';
        const lineTwo ='{"latitude": "42.617", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';

        const bufferText = `${lineOne}\n${lineTwo}`;

        let buf = Buffer.from(bufferText, 'utf8');
        const result = await readBufferLineByLine(buf);

        expect(result[1]).toBe(lineTwo);
    })

    it('Should read last line correctly if empty lines in between',async () => {
        const lineOne ='{"latitude": "42.6661417", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';
        const lineTwo ='{"latitude": "42.617", "partner_id": 12, "name": "Bluebell Robles", "longitude": "23.293435"}';

        const bufferText = `${lineOne}\n\n${lineTwo}`;

        let buf = Buffer.from(bufferText, 'utf8');
        const result = await readBufferLineByLine(buf);

        expect(result[2]).toBe(lineTwo);
    })
})