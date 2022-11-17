import { PartnerGeolocationData } from "../interfaces/partner-data";
import { ErrorOnLineMessage } from "../interfaces/error-on-line-message";
import * as Joi from "joi";
import { ErrorMessages } from "../constants/error-messages";

const parsePartnersData: (rawData: string[]) => PartnerGeolocationData[] = (
  rawData: string[]
) => {
  const schema: Joi.ObjectSchema = Joi.object({
    name: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
    partner_id: Joi.number().positive().required(),
  });
  const validationErrors: ErrorOnLineMessage[] = [];
  const resultData: PartnerGeolocationData[] = [];

  for (let i = 0; i < rawData.length; i++) {
    const currentLine = rawData[i];

    try {
      const parsedPartnerGeoData: PartnerGeolocationData =
        parseLineToGeoDataObject(currentLine, schema);
      resultData.push(parsedPartnerGeoData);
    } catch (e) {
      validationErrors.push({ message: e as string, lineNumber: i + 1 });
    }
  }

  if (validationErrors.length) {
    const validationErrorsFinalMessage =
      constructFinalErrorMessageFromIndividualLinesMessages(validationErrors);
    throw new Error(validationErrorsFinalMessage);
  }

  const duplicateIds = getForDuplicateIds(resultData);
  if(duplicateIds.length) {
    throw new Error(ErrorMessages.DUPLICATE_PARTNER_IDS(duplicateIds));
  }
  return resultData;
};

const parseLineToGeoDataObject: (
  rawLine: string,
  validationSchema: Joi.ObjectSchema
) => PartnerGeolocationData = (rawLine, validationSchema) => {
  let parsed;
  try{
    parsed = JSON.parse(rawLine);
  } catch(e) {
    throw new Error(ErrorMessages.WRONG_TXT_LINE_FORMAT);
  }
  

  const readyForValidation = {
    partner_id: +parsed.partner_id,
    latitude: +parsed.latitude,
    longitude: +parsed.longitude,
    name: parsed.name,
  };

  const error = validationSchema.validate(readyForValidation).error;
  if (error) {
    throw new Error(error.message);
  }

  return {
    latitude: readyForValidation.latitude,
    longitude: readyForValidation.longitude,
    name: readyForValidation.name,
    partnerId: readyForValidation.partner_id,
  };
};

const constructFinalErrorMessageFromIndividualLinesMessages = (
  errorMessages: ErrorOnLineMessage[]
) => {
  return errorMessages.reduce(
    (acc, error) => `${acc} \n ON LINE ${error.lineNumber} of TXT FILE: ${error.message}`,
    ""
  );
};
const getForDuplicateIds = (partnerData: PartnerGeolocationData[]) => {
  const duplicateIds: number[] = [];
  const idSet = new Set();
  partnerData.forEach(({partnerId}) => {
    if(idSet.has(partnerId)) {
      duplicateIds.push(partnerId);
    }
    idSet.add(partnerId);
  })
  return duplicateIds;
}
export {parsePartnersData}
