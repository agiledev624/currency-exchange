import { State } from './state'
import { Actions, actions } from './actions'
import { Currency } from './models'
import { extendObservable } from 'mobx'

const initialState: (data: {} | void) => State = (data = {}) => ({
  currencies: [Currency.EUR, Currency.GBP, Currency.USD],
  balances: {
    [Currency.USD]: 200,
    [Currency.EUR]: 150,
    [Currency.GBP]: 10,
  },
  fromValue: undefined,
  toValue: undefined,
  fromCurrency: Currency.EUR,
  toCurrency: Currency.USD,
  rates: undefined,
})

export class Store implements State, Actions {
  constructor() {
    extendObservable(this, {
      ...initialState(),
      ...actions(this),
    })
  }
  balances!: Record<Currency, number>
  currencies!: Currency[]
  fromCurrency!: Currency
  toCurrency!: Currency
  fromValue!: string | undefined
  toValue!: string | undefined
  rates!: any
  setRates!: (obj: any) => void
  setFromCurrency!: (currency: Currency) => void
  setToCurrency!: (currency: Currency) => void
  setFromValue!: (value: string | undefined) => void
  setToValue!: (value: string | undefined) => void
  setBalance!: (currency: Currency, balance: number) => void
}

export const store = new Store()

export function createStore() {
  return store
}
