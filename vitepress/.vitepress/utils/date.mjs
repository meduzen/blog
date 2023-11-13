export const formatter = {

  /**
   * Example: 10 November 2023
   */
  longdate: new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),

  /**
   * Example: 10 November
   */
  yearless: new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
  }),
}
