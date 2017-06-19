// https://www.npmjs.com/package/tracer
// timestamp: current time
// title: method name, default is 'log', 'trace', 'debug', 'info', 'warn', 'error'
// level: method level, default is 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5
// message: printf message, support %s string, %d number, %j JSON and auto inspect
// file: file name
// line: line number
// pos: position
// path: file's path
// method: method name of caller
// stack: call stack message
const colors = require('colors')
const moment = require('moment')
let defaultLogFormat = '{{level}}_{{title}} {{timestamp}} ({{path}}:{{line}}:{{pos}}) {{message}}'
let config = {
  level: 'log',
  format: [
    defaultLogFormat,
    {}
  ],
  filters: {
    log: colors.grey,
    trace: colors.grey,
    debug: colors.green,
    info: colors.grey,
    warn: colors.grey,
    error: [colors.red]
  },
  dateformat: 'HH:MM:ss.L',
  preprocess: function (data) {
    switch (data.title) {
    case 'log':
      data.title = data.title + '  '
      break
    case 'info':
    case 'warn':
      data.title = data.title + ' '
      break
    }
    data.title = data.title.toUpperCase()
    let filePathArr = data.path.split('/')
    data.path = filePathArr.splice(filePathArr.length - 2, 2)
      .join('/')
  }
}
const tracer = require('tracer')
global.Logger = tracer.colorConsole(config)
// setup error log into file
// let fileLogConfig = {}
// Object.assign(
//   fileLogConfig,
//   config, {
//     root: path.join(APP_ROOT, 'tmp'),
//     maxLogFiles: 10
//   }
// )
//
// const FileLogger = tracer.dailyfile(fileLogConfig)
// Logger.error = FileLogger.error
let now = moment()
  .format('YYYY-MM-DD HH:mm:ss')
Logger.debug(`
################ system booting, done with Logger setup
==>> ${now}
`)
// level: method level, default is 'log':0, 'trace':1, 'debug':2, 'info':3, 'warn':4, 'error':5
let logLevel = 'log'
if (process.env.NODE_ENV === 'production') {
  logLevel = 'debug'
}
tracer.setLevel(logLevel)
// Useage: lt, ld, le
// Logger.log('use less')
// Logger.trace('just trace the logic, with green color')
// Logger.debug('use full while debug online with ')
// Logger.info('use less')
// Logger.warn('use less')
// Logger.error('should deal with in carefully')
