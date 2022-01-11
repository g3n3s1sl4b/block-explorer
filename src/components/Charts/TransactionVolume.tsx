import React from 'react'

import Metric from '../../types/Metric'
import GeneralChart from './GeneralChart'

type Props = {
  data: Metric[]
}

export default function TransactionVolume({ data }: Props) {
  const yAccessor = React.useCallback((d: Metric) => d.transactions_count, [])

  return <GeneralChart data={data} marginLeft={50} yAccessor={yAccessor} />
}
