import React, { useCallback } from 'react'
import styled from '@emotion/styled'
import { useStore } from '../index'
import { Currency } from '../stores/models'
import { observer } from 'mobx-react-lite'

const StyledButton = styled.div`
    height: 50px;
    width: 100%;
    margin-top: 10px;
    border-radius: 8px;
    background-color: #0CCFAC;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    '&:hover': {
      background-color: #0ACCA9;
    },
`

export const GetButton = observer(() => {
  const store = useStore()
  const onClickHandler = useCallback(() => {
    const from: Currency = store.fromCurrency
    const to: Currency = store.toCurrency
    if (store.fromValue === undefined || store.toValue === undefined) return
    if (parseFloat(store.fromValue) > store.balances[store.fromCurrency]) {
      alert('Insufficient funds')
      return
    }
    store.setBalance(from, store.balances[from] - parseFloat(store.fromValue))
    store.setBalance(to, store.balances[to] + parseFloat(store.toValue))
    store.setFromValue('0')
    store.setToValue('0')
  }, [])

  return <StyledButton onClick={onClickHandler}>EXCHANGE</StyledButton>
})
