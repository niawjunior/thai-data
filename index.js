const data = require("./data.json");
const codes = data.map((item) => item.zipCode);

function getDataForZipCode(zipCode) {
  const zip = String(zipCode);
  return zip && zip.length === 5 && codes.includes(zip)
    ? data.find((item) => item.zipCode === zip)
    : null;
}

function getSubDistrictNames(zipCode) {
  const dataForZipCode = getDataForZipCode(zipCode);
  return dataForZipCode
    ? dataForZipCode.subDistrictList.map((item) => item.subDistrictName)
    : [];
}

function getDistrictNames(zipCode) {
  const dataForZipCode = getDataForZipCode(zipCode);
  return dataForZipCode
    ? dataForZipCode.districtList.map((item) => item.districtName)
    : [];
}

function getProvinceName(zipCode) {
  const dataForZipCode = getDataForZipCode(zipCode);
  return dataForZipCode ? dataForZipCode.provinceList[0].provinceName : null;
}

function getAutoSuggestion(zipCode, subDistrict) {
  const zip = String(zipCode);
  if (!zip || zip.length !== 5 || !codes.includes(zip)) {
    return {
      subDistrict: null,
      districtName: null,
      provinceName: null,
      zipCode: null,
    };
  }

  const dataForZipCode = getDataForZipCode(zipCode);
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

  const { districtId } =
    dataForZipCode.subDistrictList.find(
      (item) => item.subDistrictName === subDistrict
    ) || {};
  const { districtName } =
    dataForZipCode.districtList.find(
      (item) => item.districtId === districtId
    ) || {};

  return {
    subDistrict,
    districtName,
    provinceName: getProvinceName(dataForZipCode.zipCode),
    zipCode: zip,
  };
}

module.exports = {
  getSubDistrictNames,
  getDistrictNames,
  getProvinceName,
  getAllData: () => data,
  getAutoSuggestion,
  getDataForZipCode,
};
