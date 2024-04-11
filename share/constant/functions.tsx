import { log } from 'console'

export const dayDifference = (date: any) => {
  const comingDate = new Date(date)
  const difference = +comingDate - +new Date()
  console.log(difference)

  return Math.floor(difference / (1000 * 60 * 60 * 24))
}
