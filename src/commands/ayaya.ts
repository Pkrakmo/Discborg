module.exports = {
    name: 'ayaya',
    description: "ayaya ? ",
    execute(message: { channel: { send: (arg0: any) => void; }; member: { displayName: any; }; }, _args: any){
        message.channel.send('https://youtu.be/9wnNW4HyDtg')
    }
}