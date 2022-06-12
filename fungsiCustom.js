// TODO: import module bila dibutuhkan di sini
const fs = require('fs');

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
  file1 = val;
};
let modifyFile2 = (val) => {
  file2 = val;
};
let modifyFile3 = (val) => {
  file3 = val;
};

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3

// handle untuk mengambil kata kedua dari file yang di baca
const getKataKedua = (kata) => {
  const splitKata = kata.split(' ')

  if (splitKata?.length >= 1) {
    return splitKata[1]
  }
}

// baca data dengan callback fungsi getKataKedua
const prosesData = (dataParsing) => {
  const data = JSON.parse(dataParsing)
  let getKataString = ''

  // case object
  if (data?.message !== undefined) {
    getKataString = data?.message
  }

  // case array
  if (data?.length) {
    data?.forEach(item => {
      
      if (item?.message !== undefined) {
        getKataString = item?.message
      }

      if (item?.data?.message !== undefined) {
        getKataString = item?.data?.message
      }
    })
  }

  return getKataKedua(getKataString)
}


// baca data dengan callback fungsi prosesData
const bacaData = (fnCallback) => {
  const listFile = [file1, file2, file3]
  const result = []

  listFile.forEach(item => {
    const processItem = new Promise((resolve, reject) => {
      fs.readFile(item, (error, data) => {
        // handle bagian eror
        if (error) {
          reject(error)
          return
        }
        // handle bagian sukses
        const getProcessedItem = prosesData(data)
        resolve(getProcessedItem)
      })
    })
    result.push(processItem)
  })

  // memanggil callback result
  Promise.all(result).then(values => {
    fnCallback(null, values)
  }).catch(error => {
    fnCallback(error, null)
  });
}

// ! JANGAN DIMODIFIKASI
module.exports = {
  modifyFile1,
  modifyFile2,
  modifyFile3,
  bacaData,
};
