const dev = {
    database:{
        host:'127.0.0.1',
        user:'root',
        password:'',
        database:'g-test',
        client:'mysql'
    },
    app:{
        secret:"sdfasdf23424sdfafgwe23gew",
        tokenExpirationTime:86400
    }
}
const prod = {
    database:{
        host:'127.0.0.1',
        user:'ubuntu',
        password:'y3cFGVJsAXd4zaEn',
        database:'lfm',
        client:'mysql'
    },
    app:{
        secret:"sdfasdf23424sdfafgwe23gew",
        tokenExpirationTime:86400
    }
}

let data = {};

if(process.env.NODE_ENV=="development"){
    data = dev;
}else if(process.env.NODE_ENV=="production"){
    data = prod;
}else if(process.env.NODE_ENV=="local"){
    data = dev;
}

module.exports =  data;