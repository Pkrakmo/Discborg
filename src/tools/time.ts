//SWITCH: hhmm - hh:mm - hh:mm:ss
module.exports = function (format :string) {
    var today = new Date();
    var time = today.toLocaleTimeString('no-NB', {
        hour12: false
    });
    switch (format) {
        case 'hhmm':
            return time.slice(0, 5).replace(':', '');
        case 'hh:mm':
            return time.slice(0, 5);
        case 'hh:mm:ss':
            return time;
    }
};
