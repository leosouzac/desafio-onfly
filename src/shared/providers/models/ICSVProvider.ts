/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICSVRead{
  id: string;
  number: string
}

export interface ICSVHeader {
  id: string;
  title: string;
}

export interface ICSVProvider {
  read(
    file_path: string,
    enconding: BufferEncoding,
  ): Promise<any[]>;
   write(
    process_data: any,
    file_path: string,
    header: ICSVHeader[],
    encoding: BufferEncoding,
    count: number,
  ): Promise<void>
}
