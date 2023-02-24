const { EmbedBuilder } = require('discord.js');

module.exports = (client, message) => {

    client.on("guildMemberAdd", member => {

        const channelID = '1076200436916289677';
        const channel = member.guild.channels.cache.get(channelID);

        const infoEmbed = new EmbedBuilder()
            .setTitle("Garde du village : ")
            .setDescription(`Sir un nouveau gueux aux portes du village ! Bienvenue à la Gueuserie <@${member.id}>`)
            .setColor("#FFC300")
        channel.send({ embeds: [infoEmbed] });
    })

}