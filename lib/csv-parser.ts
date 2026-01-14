import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function parseCSV<T>(filename: string): Promise<T[]> {
    const filePath = path.join(DATA_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return new Promise((resolve, reject) => {
        Papa.parse(fileContent, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error(`Errors parsing ${filename}:`, results.errors);
                }
                resolve(results.data as T[]);
            },
            error: (error: Error) => reject(error),
        });
    });
}
