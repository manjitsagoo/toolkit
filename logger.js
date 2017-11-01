const winston = require('winston');
const config = winston.config;
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
            timestamp:  function ()  {
                return  dateFormat(Date.now(),"isoDateTime");
            },
            formatter:  function (options)  {
                return  options.timestamp()  +  ' '  +
                    config.colorize(options.level,  options.level.toUpperCase())  +  ' '  +
                    (options.message  ?  options.message  :  '')  +
                    (options.meta  &&  Object.keys(options.meta).length  ?  '\n\t' +  JSON.stringify(options.meta)  :  '' );
            }
        })
    ]
});

module.exports = logger;