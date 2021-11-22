import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { Currency, Symbol } from '../stores/models'
import { useStore } from '..'

const Balance = styled.p`
  margin-bottom: 0;
  padding-top: 10px;
  font-size: 14px;
  text-align: right;
  color: #959ebd;
`

export const Balances = observer(() => {
  const store = useStore()
  const { balances } = store

  return (
    <Balance>
      {Object.keys(balances).map(
        (rate, key) =>
          ` ${rate} : ${balances[rate as Currency].toFixed(2)}${
            Symbol[rate as Currency]
          } `
      )}
    </Balance>
  )
})
