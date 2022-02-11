const ORE_TO_IRON = 100000000
const ORE_TICKER = '$ORE'
const IRON_TICKER = '$IRON'

export const getIRFAmountWithCurrency = (raw = '0'): string => {
  const amount = parseInt(raw)
  // const negative = amount < 0
  const absoluteAmount = Math.abs(amount)
  if (!amount) return '0'

  // display $IRON for >=1 IRON
  if (absoluteAmount > ORE_TO_IRON) {
    const div = amount / ORE_TO_IRON
    const displayAmount = getNumberToUnit(div)
    return `${displayAmount.toLocaleString()} ${IRON_TICKER}`
  }

  // display $IRON for >=0.01 IRON
  if (absoluteAmount > ORE_TO_IRON / 100) {
    const displayAmount = (amount / ORE_TO_IRON).toFixed(4)
    return `${displayAmount.toLocaleString()} ${IRON_TICKER}`
  }

  // display $ORE
  return `${amount.toLocaleString()} ${ORE_TICKER}`
}

export const getNumberToUnitOld = (value: number): string => {
  const units = ['M', 'B', 'T', 'Q']
  const unit = Math.floor((value / 1.0e1).toFixed(0).toString().length)
  const r = unit % 3
  const z = Number('1.0e+' + (unit - r))
  const x = Math.abs(Number(value)) / z
  // console.log({ unit, r, z, x })
  return `${x.toFixed(2).replace('.00', '')}${units[Math.floor(unit / 3) - 2] || ''}`
}

const UNITS = ['M', 'B', 'T', 'Q', 'U', 'S']
export const getNumberToUnit = (value: number): string => {
  const neg = value < 0
  const f = (value / 10).toFixed(0)
  const l = neg ? f.length - 1 : f.length
  const r = l % 3
  const div = Number('1e+' + (l - r))
  const raw = Math.abs(value) / div
  const formatted = raw.toFixed(2).replace('.00', '')
  const unit = UNITS[Math.floor(l / 3) - 2] || ''
  const output = formatted + unit
  return neg ? '-' + output : output
}
