import { useState, useEffect, MouseEvent, useMemo } from 'react'
import Rundown from '../rundown/Rundown'
import { FakeRundownArray } from '../../configs/constants'
import { GetCgElement, GetRundown, Main } from '../../configs/utilities'
import { RundownObject } from '../../configs/enps-interface'
import { useParams } from 'react-router-dom'
import { Container, Toolbar } from '@mui/material'

export const TitlerService = () => {
  const { guid } = useParams()
  const selectedRundown: RundownObject[] = useMemo(
    () => GetRundown(guid, FakeRundownArray),
    [guid]
  )
  const [rundownData, setRundownData] = useState(() => {
    return selectedRundown
  })
  const [cgTitle, setCgTitle] = useState(['', ''])

  /*  So for this, since we're not using REST API, we're using a hard coded set of rundowns. This
      will only be used in this example that does not use the backend. */

  // var selectedRundown: RundownObject[] = []
  // var someGuid = ''
  // if (guid) {
  //   someGuid = guid
  // }

  /***********************************************************************************/

  function handleRowClick(event: MouseEvent<HTMLTableRowElement>) {
    const id: number = Number((event.target as HTMLTableRowElement).id)

    console.log('Event Table Target ID: ', id)
    if (id >= 0) {
      if (rundownData) {
        setCgTitle(() => {
          const array = GetCgElement(rundownData, id)
          return [...array]
        })
      }
    } else if (typeof id === 'string') {
      console.log('ID Undefined')
    } else {
      console.log('ID Undefined')
    }

    event.preventDefault()
  }

  function playOnClick(event: MouseEvent<HTMLButtonElement>) {
    const playTarget = event.target as HTMLButtonElement

    console.log('Play Button ID: ', playTarget)
    event.preventDefault()
  }

  /***********************************************************************************/

  useEffect(() => {
    try {
      if (rundownData) {
        setRundownData(selectedRundown)
      }
    } catch (error) {
      console.error('ServiceHandler error')
      console.error(error)
    }
  }, [rundownData, selectedRundown])

  return (
    <Main>
      <Toolbar />
      <Container maxWidth={false} sx={{ mt: '1em', mb: `1em` }}>
        <Rundown
          rundown={rundownData}
          rowOnClick={handleRowClick}
          playOnClick={playOnClick}
        />
      </Container>
    </Main>
  )
}

/** {serviceLoaded ? (
        <span>TitlerService: Connnected</span>
      ) : (
        <span style={{ color: 'red' }}>TitlerService: NOT Connected</span>
      )}
      <div>
        Server Response: {status} {JSON.stringify(getStatusResponse)} {error}{' '}
        {isFetching}
      </div>
 */

/** function getParsedRundown() {
    console.info('Function was removed from button.')
  }

  function getRundownClick(event: FormEvent<HTMLFormElement>) {
    getParsedRundown()
    console.log('Active Rundown: ', rundownData)
    event.preventDefault()
  } */
