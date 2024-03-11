/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import csvParser from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';
import { ICSVHeader, ICSVProvider, ICSVRead } from '../models/ICSVProvider';

export class CSVProvider implements ICSVProvider {
  async read(
    file_path: string,
    encoding: BufferEncoding,
  ): Promise<any[]> {
    const results = [];

    const csvData = fs
      .createReadStream(file_path, { encoding })
      .pipe(csvParser());

    for await (const record of csvData) {
      results.push(record);
    }

    return results;
  }

  async write(
    data: any,
    file_path: string,
    header: ICSVHeader[],
    encoding: BufferEncoding,
    count: number,
  ): Promise<void> {
    const csvWriter = count > 0
      ? createObjectCsvWriter({
        path: file_path,
        header,
        fieldDelimiter: ';',
        encoding,
        append: true,
      })
      : createObjectCsvWriter({
        path: file_path,
        header,
        fieldDelimiter: ';',
        encoding,
      });

    await csvWriter.writeRecords([data]);
  }
}
