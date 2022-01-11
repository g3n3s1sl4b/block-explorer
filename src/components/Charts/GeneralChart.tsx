import React from 'react'
import { TickFormatter } from '@visx/axis'
import { LinearGradient } from '@visx/gradient'
import { AnyD3Scale, ScaleInput } from '@visx/scale'
import {
  buildChartTheme,
  Axis,
  Grid,
  AreaSeries,
  LineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart'

import Metric from '../../types/Metric'
import GeneralChartBackground from './GeneralChartBackground'

const customTheme = buildChartTheme({
  backgroundColor: '#fff',
  colors: ['url(#area)', '#2C72FF'],
  gridColor: '#DEDFE2',
  gridColorDark: '#DEDFE2',
  svgLabelSmall: { fill: '#7F7F7F', fontSize: '12px', fontFamily: 'favorit-regular' },
  svgLabelBig: { fill: '#000' },
  tickLength: 0,
})

type Props = {
  yAccessor: (metric: Metric) => number
  data: Metric[]
  marginLeft: number
  leftAxisFormatter?: TickFormatter<ScaleInput<AnyD3Scale>>
}

export default function GeneralChart({
  data,
  marginLeft,
  yAccessor,
  leftAxisFormatter,
}: Props) {
  const xAccessor = (metric: Metric) => metric.date

  return (
    <XYChart
      theme={customTheme}
      xScale={{ type: 'utc' }}
      yScale={{ type: 'linear' }}
      height={340}
      margin={{ left: marginLeft, right: 0, top: 20, bottom: 35 }}
    >
      <LinearGradient from='#2C72FF' to='#2C72FF00' id='area' />
      <GeneralChartBackground />
      <Grid numTicks={8} columns={false} />
      <AreaSeries
        dataKey='transactions'
        data={data}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
      />
      <LineSeries
        dataKey='transactionsLine'
        data={data}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
        strokeWidth={2}
      />
      <Axis
        orientation='left'
        numTicks={8}
        tickTransform='translate(-8, 0)'
        hideAxisLine
        tickFormat={leftAxisFormatter}
      />
      <Axis
        orientation='bottom'
        numTicks={5}
        tickLabelProps={() => ({ fill: '#000' })}
        tickTransform='translate(0, 18)'
        hideAxisLine
      />
      <Tooltip<Metric>
        showVerticalCrosshair
        snapTooltipToDatumX
        renderTooltip={({ tooltipData }) => {
          if (tooltipData?.nearestDatum === undefined) {
            return null
          }
          const d = (xAccessor(tooltipData.nearestDatum.datum) as unknown) as Date
          return (
            <>
              {d.toUTCString().split(' ').slice(0, -2).join(' ')}:{' '}
              {yAccessor(tooltipData.nearestDatum.datum).toString()}
            </>
          )
        }}
      />
    </XYChart>
  )
}
