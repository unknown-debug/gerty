const discord = require("discord.js");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Util } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../../config.json");
const ytdl = require("ytdl-core");
const YoutubeAPI = require("simple-youtube-api");
const youtube = new YoutubeAPI(YOUTUBE_API_KEY);
const { play } = require("../../MusicSystem.js");

let embed = new MessageEmbed().setColor("RANDOM");

module.exports = {
  name: "p",
  category: "music",
  usage: "play <Song Name Or Youtube Video Url> ",
  description: "Play Music From Playlist & Youtube!",
  run: async (client, message, args) => {
    const { channel } = message.member.voice;

    if (!channel) {
      return message.channel.send(`<a:music:659020781023395852> | Please Join A Voice Channel!`);
    }

    if (!args.length) {
      return message.channel.send(
        `<a:music:659020781023395852> | Please Give Me Song Name Or Youtube Video Url To Play Song!`
      );
    }

    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      return message.channel.send(`❌ | Error In Playing Playlist!`);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
        songData = await ytdl.getInfo(args[0]);
        song = {
          title: songData.title,
          url: songData.video_url,
          duration: songData.length_seconds
        };
      } catch (error) {
        if (message.include === "copyright") {
          return message.channel
            .send(
              `🎶 | This Video Contain Copyright Content! I Can't Play That!`
            )
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        const result = await youtube.searchVideos(targetsong, 1);
        songData = await ytdl.getInfo(result[0].url);
        song = {
          title: songData.title,
          url: songData.video_url,
          duration: songData.length_seconds
        };
      } catch (error) {
        console.error(error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);

      return serverQueue.textChannel
        .send(`${song.title} Has Been Added To Queue!`)
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);

    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel
          .send(`❌ | Error In Joining Voice Channel!`)
          .catch(console.error);
      }
    }
  }
};
  