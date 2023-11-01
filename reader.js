//токен "6333961639:AAGg7ClRB50AA7VQaO12Nd90je-KAS3xuTE"
const XLSX = require('xlsx');

const workbook = XLSX.readFile('./excelTAB/sNBo22-nov.xlsx');


const currentDate = new Date();

const year = currentDate.getFullYear().toString().slice(2);
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

const searchText = `${day}.${month}.${year}`;

let cellFound = false;
let foundCellAddress;
let pairsArray = [];

const pairValueK = [];
const pairValueTK = [];


for (const sheetName of workbook.SheetNames) {
  const worksheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(worksheet['!ref']);

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
    for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      const cell = worksheet[cellAddress];

      if (cell && cell.v !== undefined && typeof cell.v === 'string') {
        const cellValue = cell.v;
        const regex = new RegExp(searchText, 'i');

        if (regex.test(cellValue)) {
          cellFound = true;
          foundCellAddress = cellAddress;
          
          const lastcol = rowIndex + 6;

          for (let i = rowIndex; i < lastcol; i++) {
            //Лекция сегодня и время сегодня координаты по х
            const lectia = colIndex + 2;
            const timel = colIndex + 1;
            //Лекция сегодня и время сегодня координаты точные
            const less = XLSX.utils.encode_cell({ r: i, c: lectia });
            const timelectia = XLSX.utils.encode_cell({ r: i, c: timel });
            //По У координаты завтрашних
            const tomorow = i+6;
            //Лекция завтра точные координаты
            const lessT = XLSX.utils.encode_cell({ r: tomorow, c: lectia });
            const timelectiaT = XLSX.utils.encode_cell({ r: tomorow, c: timel });
            
            const cell = worksheet[less];
            const cellValue = cell && cell.v ? cell.v : '1';  

            const timing = worksheet[timelectia];
            const timeif = timing && timing.v ? timing.v : '1';    

            const cellT = worksheet[lessT];
            const cellValueT = cellT && cellT.v ? cellT.v : '1'; 
            
            const timingT = worksheet[timelectiaT];
            const timeifT = timingT && timingT.v ? timingT.v : '1';    
        
            if(cellValueT == 1){
            }else{
              const pairValueTString = `${timeifT}: ${cellValueT}`;
              const cleanedPairValueT = pairValueTString.replace(/[\r\n]+/g, ''); // Очистка от \r\n
              pairValueTK.push(cleanedPairValueT);
            };
            if(cellValue == 1){
                
            }else{
                const pairValueString = `${timeif}: ${cellValue}`;
                const cleanedPairValue = pairValueString.replace(/[\r\n]+/g, '');
                pairValueK.push(cleanedPairValue);
            };
          };
          break;
        }
      }
    }

    if (cellFound) {
      break;
    }
  }

  if (cellFound) {
    break;
  }
}

module.exports = { pairValueK, pairValueTK};
