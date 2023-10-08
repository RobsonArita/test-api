import dayjs, { ConfigType, Dayjs,  } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import is from './is'

dayjs.extend(timezone)

export const timeAsDayjs = (value: ConfigType = new Date()): Dayjs => {
  if (is.string(value) && (value as string).includes('/')) {
    const [day, month, year] = (value as string).split('/')

    value = `${year}-${month}-${day}`
  }

  return dayjs.tz(value, 'GMT')
}