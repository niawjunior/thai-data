import data from '../data.json';
import { ZipCodeData, AddressSuggestion } from './types';

const addressData: ZipCodeData[] = data as ZipCodeData[];
const zipCodes = addressData.map((item) => item.zipCode);

/**
 * Get address data for a specific zip code
 * @param zipCode - 5-digit Thai postal code
 * @returns Address data for the zip code or null if not found
 */
export function getDataForZipCode(zipCode: string | number): ZipCodeData | null {
  const zip = String(zipCode);
  return zip && zip.length === 5 && zipCodes.includes(zip)
    ? addressData.find((item) => item.zipCode === zip) || null
    : null;
}

/**
 * Get all sub-district names for a given zip code
 * @param zipCode - 5-digit Thai postal code
 * @returns Array of sub-district names or empty array if not found
 */
export function getSubDistrictNames(zipCode: string | number): string[] {
  const dataForZipCode = getDataForZipCode(zipCode);
  return dataForZipCode
    ? dataForZipCode.subDistrictList.map((item) => item.subDistrictName)
    : [];
}

/**
 * Get all district names for a given zip code
 * @param zipCode - 5-digit Thai postal code
 * @returns Array of district names or empty array if not found
 */
export function getDistrictNames(zipCode: string | number): string[] {
  const dataForZipCode = getDataForZipCode(zipCode);
  return dataForZipCode
    ? dataForZipCode.districtList.map((item) => item.districtName)
    : [];
}

/**
 * Get province name for a given zip code
 * @param zipCode - 5-digit Thai postal code
 * @returns Province name or null if not found
 */
export function getProvinceName(zipCode: string | number): string | null {
  const dataForZipCode = getDataForZipCode(zipCode);
  return dataForZipCode ? dataForZipCode.provinceList[0]?.provinceName ?? null : null;
}

/**
 * Get address suggestions based on zip code and optional sub-district
 * @param zipCode - 5-digit Thai postal code
 * @param subDistrict - Optional sub-district name for more specific results
 * @returns Address suggestion object with matching address components
 */
export function getAutoSuggestion(
  zipCode: string | number,
  subDistrict?: string
): AddressSuggestion {
  const zip = String(zipCode);
  
  if (!zip || zip.length !== 5 || !zipCodes.includes(zip)) {
    return {
      subDistrict: null,
      districtName: null,
      provinceName: null,
      zipCode: null,
    };
  }

  const dataForZipCode = getDataForZipCode(zip);
  if (!dataForZipCode) {
    return {
      subDistrict: null,
      districtName: null,
      provinceName: null,
      zipCode: null,
    };
  }

  if (!subDistrict) {
    return {
      subDistrict: dataForZipCode.subDistrictList.map(
        (item) => item.subDistrictName
      ),
      districtName: null,
      provinceName: getProvinceName(zip),
      zipCode: zip,
    };
  }

  const subDistrictData = dataForZipCode.subDistrictList.find(
    (item) => item.subDistrictName === subDistrict
  );
  
  const districtName = subDistrictData 
    ? dataForZipCode.districtList.find(
        (item) => item.districtId === subDistrictData.districtId
      )?.districtName ?? null
    : null;

  return {
    subDistrict,
    districtName,
    provinceName: getProvinceName(dataForZipCode.zipCode),
    zipCode: zip,
  };
}

/**
 * Get all address data
 * @returns Complete address data array
 */
export function getAllData(): ZipCodeData[] {
  return [...addressData];
}

// For CommonJS default export support
export default {
  getSubDistrictNames,
  getDistrictNames,
  getProvinceName,
  getAllData,
  getAutoSuggestion,
  getDataForZipCode,
};
