import React, { useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { Currency, Symbol } from '../stores/models'
import { useStore } from '..'
import { TokenSelect } from './SelectToken'
import CurrencyInput from 'react-currency-input-field'

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
interface Props {
  type?: string
}

export const Wallet = observer(({ type = 'from' }: Props) => {
  const store = useStore()
  const textInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    textInput.current?.focus()
    textInput.current?.blur()
    // store.setBalance(store.fromCurrency, 500)
  }, [store.fromCurrency, store.toCurrency])

  const handleValueChange = (
    value: string | undefined,
    name: string | undefined
  ) => {
    if (value === undefined) {
      store.setFromValue('0')
      store.setToValue('0')
      return
    }
    if (type === 'from') store.setFromValue(value)
    else store.setToValue(value)

    updateValue(type)
  }

  const updateValue = (type: string) => {
    const from: Currency = store.fromCurrency
    const to: Currency = store.toCurrency
    if (type === 'from') {
      if (store.fromValue === undefined) return
      const fromRate = from === 'EUR' ? 1 : store.rates[from]
      const valueInEur = parseFloat(store.fromValue) / fromRate
      const toRate = to === 'EUR' ? 1 : store.rates[to]
      store.setToValue((valueInEur * toRate).toFixed(2).toString())
    } else {
      if (store.toValue === undefined) return
      const toRate = to === 'EUR' ? 1 : store.rates[to]
      const valueInEur = parseFloat(store.toValue) / toRate
      const fromRate = to === 'EUR' ? 1 : store.rates[from]
      store.setFromValue((valueInEur * fromRate).toFixed(2).toString())
    }
  }

  const isExceed = () => {
    if (store.fromValue === undefined || store.toValue === undefined)
      return false
    if (type === 'from') {
      if (parseFloat(store.fromValue) > store.balances[store.fromCurrency])
        return true
    }
    return false
  }

  return (
    <Flex>
      <TokenSelect type={type} updateValue={updateValue} />
      <CurrencyInput
        ref={textInput}
        id="input-example"
        name="input-name"
        value={type === 'from' ? store.fromValue : store.toValue}
        className={`currency-input ${
          isExceed() ? 'currency-input--error' : ''
        }`}
        prefix={
          type === 'from'
            ? Symbol[store.fromCurrency]
            : Symbol[store.toCurrency]
        }
        placeholder=""
        decimalsLimit={2}
        onValueChange={(value, name) => {
          handleValueChange(value, name)
        }}
      />
    </Flex>
  )
})
