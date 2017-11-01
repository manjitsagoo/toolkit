const winston = require('winston');
require('winston-daily-rotate-file');
const config =  winston.config;
const dateFormat = require('dateformat');

const logCustomLevels = {
    colours: {
        debug: 'cyan',
        info: 'yellow',
        error: 'red'
    }
};

winston.addColors(logCustomLevels.colours);

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: "debug",
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: function () {
                return dateFormat(Date.now(), "isoDateTime");
            },
            formatter: function (options) {
                return options.timestamp() + ' ' +
                    config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                    (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
            }
        })
    ]
});

logger.add(winston.transports.DailyRotateFile, {
    name: 'info-logs',
    level:'info',
    filename: 'logs/info.log',
    datePattern: '.yyyy-MM-dd',
    maxsize: 20000
});

logger.add(winston.transports.DailyRotateFile, {
    name: 'error-logs',
    level:'error',
    filename: 'logs/error.log',
    datePattern: '.yyyy-MM-dd',
    maxsize: 20000
});


module.exports = logger;