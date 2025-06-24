[![npm version](https://badge.fury.io/js/thai-data.svg)](https://badge.fury.io/js/thai-data) [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

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
  getDataForZipCode,
  getSubDistrictNames,
  getDistrictNames,
  getProvinceName,
  getAutoSuggestion,
  getAllData,
} from 'thai-data';

// Get all data for a specific postal code
const addressData = getDataForZipCode('10110');

// Get sub-district names for a postal code
const subDistricts = getSubDistrictNames('10110');

// Get district names for a postal code
const districts = getDistrictNames('10110');

// Get province name for a postal code
const province = getProvinceName('10110');

// Get address suggestions
const suggestion = getAutoSuggestion('10110', 'บางรัก');

// Get all address data
const allData = getAllData();
```

### CommonJS

```javascript
const {
  getDataForZipCode,
  getSubDistrictNames,
  // ... other functions
} = require('thai-data');

const addressData = getDataForZipCode('10110');
console.log(addressData);
```

## API Reference

### `getDataForZipCode(zipCode: string | number): ZipCodeData | null`

Get complete address data for a specific postal code.

### `getSubDistrictNames(zipCode: string | number): string[]`

Get all sub-district names for a given postal code.

### `getDistrictNames(zipCode: string | number): string[]`

Get all district names for a given postal code.

### `getProvinceName(zipCode: string | number): string | null`

Get the province name for a given postal code.

### `getAutoSuggestion(zipCode: string | number, subDistrict?: string): AddressSuggestion`

Get address suggestions based on postal code and optional sub-district.

### `getAllData(): ZipCodeData[]`

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
```

### 2. เรียกดูข้อมูลตามรหัสไปรษณีย์

```javascript
var getDataForZipCode = thai.getDataForZipCode(44130)

console.log(getDataForZipCode)

{ zipCode: '44130',
  subDistrictList:
   [ { subDistrictId: '440608',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'โนนแดง' },
     { subDistrictId: '440619',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'หนองโก' },
     { subDistrictId: '440607',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'โนนราษี' },
     { subDistrictId: '440618',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'หนองสิม' },
     { subDistrictId: '440606',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'กำพี้' },
     { subDistrictId: '440605',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'หนองม่วง' },
     { subDistrictId: '440616',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'ยาง' },
     { subDistrictId: '440604',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'วังไชย' },
     { subDistrictId: '440615',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'วังใหม่' },
     { subDistrictId: '440602',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'บ่อใหญ่' },
     { subDistrictId: '440613',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'หนองคูขาด' },
     { subDistrictId: '440601',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'บรบือ' },
     { subDistrictId: '440611',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'บัวมาศ' },
     { subDistrictId: '441205',
       districtId: '488',
       provinceId: '32',
       subDistrictName: 'ห้วยเตย' },
     { subDistrictId: '440610',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'หนองจิก' },
     { subDistrictId: '441204',
       districtId: '488',
       provinceId: '32',
       subDistrictName: 'หนองแวง' },
     { subDistrictId: '440620',
       districtId: '482',
       provinceId: '32',
       subDistrictName: 'ดอนงัว' },
     { subDistrictId: '441203',
       districtId: '488',
       provinceId: '32',
       subDistrictName: 'เลิงแฝก' },
     { subDistrictId: '441202',
       districtId: '488',
       provinceId: '32',
       subDistrictName: 'นาโพธิ์' },
     { subDistrictId: '441201',
       districtId: '488',
       provinceId: '32',
       subDistrictName: 'กุดรัง' } ],
  districtList:
   [ { districtId: '488', proviceId: '32', districtName: 'กุดรัง' },
     { districtId: '482', proviceId: '32', districtName: 'บรบือ' } ],
  provinceList: [ { provinceId: '32', provinceName: 'มหาสารคาม' } ] }

```

### 3. ข้อหาข้อมูลแบบอัตโนมัติ โดย ใช้รหัสไปรษณีย์ และ ตำบล หรือ ใช้รหัสไปรษณีย์ เพียงอย่างเดียว

#### 3.1 ใช้ รหัสไปรษณีย์เพียงอย่างเดียว

```javascript
var getAutoSuggestion = thai.getAutoSuggestion(44130)

console.log(getAutoSuggestion)

{ subDistrict:
   [ 'โนนแดง',
     'หนองโก',
     'โนนราษี',
     'หนองสิม',
     'กำพี้',
     'หนองม่วง',
     'ยาง',
     'วังไชย',
     'วังใหม่',
     'บ่อใหญ่',
     'หนองคูขาด',
     'บรบือ',
     'บัวมาศ',
     'ห้วยเตย',
     'หนองจิก',
     'หนองแวง',
     'ดอนงัว',
     'เลิงแฝก',
     'นาโพธิ์',
     'กุดรัง' ],
  districtName: null,
  provinceName: 'มหาสารคาม',
  zipCode: 44130 }

```

#### 3.2 ใช้ รหัสไปรษณีย์ และ ตำบล

```javascript
var getAutoSuggestion = thai.getAutoSuggestion(44130, 'เลิงแฝก')

console.log(getAutoSuggestion)

{
  subDistrict: 'เลิงแฝก',
  districtName: 'กุดรัง',
  provinceName: 'มหาสารคาม',
  zipCode: 44130
}

```

### 4. แสดงรายชื่อตำบลทั้งหมด ตามรหัสไปรษณีย์

```javascript
var getSubDistrictNames = thai.getSubDistrictNames(44130);

console.log(getSubDistrictNames)[
  ("โนนแดง",
  "หนองโก",
  "โนนราษี",
  "หนองสิม",
  "กำพี้",
  "หนองม่วง",
  "ยาง",
  "วังไชย",
  "วังใหม่",
  "บ่อใหญ่",
  "หนองคูขาด",
  "บรบือ",
  "บัวมาศ",
  "ห้วยเตย",
  "หนองจิก",
  "หนองแวง",
  "ดอนงัว",
  "เลิงแฝก",
  "นาโพธิ์",
  "กุดรัง")
];
```

### 5. แสดงรายชื่ออำเภอทั้งหมด ตามรหัสไปรษณีย์

```javascript
var getDistrictNames = thai.getDistrictNames(44130);

console.log(getDistrictNames)[("กุดรัง", "บรบือ")];
```

### 6. แสดงชื่อจังหวัด ตามรหัสไปรษณีย์

```javascript
var getProvinceName = thai.getProvinceName(44130);

console.log(getProvinceName);

มหาสารคาม;
```
