import React from 'react'

import Metric from '../../types/Metric'
import GeneralChart from './GeneralChart'

type Props = {
  data: Metric[]
}

export default function BlockTime({ data }: Props) {
  const yAccessor = React.useCallback(
    (d: Metric) => Math.round(d.average_block_time_ms / 1000),
    [],
  )

  return <GeneralChart data={data} marginLeft={50} yAccessor={yAccessor} />
}
