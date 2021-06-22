module.exports = {
    name: 'today',
    description: "this is a ping command!",
    execute(message: { channel: { send: (arg0: any) => void; }; }, _args: any) {
        const realRandom = require('../tools/realRandom.js');
        const todayData = require('../../configs/today.json');
        switch (new Date().getDay()) {
            case 0: // Sunday
                message.channel.send(todayData.sunday[realRandom(todayData.sunday.length)]);
                break;
            case 1: // Monday
                message.channel.send(todayData.monday[realRandom(todayData.monday.length)]);
                break;
            case 2: // Tuesday
                message.channel.send(todayData.tuesday[realRandom(todayData.tuesday.length)]);
                break;
            case 3: // Wednesday
                message.channel.send(todayData.wednesday[realRandom(todayData.wednesday.length)]);
                break;
            case 4: // Thursday
                message.channel.send(todayData.thursday[realRandom(todayData.thursday.length)]);
                break;
            case 5: // Friday
                message.channel.send(todayData.friday[realRandom(todayData.friday.length)]);
                break;
            case 6: // Saturday
                message.channel.send(todayData.saturday[realRandom(todayData.saturday.length)]);
                break;
        }
    }
};
