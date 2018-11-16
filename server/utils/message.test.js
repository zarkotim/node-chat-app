var expect =require("expect");
var {generateMessage } = require("./message")

describe("generateMessage", (from ,text)=>{
    
    var from = "Jen";
    var text = "Some message";
    var message = generateMessage(from, text);
        
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({
        from,
        text
    })
    
    
    
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
});