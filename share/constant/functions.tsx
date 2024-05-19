export const dayDifference = (date: any) => {
  const comingDate = new Date(date)
  const difference = +comingDate - +new Date()

  return Math.floor(difference / (1000 * 60 * 60 * 24))
}
