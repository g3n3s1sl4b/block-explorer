/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useTranslation } from 'react-i18next'

import Error404 from '../../components/Error404/Error404'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Meta from '../../components/Meta/Meta'

import { ApiUrls, getApiUrl } from '../../services/servicesUrls'
import useGetService from '../../services/useGetService'
import { ServiceState } from '../../types/Service'
import Metric from '../../types/Metric'

import { RoutePath } from '../../routes/routePath'

import blocks from '../../assets/images/breadcrumb/blocks.svg'
import Container from '../../components/Container/Container'
import TransactionVolume from '../../components/Charts/TransactionVolume'
import UniqueGraffiti from '../../components/Charts/UniqueGraffiti'
import Difficulty from '../../components/Charts/Difficulty'
import BlockTime from '../../components/Charts/BlockTime'
import ChartBox from './ChartBox'

const ChartsPage = () => {
  const { t } = useTranslation()

  const [startDateString] = React.useState(() => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 88)
    return startDate.toISOString()
  })

  const [endDateString] = React.useState(() => {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 1)
    return endDate.toISOString()
  })

  const service = useGetService<Metric[]>(
    getApiUrl(ApiUrls.BLOCK_METRICS),
    {
      start: startDateString,
      end: endDateString,
      granularity: 'day',
    },
    (data) =>
      data.data
        .map((metric: any) => ({ ...metric, date: new Date(metric.date) }))
        .sort((a: any, b: any) => a.date - b.date),
  )

  const metricsData = service.status === ServiceState.LOADED && service.payload.result

  if (service.status === ServiceState.ERROR || (metricsData && metricsData.length === 0)) {
    return (
      <Error404
        title={t('app.charts.information.error.title')}
        description={t('app.charts.information.error.description')}
      />
    )
  }

  return (
    <>
      <Container>
        <Meta path={RoutePath.Charts} />

        <Breadcrumb
          paths={[
            {
              title: t('app.charts.title'),
              logo: blocks,
            },
          ]}
        />
      </Container>

      <Container isLoading={!metricsData} style={{ marginTop: 0 }}>
        {metricsData && (
          <>
            <h3
              style={{
                fontFamily: 'extended-regular',
                fontSize: 24,
                fontWeight: 'normal',
                marginTop: 0,
              }}
            >
              {t('app.charts.title')}
            </h3>

            <ChartBox header='Daily Transaction Volume'>
              <TransactionVolume data={metricsData} />
            </ChartBox>

            <ChartBox header='Daily Unique Graffiti'>
              <UniqueGraffiti data={metricsData} />
            </ChartBox>

            <ChartBox header='Difficulty (in trillions)'>
              <Difficulty data={metricsData} />
            </ChartBox>

            <ChartBox header='Block Time (seconds)'>
              <BlockTime data={metricsData} />
            </ChartBox>
          </>
        )}
      </Container>
    </>
  )
}

export default ChartsPage
