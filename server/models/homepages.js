// homepage骨架模型
var mongoose = require('mongoose');
var homepageSchema = new mongoose.Schema({
    welcome: {
        slider1Src: {
            type: String
        },
        slider1Title: {
            type: String
        },
        slider1Text: {
            type: String
        },
        slider2Src: {
            type: String
        },
        slider2Title: {
            type: String
        },
        slider2Text: {
            type: String
        },
        slider3Src: {
            type: String
        },
        slider3Title: {
            type: String
        },
        slider3Text: {
            type: String
        },
        slider4Src: {
            type: String
        },
        slider4Title: {
            type: String
        },
        slider4Text: {
            type: String
        },
        title: {
            type: String
        },
        text: {
            type: String
        },
     },
    //  全是坑，气死我了，这里不能用保留字collection
    artwork: {
        title: {
            type: String
        },
        text: {
            type: String
        },
        collection1Src: {
            type: String
        },
        collection1Name: {
            type: String
        },
        collection1Url: {
            type: String
        },
        collection2Src: {
            type: String
        },
        collection2Name: {
            type: String
        },
        collection2Url: {
            type: String
        },
        collection3Src: {
            type: String
        },
        collection3Name: {
            type: String
        },
        collection3Url: {
            type: String
        },
    },
    member: {
        title: {
            type: String
        },
        text: {
            type: String
        },
        personTeacher: [{
            name: {
                type: String
            },
            src: {
                type: String
            },
        }],
        personStudent: [{
            name: {
                type: String
            },
            src: {
                type: String
            },
        }]
    },
    contact: {
        title: {
            type: String
        },
        phone: {
            type: String
        },
        qq: {
            type: String
        },
        wechat: {
            type: String
        },
        weibo: {
            type: String
        },
    },
    cooperation: {
        text: {
            type: String
        },
        title: {
            type: String
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        position: {
            type: String
        },
    }
});
module.exports = mongoose.model('Homepage', homepageSchema);