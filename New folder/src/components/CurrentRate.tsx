import React from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { Currency, Symbol } from '../stores/models'
import { useStore } from '..'

const Span = styled.span`
  text-align: center;
  border-radius: 10px;
  border: solid 1px#aae8f1;
  padding: 5px;
  font-size: 13px;
  background: #361d4c;
`

export const CurrentRate = observer(() => {
  const store = useStore()

  if (!store.rates) return null
  const getRate = (from: Currency, to: Currency) => {
    const fromRate = from === 'EUR' ? 1 : store?.rates[from]
    const valueInEur = 1 / fromRate
    const toRate = to === 'EUR' ? 1 : store?.rates[to]
    return (valueInEur * toRate).toFixed(4)
  }
  return (
    <Span>
      ↓ 1{Symbol[store.fromCurrency]} ={' '}
      {getRate(store.fromCurrency, store.toCurrency)}
      {Symbol[store.toCurrency]} ↑
    </Span>
  )
})
