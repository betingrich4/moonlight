import db from '../../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
	text = (text || '').split('|')
	let who = text[1] ? (text[1].replace(/\D/g, '') + '@s.whatsapp.net') : m.quoted ? m.quoted.sender : m.mentionedJid?.[0] ? m.mentionedJid[0] : ''
	if (!who) return m.reply(`Format : ${usedPrefix + command} name | <tag / quote / type his number>`)
	let meh = await conn.onWhatsApp(who)
	if (meh.length == 0) return m.reply(`[!] Failed, @${(who.split('@')[0] || '')} not a WhatsApp user.`, null, { mentions: [who] })
	if (who == conn.user.jid) return m.reply(`[ ! ] Bot number automatically becomes owner.`)
	if (db.data.shizodb.owner.map(([number]) => number).includes(who.split('@')[0])) return m.reply('[ ! ] He has become an owner .')
	if (db.data.shizodb.rowner.map(([number]) => number).includes(who.split('@')[0])) return m.reply('[ ! ] He has become a real owner. ')
	db.data.shizodb.owner.push([who.split('@')[0], text[0], true])
	await conn.reply(m.chat, `Successfully made @${who.split('@')[0]} as *owner*.`, m, { mentions: [who] })
}

handler.menuowner = ['addowner']
handler.tagsowner = ['ownerr']
handler.command = /^(addowner)$/i

handler.rowner = true

export default handler

