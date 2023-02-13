import * as fs from 'fs'

export async function parseFoodDb({
  dbPath,
}: {
  dbPath: string;
}): Promise<any> {
  const json = await fs.promises.readFile(dbPath, 'utf8')
  const data = JSON.parse(json)
  return data
}
