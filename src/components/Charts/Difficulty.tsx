import React from 'react'

import Metric from '../../types/Metric'
import GeneralChart from './GeneralChart'

type Props = {
  data: Metric[]
}

export default function Difficulty({ data }: Props): JSX.Element {
  const yAccessor = React.useCallback((d: Metric) => d.average_difficulty / 1e12, [])

  return (
    <GeneralChart
      data={data}
      marginLeft={50}
      yAccessor={yAccessor}
      leftAxisFormatter={function format(d) {
        return `${d}T`
      }}
    />
  )
}
