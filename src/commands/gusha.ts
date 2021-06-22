module.exports = {
    name: 'gusha',
    description: " ",
    execute(message: { channel: { send: (arg0: any) => void; }; member: { displayName: any; }; }, _args: any){
        message.channel.send({
            files: [{
                attachment: './media/GuashabiatCH.mp4',
                name: 'GuashabiatCH.mp4'
            }]
        })
    }
}