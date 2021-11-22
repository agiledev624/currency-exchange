import { Box, makeStyles, MenuItem, Select } from '@material-ui/core'
import { useStore } from '../index'
import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'

const CurrencyImg = styled.img`
  width: 32px;
  height: 32px;
`

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`

const useStyles = makeStyles({
  root: {
    height: 32,
    color: '#fff',
    backgroundColor: 'transparent',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiSelect-selectMenu': {
      fontSize: 14,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'unset',
    },
    '& .MuiSelect-icon': {
      color: 'white',
    },
  },
})
interface Props {
  type?: string
  updateValue: (type: string) => void
}

export const TokenSelect = observer(({ type = 'from', updateValue }: Props) => {
  const classes = useStyles()
  const store = useStore()
  const onChangeHandler = useCallback((event) => {
    if (type === 'from') store.setFromCurrency(event.target.value)
    else store.setToCurrency(event.target.value)
    updateValue(type === 'from' ? 'to' : 'from')
  }, [])
  return (
    <Select
      variant="outlined"
      displayEmpty
      className={classes.root}
      value={type === 'from' ? store.fromCurrency : store.toCurrency}
      onChange={onChangeHandler}>
      {store.currencies.map((currency) => (
        <MenuItem key={currency} value={currency}>
          <MenuItemContent>
            <CurrencyImg src={`./images/${currency}.svg`} alt={currency} />
            <Box ml={1}>{currency}</Box>
          </MenuItemContent>
        </MenuItem>
      ))}
    </Select>
  )
})
