import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

import Box from '@material-ui/core/Box'

import { networkIdentifier } from '../../config'
import Loading from '../../components/Loading/Loading'
import BoxWrapper from '../../components/BoxWrapper/BoxWrapper'
import BlocksList from '../../components/BlocksList/BlocksList'
import Meta from '../../components/Meta/Meta'
import useInfiniteScroll, { DoneFunction } from '../../hooks/useInfiniteScroll'
import { RoutePath } from '../../routes/routePath'
import { ApiUrls } from '../../services/servicesUrls'
import Block, { formatBlocksFromJson } from '../../types/Block'
import { ServiceState } from '../../types/Service'
import Alert from '../../components/Alert/Alert'

const Explorer = () => {
  const { t } = useTranslation()

  const [seek, setSeek] = useState(0)
  const [result, setResult] = useState({
    status: ServiceState.INIT,
    error: null,

    blocks: [] as Block[],
  })

  const isFetching = useInfiniteScroll(window, document, fetchMoreListItems)

  function fetchMoreListItems(done: DoneFunction) {
    axios
      .post(ApiUrls.SEARCH_BLOCKS, {
        network_identifier: networkIdentifier,
        limit: 20,
        seek,
      })
      .then((response) => {
        setResult((prevState) => {
          return {
            ...prevState,
            status: ServiceState.LOADED,
            blocks: [...prevState.blocks, ...formatBlocksFromJson(response.data)],
          }
        })

        setSeek(() => response.data.next_offset)
        done(!response.data.next_offset)
      })
      .catch((error) =>
        setResult((prevState) => ({ ...prevState, status: ServiceState.ERROR, error })),
      )
  }

  return (
    <>
      <Meta path={RoutePath.Explorer} />

      <BoxWrapper title={t('app.dashboard.blocks.latestBlocksTitle')}>
        {result.status === ServiceState.ERROR && (
          <Alert
            title={t('app.explorer.error.title')}
            description={t('app.explorer.error.description')}
          />
        )}
        {result.status !== ServiceState.ERROR && <BlocksList blockList={result.blocks} />}
        <Box marginTop={2}>
          {result.status !== ServiceState.ERROR && isFetching && <Loading />}
        </Box>
      </BoxWrapper>
    </>
  )
}

export default Explorer
