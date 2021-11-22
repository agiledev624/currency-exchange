import { Currency } from './models'
export interface State {
  balances: Record<Currency, number>
  currencies: Currency[]
  fromCurrency: Currency
  toCurrency: Currency
  fromValue: string | undefined
  toValue: string | undefined
  rates: any
}
