import data from '../data.json';
import { ZipCodeData, AddressSuggestion } from './types';

const addressData: ZipCodeData[] = data as ZipCodeData[];
const zipCodes = addressData.map((item) => item.zipCode);

/**
 * Get address data for a specific zip code
 * @param zipCode - 5-digit Thai postal code
 * @returns Address data for the zip code or null if not found
 */
export function getAddressByZipCode(zipCode: string | number): ZipCodeData | null {
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
export function getSubdistrictsByZipCode(zipCode: string | number): string[] {
  const dataForZipCode = getAddressByZipCode(zipCode);
  return dataForZipCode
    ? dataForZipCode.subDistrictList.map((item: { subDistrictName: string }) => item.subDistrictName)
    : [];
}

/**
 * Get all district names for a given zip code
 * @param zipCode - 5-digit Thai postal code
 * @returns Array of district names or empty array if not found
 */
export function getDistrictsByZipCode(zipCode: string | number): string[] {
  const dataForZipCode = getAddressByZipCode(zipCode);
  return dataForZipCode
    ? dataForZipCode.districtList.map((item: { districtName: string }) => item.districtName)
    : [];
}

/**
 * Get province name for a given zip code
 * @param zipCode - 5-digit Thai postal code
 * @returns Province name or null if not found
 */
export function getProvinceByZipCode(zipCode: string | number): string | null {
  const dataForZipCode = getAddressByZipCode(zipCode);
  return dataForZipCode ? dataForZipCode.provinceList[0]?.provinceName ?? null : null;
}

/**
 * Get address suggestions based on zip code and optional sub-district
 * @param zipCode - 5-digit Thai postal code
 * @param subDistrict - Optional sub-district name for more specific results
 * @returns Address suggestion object with matching address components
 */
export function getAddressSuggestions(
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

  const dataForZipCode = getAddressByZipCode(zip);
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
        (item: { subDistrictName: string }) => item.subDistrictName
      ),
      districtName: null,
      provinceName: getProvinceByZipCode(zip),
      zipCode: zip,
    };
  }

  const subDistrictData = dataForZipCode.subDistrictList.find(
    (item: { subDistrictName: string }) => item.subDistrictName === subDistrict
  );
  
  const districtName = subDistrictData 
    ? dataForZipCode.districtList.find(
        (item: { districtId: string }) => item.districtId === subDistrictData.districtId
      )?.districtName ?? null
    : null;

  return {
    subDistrict,
    districtName,
    provinceName: getProvinceByZipCode(dataForZipCode.zipCode),
    zipCode: zip,
  };
}

/**
 * Get all address data
 * @returns Complete address data array
 */
export function getAllAddressData(): ZipCodeData[] {
  return [...addressData];
}

// For CommonJS default export support
export default {
  getSubdistrictsByZipCode,
  getDistrictsByZipCode,
  getProvinceByZipCode,
  getAllAddressData,
  getAddressSuggestions,
  getAddressByZipCode,
};
