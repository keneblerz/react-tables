import { Paper, createTheme, styled } from '@mui/material'

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}))

export const darkTheme = createTheme({ palette: { mode: 'dark' } })
export const lightTheme = createTheme({ palette: { mode: 'light' } })
