const date = new Date()
date.setUTCDate(date.getUTCDate() + 1)
const endDate = date.toISOString()

date.setUTCDate(date.getUTCDate() - 2)
const startDate = date.toISOString()

export { startDate, endDate }
