const { EmbedBuilder } = require('discord.js');

module.exports = (client, message) => {

    client.on("guildMemberRemove", member => {

        const channelID = '1076200436916289677';
        const channel = member.guild.channels.cache.get(channelID);

        const infoEmbed = new EmbedBuilder()
            .setTitle("Garde du village : ")
            .setDescription(`Sir <@${member.id}> s'en est allé... A la revoyure le gueux... `)
            .setColor("#FFC300")
        channel.send({ embeds: [infoEmbed] });
    })



}