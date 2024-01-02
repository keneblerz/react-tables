import { useState, useEffect, useMemo } from 'react'
import { Main, RetrieveActiveRundowns } from '../../configs/utilities'
import { listResponse } from '../../configs/lists'
import RundownList from '../rundown/RundownList'
import { RundownListObject } from '../../configs/enps-interface'
import { Container, Toolbar } from '@mui/material'

const RunList = () => {
  //Grab our list from the server
  const updatedList: RundownListObject[] = useMemo(
    () => RetrieveActiveRundowns(listResponse),
    []
  )

  //List should truncate every rundown that isn't MosActive.

  // That truncated list will be initialized with listObjects
  const [listObjects, setListObjects] = useState((): RundownListObject[] => {
    return updatedList
  })

  //Initialize listItem
  // const [listItem, setListItem] = useState(() => {
  //   const o: RundownListObject = {
  //     RundownName: '',
  //     Guid: '',
  //     IsMosActive: false,
  //     Index: 0,
  //   }
  //   return o
  // })

  // //I don't think i need this anymore...
  // function handleRowClick(event: MouseEvent<HTMLAnchorElement>) {
  //   const target = event.target as HTMLAnchorElement
  //   const id: number = Number(target.id)

  //   if (id >= 0) {
  //     setListItem(() => {
  //       const o = updatedList[id]
  //       return o
  //     })

  //     /** Grab guid number and retrieve rundown */
  //   } else {
  //     console.log('ID Undefined')
  //   }
  // }

  useEffect(() => {
    try {
      if (listObjects) {
        setListObjects(updatedList)
      }
    } catch (error) {
      console.error('ServiceHandler error: ', error)
    }
  }, [listObjects, updatedList])

  return (
    <Main>
      <Toolbar />
      <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
        <RundownList rundownList={listObjects} />
      </Container>
    </Main>
  )
}

export default RunList

//
