import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useStore } from '../index'

import { Balances } from './Balances'
import { GetButton } from './GetButton'
import { CurrentRate } from './CurrentRate'
import { Wallet } from './Wallet'

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CardForm = styled.div`
  width: 30rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  background-color: #191332;
  margin-top: 100px;
  border-radius: 10px;
`
const CardTitle = styled.h5`
  text-align: center;
  padding: 5px;
  padding-top: 15px;
`

const CardBody = styled.div`
  margin: 20px;
  margin-top: 0;
  padding: 15px;
  padding-top: 0px;

  border: 1px solid #29294d;
  border-radius: 5px;
`
const Comment = styled.p`
  padding-top: 10px;
  font-size: 18px;
  text-align: left;
  color: #959ebd;
`

export const Faucet = observer(() => {
  //use MobX to manage store
  const store = useStore()

  return (
    <CardForm>
      <CardTitle>Currency Exchange</CardTitle>
      <CardBody>
        <Flex>
          <Comment>Exchange Rate</Comment>
          <CurrentRate />
        </Flex>

        <Wallet type="from" />
        <Wallet type="to" />

        <GetButton />
        <Balances />
      </CardBody>
    </CardForm>
  )
})
