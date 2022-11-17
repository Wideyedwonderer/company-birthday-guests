import { fetchTxtPartnersFile } from "./fetch-txt-partners-file";
import { readBufferLineByLine } from "../utils/read-buffer-line-by-line";
import { PartnerGeolocationData } from "../interfaces/partner-data";
import { parsePartnersData } from "./partners-data-parser";
import { Config } from "../constants/config";

const fetchPartnersGeolocationData: () => Promise<
  PartnerGeolocationData[]
> = async () => {
  const txtFileBuffer: Buffer = await fetchTxtPartnersFile(Config.PARTNERS_TXT_FILE_PATH);
  const txtLines = await readBufferLineByLine(txtFileBuffer);
  return parsePartnersData(txtLines);
};

export { fetchPartnersGeolocationData };
