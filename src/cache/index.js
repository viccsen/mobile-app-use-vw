import Storage from '../utils/storage'

export const localCache = new Storage('yzy', window.localStorage)
export const sessionCache = new Storage('yzy', window.sessionStorage)

export const MINUTES = 60000
export const HOURS = 60 * MINUTES
export const DAY = 24 * HOURS
export const WEEK = 7 * DAY
export const MONTH = 30 * DAY
