function clean(text){
  if(typeof(text) === "string"){
    //placing regex here 
          return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  }  else
        return text;
}
  

module.exports = {
  name:"eval",
  description: "Eval command can only be used by special ",
  usage: "eval",
  run: (client , message ,args) => {
    if(message.author.id !== "628498212050698260" && message.author.id !== "495915635629359124" && message.author.id !== "658660563970293761" && message.author.id !== "717618361105907795") return 
    args = args.join(" ")
    try{
      var evaled = eval(args)
      if(typeof evaled !== "string")
        evaled = require("util").inspect(evaled)
       message.channel.send(`\`\`\`xl\n${clean(evaled)}\n\`\`\``);
    }catch (err){
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
    }
  }
}
