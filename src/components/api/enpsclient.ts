import { getBasicContent } from './basiccontent'
import { getGlobalTables } from './globaltables'
import { postLists } from './lists'
import { logoff } from './logoff'
import { logon } from './logon'
import { ping } from './ping'
import { getRundownContent } from './rundown'

const getList = (path: string) => postLists(path)
const getRundown = (guid: string) => getRundownContent(guid)
const getBasContent = (guid: string, enpsPath: string, path: string) =>
  getBasicContent(guid, enpsPath, path)

export interface ENPSClientRequest {
  ClientLogin: typeof logon
  Ping: typeof ping
  Logoff: typeof logoff
  GetLists: typeof getList
  GetRundown: typeof getRundown
  GetGlobalTables: typeof getGlobalTables
  GetBasicContent: typeof getBasContent
}

// class ObjectProperty {
//   FieldName: string
//   FieldValue: any[]

//   constructor(fieldName: string, fieldValue: any[]) {
//     this.FieldName = fieldName
//     this.FieldValue = fieldValue
//   }
// }
