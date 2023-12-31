import { ListData, ListResponse, RundownObject } from './enps-interface'
import { rawRundown1 } from './rundown1'
import { rawRundown2 } from './rundown2'
import { rawRundown3 } from './rundown3'
import { rawRundown4 } from './rundown4'
import { rawRundown5 } from './rundown5'
// require('dotenv').config()

export const password = 'Bitcentral22'
export const userId = 'admin'
export const url = 'http://svrscala-backup/NOMWebServices3API/api'
export const domainName = ''
export const devKey = '376c77cf-4cd2-4de7-ab9e-025285db2045'
export const database = 'svrscala-backup'
export const enpsPath = `P_NASNEWS\W`
export const port = 10242

export var token: string | undefined = undefined
export const updateToken = (newToken: string | undefined) => {
  token = newToken
}

export const host = 'http://localhost:10242'

export const basicContentEg = {
  ENPSDatabase: 'svrscala-backup',
  Path: 'P_NASNEWSWR_9168E304-5BED-4314-AB0589A3AE03A5A9',
  Guid: '665B6E82-2817-415C-AB7F14EE473F452B',
  ContainerTitle: 'THURSDAY JUNE 15 Bahamas Tonight 7PM',
  Title: '7PM HEADLINES-SOT',
  Type: 3,
  Priority: 0,
  Approved: false,
  OutputType: 0,
  Creator: 'J.SAUNDERS',
  ModBy: 'zns.precis1.nassau.mos',
  MosObjId: '',
  MosControl: false,
  ModTime: '2023-06-15T20:50:36Z',
  Expires: '2023-07-15T20:50:36Z',
  Owner: 'J.SAUNDERS',
  BeginText: '  ',
  FileStorageVersion: 0,
}

export const FakeRundownArray = [
  rawRundown1,
  rawRundown2,
  rawRundown3,
  rawRundown4,
  rawRundown5,
]
