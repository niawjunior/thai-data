[![npm version](https://badge.fury.io/js/thai-data.svg)](https://badge.fury.io/js/thai-data)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![codecov](https://codecov.io/gh/niawjunior/thai-data/graph/badge.svg?token=5KF7CZOCTI)](https://codecov.io/gh/niawjunior/thai-data)

# Thai Address Data

A TypeScript/JavaScript library providing Thailand's address data including districts, sub-districts, and provinces with postal code reference.

## Features

- 📦 **TypeScript Support**: Full type definitions included
- 🚀 **ES Modules & CommonJS**: Works with both `import` and `require`
- 🔍 **Multiple Query Methods**: Search by postal code, district, sub-district, etc.
- 📏 **Lightweight**: Only includes essential data
- 🛠 **Well-Tested**: Comprehensive test coverage

## Installation

```bash
npm install thai-data
# or
yarn add thai-data
```

## Usage

### TypeScript / ES Modules

```typescript
import {
  getAddressByZipCode,
  getSubdistrictsByZipCode,
  getDistrictsByZipCode,
  getProvinceByZipCode,
  getAddressSuggestions,
  getAllAddressData,
} from "thai-data";

// Get all data for a specific postal code
const addressData = getAddressByZipCode("10110");

// Get sub-district names for a postal code
const subDistricts = getSubdistrictsByZipCode("10110");

// Get district names for a postal code
const districts = getDistrictsByZipCode("10110");

// Get province name for a postal code
const province = getProvinceByZipCode("10110");

// Get address suggestions
const suggestion = getAddressSuggestions("10110", "บางรัก");

// Get all address data
const allData = getAllAddressData();
```

### CommonJS

```javascript
const {
  getAddressByZipCode,
  getSubdistrictsByZipCode,
  getDistrictsByZipCode,
  getProvinceByZipCode,
  getAddressSuggestions,
  getAllAddressData,
} = require("thai-data");

const addressData = getAddressByZipCode("10110");
console.log(addressData);
```

## API Reference

### `getAddressByZipCode(zipCode: string | number): ZipCodeData | null`

Get complete address data for a specific postal code.

### `getSubdistrictsByZipCode(zipCode: string | number): string[]`

Get all sub-district names for a given postal code.

### `getDistrictsByZipCode(zipCode: string | number): string[]`

Get all district names for a given postal code.

### `getProvinceByZipCode(zipCode: string | number): string | null`

Get the province name for a given postal code.

### `getAddressSuggestions(zipCode: string | number, subDistrict?: string): AddressSuggestion`

Get address suggestions based on postal code and optional sub-district.

### `getAllAddressData(): ZipCodeData[]`

Get all address data.

## Type Definitions

```typescript
interface SubDistrict {
  subDistrictId: string;
  districtId: string;
  provinceId: string;
  subDistrictName: string;
}

interface District {
  districtId: string;
  proviceId: string;
  districtName: string;
}

interface Province {
  provinceId: string;
  provinceName: string;
}

interface ZipCodeData {
  zipCode: string;
  subDistrictList: SubDistrict[];
  districtList: District[];
  provinceList: Province[];
}

interface AddressSuggestion {
  subDistrict: string | string[] | null;
  districtName: string | null;
  provinceName: string | null;
  zipCode: string | null;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup

1. Fork the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make your changes
4. Run tests:
   ```bash
   npm test
   ```
5. Submit a pull request

## License

ISC © [Niaw Junior](https://github.com/niawjunior)

## Examples

### Get Address by Zip Code

```typescript
import { getAddressByZipCode } from 'thai-data';

const addressData = getAddressByZipCode('10110');

console.log(addressData);
{
  zipCode: '10110',
  subDistrictList: [
    { subDistrictId: '100101', districtId: '1001', provinceId: '10', subDistrictName: 'พระบรมมหาราชวัง' },
    // ... more sub-districts
  ],
  districtList: [
    { districtId: '1001', provinceId: '10', districtName: 'พระนคร' },
    // ... more districts
  ],
  provinceList: [
    { provinceId: '10', provinceName: 'กรุงเทพมหานคร' }
  ]
}
```

### Get Address Suggestions

```typescript
import { getAddressSuggestions } from 'thai-data';

// Get suggestions with just zip code
const suggestions = getAddressSuggestions('10110');
console.log(suggestions);
{
  subDistrict: [...], // Array of all sub-districts for this zip code
  districtName: '...', // Single district name if only one exists
  provinceName: '...', // Province name
  zipCode: '10110'
}

// Get suggestions with zip code and sub-district filter
const filteredSuggestions = getAddressSuggestions('10110', 'บางรัก');
console.log(filteredSuggestions);
{
  subDistrict: 'บางรัก', // Matching sub-district name
  districtName: 'บางรัก', // District name
  provinceName: 'กรุงเทพมหานคร', // Province name
  zipCode: '10500' // Matching zip code
}
```

### Get All Address Data

```typescript
import { getAllAddressData } from "thai-data";

const allAddresses = getAllAddressData();
console.log(`Total zip codes: ${allAddresses.length}`);
// Output: Total zip codes: [number of zip codes]
```

```

```
