import { styled } from '@mui/material/styles'
import {
  ListResponse,
  ObjectProperty,
  RecordsPointer,
  RawRundownData,
  RundownObject,
  RundownListObject,
} from './enps-interface'

const drawerWidth = 240

//CSS Styles for Drawers
export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const isFirstLine = (index: number) => index % 2 === 0

export function isText(data: any): data is string {
  return typeof data === 'string'
}

export const GetCgElement = (rundownArray: RundownObject[], index: number) => {
  var c: string[] = []

  if (rundownArray) {
    const cgElement = rundownArray[index].getCGArray()

    cgElement.forEach((r) => {
      c.push(r)
    })
  }

  return [...c]
}

/** Remove unneccessary objects from Recordpointer */
const FormatObjProps = (src: RecordsPointer) => {
  // Filter ObjectProperties by FieldName
  // We only want PageNum, CG, and Title
  const filteredObjectProperties = src.ObjectProperties.filter(
    (objectProperty) => {
      if (objectProperty) {
        if (objectProperty.FieldName === 'CG') {
          // Formatting the CG FieldValues into an array that we can use in our UI
          // Step 1 - Setup string values
          let cg = ''
          if (objectProperty.FieldValue)
            cg = objectProperty.FieldValue.toString()
          else
            throw console.error(
              `FieldValue of 'objectProperty' is null. Reference method: FormatObjProps`
            )

          // Step 2 - Format string
          cg = cg.replace(/:NASNEWS L3rd/g, '►')
          cg = cg.replace(/[\\\r\n]/g, '►') // Replace "\" and escape characters with "►"
          const newCg = cg.split('►') // Split the string into an array of strings

          // Take out any empty strings
          const cgValues = newCg.filter((c) => {
            return /\S/.test(c)
          })

          // Typescript check to ensure no bugs.
          // May eventually need to add to update for other types
          if (typeof objectProperty.FieldValue === 'string') {
            objectProperty.FieldValue = cgValues
          }

          return objectProperty
        } else if (objectProperty.FieldName === 'PageNum') return objectProperty
        else if (objectProperty.FieldName === 'Title') return objectProperty
        // else if (objectProperty.FieldName === 'MOSObjSlugs') return objectProperty}
      } else
        throw console.error('No object found! Reference method: FormatObjProps')
    }
  )

  // Returning only ObjectProperties for now. Not much else is needed right now
  return filteredObjectProperties
}

export const FormatConvertedObject = (src: ObjectProperty[]): RundownObject => {
  var convertedObject = new RundownObject('', ['', ''], '')

  src.forEach((val) => {
    if (val.FieldName === 'CG') {
      // If FieldvVlue is a string
      if (typeof val.FieldValue === 'string') {
        // Setup an empty array of 2 items
        let c = [' ', ' ']

        // Type checks --
        // If FieldValue is empty
        if (!val.FieldValue) {
          // Create an empty array consisting of 2 items
          convertedObject[val.FieldName] = c

          // Since it's a string we know it won't have other values
          // So add field value and add another empty string in the second slot
        } else {
          convertedObject[val.FieldName] = [val.FieldValue, ' ']
        }
        //Now we check if FieldValue is an Array
      } else if (Array.isArray(val.FieldValue)) {
        let c = [' ', ' ']

        // If empty
        if (!val.FieldValue) {
          // Do the same as before
          convertedObject[val.FieldName] = c
        } else if (!val.FieldValue[1]) {
          // If the second value of FieldValue is empty
          // Replace it with an empty string
          c = [val.FieldValue[0], ' ']
          convertedObject[val.FieldName] = c
        } else {
          // Else we just send in whatever's in the array
          convertedObject[val.FieldName] = val.FieldValue
        }
      }

      // For the rest it's just a simple type check as we only expect strings for the FieldValue
    } else if (val.FieldName === 'Title') {
      if (typeof val.FieldValue === 'string')
        convertedObject[val.FieldName] = val.FieldValue
    } else if (val.FieldName === 'PageNum') {
      if (typeof val.FieldValue === 'string')
        convertedObject[val.FieldName] = val.FieldValue
    }
  })

  return convertedObject
}

export const FormatRundownObjects = (record: ObjectProperty[]) => {
  //Another runthrough, this time we create an array of objects tailored how we want to use them.
  if (record) {
    var cg: string[] = []
    var title = ''
    var pageNum = ''
    // let mosObjSlug = string

    //Iterate through the BasicContent Array, assigning FieldValues to the declared objects above.
    // I have to format the strings before doing this
    record.forEach((r) => {
      if (r.FieldName === 'CG') {
        if (typeof r.FieldValue === 'string') {
          cg = [r.FieldValue, ' ']
        } else if (Array.isArray(r.FieldValue)) {
          cg = [...r.FieldValue]
        }
      }
      if (r.FieldName === 'PageNum')
        if (typeof r.FieldValue === 'string') {
          pageNum = r.FieldValue
        }
      if (r.FieldName === 'Title')
        if (typeof r.FieldValue === 'string') {
          title = r.FieldValue
        }
      // if (r.FieldName === 'MOSObjSlugs') mosObjSlug = r.FieldValue
    }) //Seems like a good use of Array.map() and Array.forEach()

    //The object we will now pass to our new map.
    const obj = new RundownObject(pageNum, cg, title)

    return obj
  } else
    throw console.error(
      'No records found! Reference method FormatRundownObjects'
    )
}

const SepearateCGArray = (objArray: RundownObject[]) => {
  const newCgObjArrays: RundownObject[] = []

  // Iterate through the Object Array
  objArray.forEach((obj) => {
    //Objects with CG string Array Property with a length greater than 2 are reformatted.
    if (obj.CG.length > 2) {
      const cg = obj.CG

      //Only 2 Lines per CG prop. The rest will be split off into their own Object Array
      let firstLine: string
      let secondLine: string

      // Iterate through CG string Array.
      cg.forEach((c, index) => {
        if (isFirstLine(index)) {
          if (c) {
            firstLine = c
          } else {
            firstLine = ' '
          }
        } else {
          if (c) {
            secondLine = c
          } else {
            secondLine = ' '
          }

          const newObject = new RundownObject(
            obj.PageNum,
            [firstLine, secondLine],
            obj.Title
            // MOSObjSlugs: obj.MOSObjSlug,
          )

          // These new arrays are pushed to the main array
          newCgObjArrays.push(newObject)
        }
      })
    } else {
      // Any CG arrays with less than 2 strings, Return the object as is.
      newCgObjArrays.push(obj)
    }
  })
  return newCgObjArrays
}

export const ParseRundown = (rundown: RawRundownData) => {
  const rundownData: RundownObject[] = []
  if (rundown) {
    //Contents of the Rundown
    const { CollectionScripts: collectionScripts } = rundown

    if (collectionScripts) {
      // Doing the same thing as Lists. Breaking it down into something we can manage.
      const recordsPointerArray = collectionScripts.map((scripts) => {
        const recordPointer = scripts.RecordPointer

        return recordPointer
      })

      if (recordsPointerArray) {
        //We want to create a new array with only the ObjectProperties Array.
        //These are all we may need for the UI.
        const rundownObjects = recordsPointerArray.map((record) => {
          const output = FormatObjProps(record)
          const convertedOutput = FormatConvertedObject(output)

          // console.log('Filtered Output: ', output)
          // console.log('New Rundown Array: ', convertedOutput)

          return convertedOutput
        })

        // console.log('Rundown Records: ', rundownObjects)

        // A function that sepeartes CG arrays into objects with the same properties but only 2 CG entries
        const finalRundown = SepearateCGArray(rundownObjects)

        rundownData.push(...finalRundown)
      } else
        throw console.error(
          'No data found in RecordPointer! Reference method ParseRundown.'
        )
    } else
      throw console.error(
        'No data found in CollectionScripts! Reference method ParseRundown!'
      )
  } else
    throw console.error(
      'No data found in rundown! Reference method ParseRundown!'
    )

  return rundownData
}

/** Retrieve the rundown based on the ID provided via url parameters */
export const GetRundown = (
  guid: string | undefined,
  rawRundowns: RawRundownData[]
) => {
  if (guid) {
    const selectedRundown = rawRundowns.find((r) => {
      return r.ListData.Guid === guid
    })

    if (selectedRundown) {
      const r = ParseRundown(selectedRundown)
      // console.log('Selected Rundown: ', selectedRundown)
      return r
    } else throw console.error('Selected Rundown not found.')
  } else throw console.error('No guid found. Referemce method GetRundown')
}

export const GetGuidFromLists = (list: ListResponse) => {
  var guidArray: string[] = []
  if (list) {
    const { Records: records } = list

    //Iterate through this list and only save record indexes that have MOSControl: true
    const newRecordsList = records.filter((record) => {
      return record.ListData.MosControl === true // Create new array of only "MoSControl: active" rundowns
    })

    //Send ListData object of each entry into the active rundowns array
    const activeRundowns = newRecordsList.map((record) => {
      const listData = record.ListData
      return listData
    })

    //Grabbing Guids from the active rundowns
    const a = activeRundowns.map((listDataProperty) => {
      const guid: string = listDataProperty.Guid
      return guid
    })

    guidArray.push(...a)
  }

  return guidArray
}

/** Extract all the ListData objects, whose mosControl variable is true, from Records[] of the ListResponse */
export const ParseListResponse = (listResponse: ListResponse) => {
  const activeRundowns = listResponse.Records.filter((r) => {
    return r.ListData.MosControl === true
  })

  const activeListMap = activeRundowns.map((r) => {
    const map = r.ListData
    return map
  })
  return activeListMap
}

// /** After extracting what data we need from ListResponse, We extract all the Rundown Titles for the HomePage */
export const RetrieveActiveRundowns = (
  listResponse: ListResponse
): RundownListObject[] => {
  const listData = ParseListResponse(listResponse)

  const rundownList = listData.map((r, i) => {
    const listMap: RundownListObject = {
      RundownName: r.Title,
      Guid: r.Guid,
      IsMosActive: r.MosControl,
      Index: i,
    }
    return listMap
  })

  const activeRundownList = rundownList.filter((r) => {
    return r.IsMosActive
  })

  return activeRundownList
}
