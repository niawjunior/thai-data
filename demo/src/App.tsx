import "./App.css";
import React, { useState, useEffect } from "react";
import thaiData from "thai-data";

interface SubDistrictOption {
  value: string;
  label: string;
  districtName: string;
}

// Define types for the thai-data package
type AddressSuggestion = {
  subDistrict: string | string[] | null;
  districtName: string | null;
  provinceName: string | null;
  zipCode: string | null;
};

type ZipCodeData = {
  zipCode: string;
  provinceList: Array<{ provinceName: string }>;
  districtList: Array<{ districtId: string; districtName: string }>;
  subDistrictList: Array<{ subDistrictName: string; districtId: string }>;
};

interface RawAddressData {
  zipCode: string;
  subDistrict: string;
  district: string | null;
  province: string | null;
  rawSuggestion: AddressSuggestion;
  rawAddressData: ZipCodeData | null;
}

const App = () => {
  const [zipCode, setZipCode] = useState("");
  const [subDistrictOptions, setSubDistrictOptions] = useState<
    SubDistrictOption[]
  >([]);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [isSubDistrictDisabled, setIsSubDistrictDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [rawData, setRawData] = useState<RawAddressData | null>(null);

  // Update sub-district options when zip code changes
  useEffect(() => {
    const fetchSubDistricts = async () => {
      if (zipCode.length === 5) {
        setIsLoading(true);
        try {
          const subDistricts = thaiData.getSubDistrictNames(zipCode);
          if (subDistricts && subDistricts.length > 0) {
            const options = subDistricts.map((subDistrict: string) => {
              const suggestion = thaiData.getAutoSuggestion(
                zipCode,
                subDistrict
              );
              return {
                value: subDistrict,
                label: subDistrict,
                districtName: suggestion.districtName || "",
              };
            });
            setSubDistrictOptions(options);
            setIsSubDistrictDisabled(false);
          } else {
            setSubDistrictOptions([]);
            setIsSubDistrictDisabled(true);
          }
        } catch (error) {
          console.error("Error fetching sub-districts:", error);
          setSubDistrictOptions([]);
          setIsSubDistrictDisabled(true);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSubDistrictOptions([]);
        setIsSubDistrictDisabled(true);
        setSelectedSubDistrict("");
        setDistrict("");
        setProvince("");
      }
    };

    fetchSubDistricts();
  }, [zipCode]);

  // Update district and province when sub-district is selected
  const handleSubDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subDistrict = e.target.value;
    setSelectedSubDistrict(subDistrict);

    if (subDistrict && zipCode) {
      const suggestion = thaiData.getAutoSuggestion(zipCode, subDistrict);
      setDistrict(suggestion.districtName || "");
      setProvince(suggestion.provinceName || "");

      // Get and set the raw data for display
      const addressData =
        thaiData
          .getAllData()
          .find((data: ZipCodeData) => data.zipCode === zipCode) || null;
      setRawData({
        zipCode,
        subDistrict,
        district: suggestion.districtName || null,
        province: suggestion.provinceName || null,
        rawSuggestion: suggestion,
        rawAddressData: addressData,
      });
    } else {
      setDistrict("");
      setProvince("");
      setRawData(null);
    }
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setZipCode(value);
      if (value.length !== 5) {
        setSelectedSubDistrict("");
        setDistrict("");
        setProvince("");
      }
    }
  };

  return (
    <div>
      <div className=" antialiased text-gray-900 items-center">
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">
                ฟอร์ม สำหรับกรอก รหัสไปรษณีย์, ตำบล, อำเภอ และ จังหวัด
                ในประเทศไทย
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-4">
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="w-full">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="zipCode"
                  >
                    รหัสไปรษณีย์ *
                  </label>
                  <input
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    className="shadow appearance-none border border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                    id="zipCode"
                    type="text"
                    placeholder="รหัสไปรษณีย์"
                    maxLength={5}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="w-full">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="subDistrict"
                  >
                    ตำบล/แขวง *
                  </label>
                  <div className="relative">
                    <select
                      onChange={handleSubDistrictChange}
                      value={selectedSubDistrict}
                      disabled={isSubDistrictDisabled}
                      className={`block shadow appearance-none w-full border border-gray-200 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        isSubDistrictDisabled
                          ? "bg-gray-100 text-gray-500"
                          : "bg-white text-gray-700"
                      }`}
                      id="subDistrict"
                    >
                      <option value="">
                        {isLoading ? "Loading..." : "เลือก ตำบล/แขวง"}
                      </option>
                      {subDistrictOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="w-full">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="district"
                  >
                    อำเภอ/เขต *
                  </label>
                  <input
                    value={district}
                    readOnly
                    className="bg-gray-100 shadow appearance-none border border-gray-200 block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="district"
                    type="text"
                    placeholder="เลือก อำเภอ/เขต"
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="lg:col-span-6 md:col-span-6 sm:col-span-12 col-span-12">
            <div className="w-full">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="province"
                  >
                    จังหวัด *
                  </label>
                  <input
                    value={province}
                    readOnly
                    className="bg-gray-100 shadow appearance-none border border-gray-200 block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="province"
                    type="text"
                    placeholder="เลือก จังหวัด"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {rawData && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Raw Data:</h2>
            <pre className="bg-white p-4 rounded overflow-auto text-xs max-h-[200px] ">
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Raw Data Display */}

      <h1 className="text-center text-blue-500 mt-8">
        <a
          rel="noopener noreferrer"
          href="https://facebook.com/JSKhamKham/"
          target="_blank"
        >
          Made by JS ขำๆ
        </a>
      </h1>
    </div>
  );
};

export default App;
