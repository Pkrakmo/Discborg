import { MongoClient } from 'mongodb';
require('dotenv').config();

module.exports = {
    name: '1337',
    description: "It works fine without using prefix ! first",
    cooldown: 0,
    execute(message: {
        author: any;
        channel: {send: (arg0: any) => void;};member: {displayName: any;};
    }, _args: any) {


        const time = require('../tools/time.js')
        const realRandom = require('../tools/realRandom.js');

        var early = [
            `Bit to early there ${message.member.displayName}?`,
            `Ladies and gentlemen the fastest shooter in the west: ${message.member.displayName}`,
            "This is not the time you are looking for",
            "Please try again later",
            "You're a bit too early "
        ];
        var correct = [
            'https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif',
            'https://media.giphy.com/media/8xgqLTTgWqHWU/giphy.gif',
            'https://media.giphy.com/media/MM0Jrc8BHKx3y/giphy.gif',
            'https://media.giphy.com/media/1fm26vA3UsC8yzuiqC/giphy.gif',
            'https://media.giphy.com/media/iP8P6sbQTrmMM/giphy.gif',
            'https://media.giphy.com/media/a0h7sAqON67nO/giphy.gif',
            'https://media.giphy.com/media/nqi89GMgyT3va/giphy.gif',
            'https://media.giphy.com/media/l3q2Z6S6n38zjPswo/giphy.gif',
            'https://media.giphy.com/media/aLdiZJmmx4OVW/giphy.gif',
            'https://media.giphy.com/media/236NoPWibFgVi8lBgi/giphy.gif'
        ];
        var late = [
            `You're a bit too late ${message.member.displayName}`,
            "This is not the time you are looking for",
            'https://i.imgflip.com/4kvu43.jpg',
            `13:37 ? But it's ${time('hh:mm')} :eyes:`,
            `:man_shrugging:`,
            `Try again tomorrow ${message.member.displayName}`
        ];


        //FIX LATER PLZ
        const theAnswer = '13:37'
        var altAnswer = theAnswer.replace(':', '');

        let userID = message.author.id
        let userNickname = message.member.displayName

        if (time('hhmm') == altAnswer) {
            message.channel.send(`${correct[realRandom(correct.length)]} `)
            main(userID, userNickname)
        } else if (time('hhmm') < altAnswer) {
            message.channel.send(`${early[realRandom(early.length)]} `)
        } else if (time('hhmm') > altAnswer) {
            message.channel.send(`${late[realRandom(late.length)]} `)
        }

        async function main(userId: string, nickname: string) {

             

            const uri = `${process.env.DB_URI}`;
          
            const dBclient = new MongoClient(uri, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });
          
            try {
              await dBclient.connect()
          
              await findUserByID(dBclient, userId, nickname)
          
            } catch (e) {
              console.error(e)
            } finally {
              await dBclient.close()
            }
          }

          let today = new Date().toLocaleDateString('no-NB')   
          

          async function createUser(dBclient: MongoClient, newUserItem: { _id: string; nickname: string; correctTimeCount: number; lastDatePosted: string; }) {
            const result = await dBclient.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`).insertOne(newUserItem);
          
            console.log(`New user created with this ID: ${result.insertedId}`);
          }
          
          
          async function findUserByID(dBclient: MongoClient, userId: string, nickname: string) {
            const result = await dBclient.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`).findOne({
              _id: userId
            })
          
            if (result) {
              console.log(`Found a user with the id: ${userId}`)
              console.log(result)
              if (result.lastDatePosted == today) {
                console.log("Already participated today")
              } else {
                console.log("Updating entry")
                let countUpdater = parseFloat(result.correctTimeCount) + 1
                await updateUser(dBclient, userId, {
                  correctTimeCount: `${countUpdater}`,
                  lastDatePosted: `${today}`
                })
          
              }
            } else {
              console.log(`No user found, creating new entry`)
              
              await createUser(dBclient, {
                "_id": `${userId}`,
                "nickname": `${nickname}`,
                "correctTimeCount": 1,
                "lastDatePosted": `${today}`
              })
            }
          
          }
          
          async function updateUser(dBclient: MongoClient, userId: string, updateSomething: { correctTimeCount: string; lastDatePosted: string; }) {
            const result = await dBclient.db(`${process.env.DB_NAME}`).collection(`${process.env.DB_COLLECTION}`).updateOne({
              _id: userId
            }, {
              $set: updateSomething
            });
          
            console.log(`${result.matchedCount} documents updated`)
          
          }






    }
}