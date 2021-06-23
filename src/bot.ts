require('dotenv').config();
import { Message, Collection, Client} from 'discord.js';

const client = new Client();
const prefix = "!"
const path = require('path');
const fs = require('fs');

const time = require('./tools/time.js')
const realRandom = require('./tools/realRandom.js')

client.commands = new Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter((file: string) => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`${client.user!.tag} has logged in ${time('hh:mm:ss')}`)
});

client.on('message', (message: Message) => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift() !.toLowerCase();

    const theAnswer = '13:37'
    var altAnswer = theAnswer.replace(':', '');

    if (message.content == theAnswer || message.content == altAnswer) {
        client.commands.get('1337').execute(message, args);
    };

    if (message.content == time('hhmm')) {
        if (parseFloat(message.content) > 1337 && parseFloat(message.content) < 2300) {
            if (message.guild!.id == '770638698307518474') {
                let reactArray = ['🇫', '⛔', '🙅‍♂️', `${message.guild!.emojis.cache.get('779262760831811584')}`];
                message.react(reactArray[realRandom(reactArray.length)]);
            }
            else {
                let reactArray = ['🇫', '⛔', '🙅‍♂️'];
                message.react(reactArray[realRandom(reactArray.length)]);
            }
        }
    };

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error)
    }

});

client.login(process.env.TESTDISCORDJS_BOT_TOKEN)