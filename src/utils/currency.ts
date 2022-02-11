const ORE_TO_IRON = 100000000
const ORE_TICKER = '$ORE'
const IRON_TICKER = '$IRON'

export const getIRFAmountWithCurrency = (raw: string | undefined): string => {
  if (!raw) return '0'

  const amount = parseInt(raw)
  // eslint-disable-next-line no-console
  console.log({ amount, type: typeof amount })

  // display $IRON for >=1 IRON
  if (amount > ORE_TO_IRON) {
    const displayAmount = getNumberToUnit(amount / ORE_TO_IRON)
    return `${displayAmount.toLocaleString()} ${IRON_TICKER}`
  }

  // display $IRON for >=0.01 IRON
  if (amount > ORE_TO_IRON / 100) {
    const displayAmount = (amount / ORE_TO_IRON).toFixed(4)
    return `${displayAmount.toLocaleString()} ${IRON_TICKER}`
  }

  // display $ORE
  return `${amount.toLocaleString()} ${ORE_TICKER}`
}

const getNumberToUnit = (value: number): string => {
  const units = ['M', 'B', 'T', 'Q']
  const unit = Math.floor((value / 1.0e1).toFixed(0).toString().length)
  const r = unit % 3
  const z = Number('1.0e+' + (unit - r))
  const x = Math.abs(Number(value)) / z
  return `${x.toFixed(2).replace('.00', '')}${units[Math.floor(unit / 3) - 2] || ''}`
}
