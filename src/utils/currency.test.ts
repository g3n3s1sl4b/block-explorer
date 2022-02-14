import { getNumberToUnit, getIRFAmountWithCurrency } from './currency'

describe('Currency utils', () => {
  test('getIRFAmountWithCurrency returns the right string', () => {
    const fixture = [
      ['0', '0'],
      ['1', '1 $ORE'],
      ['11', '11 $ORE'],
      ['123', '123 $ORE'],
      ['1234', '1,234 $ORE'],
      ['12340', '12,340 $ORE'],
      ['123401', '123,401 $ORE'],
      ['1234014', '0.0123 $IRON'],
      ['12340145', '0.1234 $IRON'],
      ['123401456', '1.23 $IRON'],
      ['4200000000000000', '42M $IRON'],
      ['12340145660606', '123.40 $IRON'],
      ['123401456606060', '1.23M $IRON'],
      ['1234014566060601', '12.34M $IRON'],
      ['12340145660606012', '123.40M $IRON'],
      ['123401456606060124', '1.23B $IRON'],
      ['1234014566060601246', '12.34B $IRON'],
      ['12340145660606012467', '123.40B $IRON'],
      ['12340145660600006012467', '123.40T $IRON'],
      ['12340145660600000006012467', '123.40Q $IRON'],
    ]
    fixture.map(([input, output]) => {
      const int = parseInt(input)
      const i = getIRFAmountWithCurrency(input)
      expect(i).toEqual(output)
      if (int) {
        expect(getIRFAmountWithCurrency('-' + input)).toEqual('-' + output)
      }
    })
  })
  test('getNumberToUnit', () => {
    // oh TS how I loathe you
    const fixture: [number, string][] = [
      [0, '0'],
      [1, '1'],
      [11, '11'],
      [123, '123'],
      [1234, '1.23'],
      [12345, '12.35'],
      [123456, '123.46'],
      [1234567, '1.23M'],
      [12345678, '12.35M'],
      [123456789, '123.46M'],
      [1234567890, '1.23B'],
      [12345678901, '12.35B'],
      [123456789012, '123.46B'],
      [1234567890123, '1.23T'],
      [12345678901234, '12.35T'],
      [123456789012345, '123.46T'],
      [1234567890123456, '1.23Q'],
      [12345678901234567, '12.35Q'],
    ]
    fixture.map(([i, o]) => {
      expect(getNumberToUnit(i)).toEqual(o)
      if (i) {
        expect(getNumberToUnit(-1 * i)).toEqual('-' + o)
      }
    })
  })
})
