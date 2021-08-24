import { API_HOST } from '../config'

// TODO improve URLs the config
export enum ApiUrls {
  BLOCK_DETAIL_PAGE = '/blocks/find?',
  BLOCK_TRANSACTION_PAGE = '/block/transaction',
  SEARCH_BLOCKS = '/blocks?',
  SEARCH_TRANSACTIONS = '/search/transactions',
}

export function getApiUrl(url: ApiUrls): string {
  return `${API_HOST}${url}`
}
