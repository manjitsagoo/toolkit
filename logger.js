const winston = require('winston');

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
            colorize: true
        })
    ]
});


module.exports = logger;