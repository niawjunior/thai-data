export interface SubDistrict {
  subDistrictId: string;
  districtId: string;
  provinceId: string;
  subDistrictName: string;
}

export interface District {
  districtId: string;
  proviceId: string; // Note: This appears to be a typo in the original data (should be provinceId)
  districtName: string;
}

export interface Province {
  provinceId: string;
  provinceName: string;
}

export interface ZipCodeData {
  zipCode: string;
  subDistrictList: SubDistrict[];
  districtList: District[];
  provinceList: Province[];
}

export interface AddressSuggestion {
  subDistrict: string | string[] | null;
  districtName: string | null;
  provinceName: string | null;
  zipCode: string | null;
}
