const timezone = /\((.*)\)/.exec(new Date().toString())[1]
const format = Intl.DateTimeFormat(
    'en-US',
    {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit',
        timezone
    }
).format

export default (date) => format(new Date(date))
export  { timezone }