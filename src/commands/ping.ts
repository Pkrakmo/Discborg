module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message: { channel: { send: (arg0: any) => void; }; member: { displayName: any; }; }, _args: any){
        message.channel.send('pong');
    }
}