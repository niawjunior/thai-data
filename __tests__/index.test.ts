import {
  getAddressByZipCode,
  getSubdistrictsByZipCode,
  getDistrictsByZipCode,
  getProvinceByZipCode,
  getAddressSuggestions,
  getAllAddressData,
} from "../src/index";

describe("Thai Address Data", () => {
  describe("getAllAddressData", () => {
    it("should return an array of address data", () => {
      const result = getAllAddressData();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("zipCode");
      expect(result[0]).toHaveProperty("subDistrictList");
      expect(result[0]).toHaveProperty("districtList");
      expect(result[0]).toHaveProperty("provinceList");
    });
  });

  describe("getAddressByZipCode", () => {
    it("should return data for a valid postal code", () => {
      const result = getAddressByZipCode("10110");
      expect(result).not.toBeNull();
      expect(result?.zipCode).toBe("10110");
    });

    it("should return null for an invalid postal code", () => {
      const result = getAddressByZipCode("99999");
      expect(result).toBeNull();
    });

    it("should handle numeric input", () => {
      const result = getAddressByZipCode(10110);
      expect(result).not.toBeNull();
      expect(result?.zipCode).toBe("10110");
    });
  });

  describe("getSubdistrictsByZipCode", () => {
    it("should return sub-district names for a valid postal code", () => {
      const result = getSubdistrictsByZipCode("10110");
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe("string");
    });

    it("should return an empty array for an invalid postal code", () => {
      const result = getSubdistrictsByZipCode("99999");
      expect(result).toEqual([]);
    });
  });

  describe("getDistrictsByZipCode", () => {
    it("should return district names for a valid postal code", () => {
      const result = getDistrictsByZipCode("10110");
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(typeof result[0]).toBe("string");
    });
  });

  describe("getProvinceByZipCode", () => {
    it("should return province name for a valid postal code", () => {
      const result = getProvinceByZipCode("10110");
      expect(typeof result).toBe("string");
      expect(result).not.toBe("");
    });

    it("should return null for an invalid postal code", () => {
      const result = getProvinceByZipCode("99999");
      expect(result).toBeNull();
    });
  });

  describe("getAddressSuggestions", () => {
    it("should return suggestions with sub-districts when only zip code is provided", () => {
      const result = getAddressSuggestions("10110");
      expect(result.zipCode).toBe("10110");
      expect(Array.isArray(result.subDistrict)).toBe(true);
      expect(result.subDistrict?.length).toBeGreaterThan(0);
      expect(result.districtName).toBeNull();
    });

    it("should return complete address when both zip code and sub-district are provided", () => {
      // First get a valid sub-district
      const testData = getAddressByZipCode("10110");
      if (!testData) {
        throw new Error("Test data not found for zip code 10110");
      }
      const testSubDistrict = testData.subDistrictList[0].subDistrictName;

      const result = getAddressSuggestions("10110", testSubDistrict);
      expect(result.zipCode).toBe("10110");
      expect(result.subDistrict).toBe(testSubDistrict);
      expect(typeof result.districtName).toBe("string");
      expect(typeof result.provinceName).toBe("string");
    });

    it("should handle invalid zip code", () => {
      const result = getAddressSuggestions("99999");
      expect(result).toEqual({
        subDistrict: null,
        districtName: null,
        provinceName: null,
        zipCode: null,
      });
    });
  });
});
