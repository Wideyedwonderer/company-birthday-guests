import { Config } from "../constants/config";
import { fetchTxtPartnersFile } from "./fetch-txt-partners-file";

describe("Fetch txt partners file", () => {
  it("Should throw error if file path is wrong", async () => {
    let wrongPath = "asdasd";
    let error;
    try {
      await fetchTxtPartnersFile(wrongPath);
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
  });

  it("Should read file if path is correct", async () => {
    const res = await fetchTxtPartnersFile(Config.PARTNERS_TXT_FILE_PATH);
    expect(res).toBeDefined();
  });
});
