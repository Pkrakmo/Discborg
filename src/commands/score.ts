import { MessageEmbed } from 'discord.js';
import { MongoClient } from 'mongodb';
require('dotenv').config();

module.exports = {
    name: 'score',
    description: "idk",
    async execute(message: {
        channel: {
            send: (arg0: any) => void;
        };member: {
            displayName: any;
        };
    }, _args: any) {

        const uri = `${process.env.DB_URI}`;

        const dBclient = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        try {
            await dBclient.connect()
            await printTopCorrectTimes(dBclient, 10)
        } catch (e) {
            console.error(e)
        } finally {
            await dBclient.close()
        }

        async function printTopCorrectTimes(dBclient: MongoClient, limitNumber: number) {
            const pipeline = [{
                '$sort': {
                    'correctTimeCount': -1
                }
            }, {
                '$limit': limitNumber
            }];

            const addCursor = dBclient.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`).aggregate(pipeline)

            let counter = 1;
            let userArr: string[] = []

            await addCursor.forEach((entries: {nickname: any;correctTimeCount: any;}) => {
                userArr.push(`#${counter}: ${entries.nickname} with score: ${entries.correctTimeCount}`)
                counter = counter + 1
            })
            
            if (userArr.length == 0) {
                message.channel.send("Well, this is awkward")
            } else {
                const embed = new MessageEmbed()
                .setAuthor('Leaderboard')
                .setColor('#0099ff')
                .addFields({ name: `Top ${counter - 1}`, value: userArr.join('\n'), inline: true });
                message.channel.send(embed);
            }

        }

    }

}