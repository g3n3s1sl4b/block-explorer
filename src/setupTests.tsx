// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React, { ReactElement } from 'react'

configure({ adapter: new Adapter() })

// Mock i18n provider in the test suite
jest.mock('react-i18next', () => ({
  useTranslation: (): {} => ({ t: (key: string): string => key }),
  // eslint-disable-next-line react/display-name
  Trans: (): ReactElement => <></>,
}))