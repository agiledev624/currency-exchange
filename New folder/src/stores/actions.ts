import { action } from 'mobx'
import { State } from './state'
import { Currency } from './models'
export interface Actions {
  setFromCurrency: (currency: Currency) => void
  setToCurrency: (currency: Currency) => void
  setFromValue: (value: string | undefined) => void
  setToValue: (value: string | undefined) => void
  setBalance: (currency: Currency, balance: number) => void
  setRates: (rates: any) => void
}

export const actions = (state: State): Actions => ({
  setFromCurrency: action((currency: Currency) => {
    state.fromCurrency = currency
  }),
  setToCurrency: action((currency: Currency) => {
    state.toCurrency = currency
  }),
  setBalance: action((currency: Currency, balance: number) => {
    state.balances[currency] = balance
  }),
  setFromValue: action((value: string | undefined) => {
    state.fromValue = value
  }),
  setToValue: action((value: string | undefined) => {
    state.toValue = value
  }),
  setRates: action((rates: any) => {
    state.rates = rates
  }),
})
