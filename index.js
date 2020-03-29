var data = require('./data.json')

var code = data.map(function(item) {
  return item.zipCode
})

function subDistrictName(zipCode) {
  var zip = String(zipCode)
  if (zip && zip.length == 5 && code.includes(zip)) {
    var result = data.find(function(item) {
       return item.zipCode === zip
    }).subDistrictList.map(function(item) {
      return item.subDistrictName
    })
    return result
  } else {
    return []
  }
}

function districtName(zipCode) {
  var zip = String(zipCode)
  if (zip && zip.length == 5 && code.includes(zip)) {
    var result = data.find(function(item) {
       return item.zipCode === zip
    }).districtList.map(function(item) {
        return item.districtName
    })
    return result
  } else {
    return []
  }
}

function provinceName(zipCode) {
  var zip = String(zipCode)

  if (zip && zip.length == 5 && code.includes(zip)) {
    var result = data.find(function(item) {
       return item.zipCode === zip
    }).provinceList[0].provinceName
    return result
  } else {
    return null
  }
}

function allField(zipCode) {
  var zip = String(zipCode)
  if (zip && zip.length == 5 && code.includes(zip)) {
    var result = data.find(function(item) {
       return item.zipCode === zip
    })
    return result
  } else {
    return []
  }
}

function autoSuggestion(zipCode, subDistrict) {
  var zip = String(zipCode)
  if (zip && zip.length == 5 && !subDistrict && code.includes(zip)) {
    var allData = allField(zipCode).subDistrictList.map(function(item) {
      return item.subDistrictName
    })
    return {
      subDistrict: allData,
      districtName: null,
      provinceName: provinceName(zipCode),
      zipCode: zipCode 
    }
  } else if (zip && zip.length == 5 && subDistrict) {
    var allData = allField(zipCode)
    var districtId = (allData.subDistrictList.find(function(item) {
      return item.subDistrictName === subDistrict
    }) || []).districtId

    var districtName = (allData.districtList.find(function(item) {
      return item.districtId === districtId
    }) || []).districtName

    return {
      subDistrict: subDistrict,
      districtName: districtName,
      provinceName: provinceName(allData.zipCode),
      zipCode: zipCode 
    }
  } else {
    return {
      subDistrict: null,
      districtName: null,
      provinceName: null,
      zipCode: null 
    }
  }
}

function allData() {
  return data
}

module.exports = {
  subDistrictName,
  districtName,
  provinceName,
  allField,
  allData,
  autoSuggestion 
}