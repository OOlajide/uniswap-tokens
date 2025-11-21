import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

export async function loadCsvData(filename: string) {
  const filePath = path.join(process.cwd(), 'public', 'data', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return new Promise<any[]>((resolve, reject) => {
    Papa.parse(fileContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
}
