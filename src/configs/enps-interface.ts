/** This file contains interfaces for the raw data coming from ENPS,
 *  With the exception of RundownObject
 */

export interface LogonResponse {
  ActiveMac: boolean
  SessionID: string
  CentralServer: string
  ClientFileVersion: string
  ClientVersion: string
  ClientFileVersion7: string
  ClientVersion7: string
  HomeDatabase: string
  HomeIP: string
  HomeProgram: string
  Monitor: boolean
  Printers: null
  PrivateChannels: any[]
  ServerManager: boolean
  Supervisor: boolean
  UserName: string
  Expires: string
}

interface _Groups {
  Description: string
  ID: string
  Server: string
}

interface _Servers {
  Description: string
  ServerGroup: string
  ServerID: string
}

interface _Staff {
  GivenName: string
  Program: string
  Supervisor: boolean
  Surname: string
  UserID: string
}

export interface GlobalTablesResponse {
  _Groups: _Groups[]
  _Servers: _Servers[]
  _Staff: _Staff[]
}

/** Our raw rundown data grabbed from the server */
export interface RawRundownData {
  TimingObj: {}
  CollectionScripts: CollectionScripts[]
  UpdatesSuspended: boolean | null
  SuspendRowFlashing: boolean | null
  HasPendingChanges: boolean | null
  OnAir: boolean
  LTTRecording: boolean
  TimeFormat: number | null
  DefaultLayout: {}
  Loading: boolean
  ObjectProperties: ObjectProperty[]
  ListData: ListData
  ObjectLinks: {}
  SocialMediaLinks: any[]
  ObjectTags: {}
  ChatData: any[]
  IsSearchReturnedResult: boolean
}

/** Response Data retrieved from List POST request 'postLists" */
export interface ListResponse {
  Records: Record[]
}

export interface Record {
  TimingObj: any
  CollectionScripts: CollectionScripts[] | null
  UpdatesSuspended: boolean | null
  SuspendRowFlashing: boolean | null
  HasPendingChanges: boolean | null
  OnAir: boolean
  LTTRecording: boolean
  TimeFormat: number
  DefaultLayout: any
  Loading: boolean
  ObjectProperties: ObjectProperty[]
  ListData: ListData
  ObjectLinks: {}
  SocialMediaLinks: any[]
  ObjectTags: {}
  ChatData: any[]
  IsSearchReturnedResult: boolean
}

/** ListData Object that is extracted from the
 * Records array in the ListResponse */
export interface ListData {
  ENPSDatabase: string
  Path: string
  Guid: string
  ContainerTitle: string | null
  Title: string
  Type: number | null
  Priority: number | null
  Approved: boolean
  OutputType: number | null
  Creator: string | null
  ModBy: string | null
  MosObjId: string | null
  MosControl: boolean
  ModTime: string | null
  Expires: string | null
  Owner: string | null
  BeginText: string | null
  FileStorageVersion: number | null
}

/** Collectionscript data - where we find out rundown data
 *  contains all story and rundown data found in the main ENPS UI
 */
export interface CollectionScripts {
  CollectionsCollection: any
  ScriptOrder: number | null
  PageNum: string | null
  FrontTime: string | null
  FrontTimeFormatted: string | null
  BackTime: string | null
  BackTimeFormatted: string | null
  FrontOverUnder: string | null
  BackOverUnder: string | null
  CumeTime: string | null
  CumeTimeFormatted: string | null
  BackCumeTime: string | null
  BackCumeTimeFormatted: string | null
  IsTimingBarSelected: boolean
  IsRowFlashing: boolean
  IsFrozen: boolean
  RecordPointer: RecordsPointer
  Float: boolean
  Break: boolean
  HasYellowTimingBar: boolean
  CBreak: boolean
  NotForBroadcast: boolean
}

/** An object found within Collectionscripts */
export interface RecordsPointer {
  ReadTime: number | null
  Actual: string | null
  Estimated: string | null
  HardHitFront: string | null
  HardHitBack: string | null
  ActualTimeString: {} | null
  DefaultLayout: {} | null
  Loading: false
  ObjectProperties: ObjectProperty[]
  ListData: ListData | null
  ObjectLinks: {}
  SocialMediaLinks: []
  ObjectTags: {}
  ChatData: []
  IsSearchReturnedResult: boolean
}

/** Our raw, usable data in its simplest form.
 *  Typically comes in the format seen below --
 *  FieldName: string -
 *  FieldValue: string | number | boolean | {} | []
 */
export interface ObjectProperty {
  FieldName: string
  FieldValue: any
}

export class ObjectProperty {
  FieldName: string
  FieldValue: any

  constructor(fieldName: string, fieldValue: any) {
    this.FieldName = fieldName
    this.FieldValue = fieldValue
  }
}

export interface BasicContentResponse {
  ChatData: any
  DefaultLayout: null
  IsSearchReturnedResult: boolean
  ListData: ListData
  Loading: false
  ObjectLinks: {}
  ObjectProperties: ObjectProperty[]
  SocialMediaLinks: any
}
/** Non-ENPS, Custom Interfaces */

/** The object used for our rundown UI
 */
export interface RundownObject {
  PageNum: string
  CG: string[]
  Title: string
}

export interface RundownListObject {
  RundownName: string | null
  Guid: string | null
  IsMosActive: boolean
  Index: number
}

export class RundownObject {
  PageNum: string
  CG: string[]
  Title: string

  constructor(pageNum: string, cg: string[], title: string) {
    this.PageNum = pageNum
    this.CG = cg
    this.Title = title
  }

  setPageNum(str: string): void {
    this.PageNum = str
  }

  setCGArray(str: string[]): void {
    this.CG.push(...str)
  }

  setTitle(str: string): void {
    this.PageNum = str
  }

  getCGArray(): string[] {
    return [...this.CG]
  }
}
