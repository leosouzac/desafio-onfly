import fs from 'fs';

export async function saveBase64AsPNG(base64String: string, filePath: string) {
  const data = base64String.replace(/^data:image\/\w+;base64,/, '');

  const binaryData = Buffer.from(data, 'base64');

  await fs.promises.writeFile(filePath, binaryData, 'binary');
}
