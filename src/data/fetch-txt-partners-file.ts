import * as fs from "fs";

// Could swap for different fetching strategy in the future
export const fetchTxtPartnersFile: (
  filePath: string
) => Promise<Buffer> = async (filePath: string) => {
  return fs.promises.readFile(filePath)
};
