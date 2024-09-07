const LOCALE = 'en-GB'

export const formatter = {

  /**
   * Example: 10 November 2023 at 18:34
   */
  'longdate-shorttime': new Intl.DateTimeFormat(LOCALE, {
    dateStyle: 'long',
    timeStyle: 'short',
  }),

  /**
   * Example: 10 November 2023
   */
  longdate: new Intl.DateTimeFormat(LOCALE, {
    dateStyle: 'long',
  }),

  /**
   * Example: 10 November
   */
  yearless: new Intl.DateTimeFormat(LOCALE, {
    day: 'numeric',
    month: 'long',
  }),

  /**
   * Example: 18:34
   */
  shorttime: new Intl.DateTimeFormat(LOCALE, {
    timeStyle: 'short',
  }),
}
