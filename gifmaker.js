"use strict";
var ffmpeg = require("fluent-ffmpeg");
var ffmpegStatic = require('ffmpeg-static');
var path = require('path');
var fs = require('fs');

exports.makeWithFilters = function (template, filters) {
    ffmpeg.setFfmpegPath(ffmpegStatic.path);
    template = path.resolve('templates/'+template);
    // 模板部分处理
    if (!fs.existsSync(template)) {
        return '模板不存在';
    }

    // ffmpeg
    let proc = ffmpeg(template);
    filters = filters || [];
    filters =  JSON.parse(JSON.stringify(filters));

    // 水印添加
    /*filters.push({
        filter: 'drawtext',
        options: {
            'text': 'emojifight',
            'x': '5',
            'y': '5',
            'fontfile': './data/fonts/msyhbd.ttc',
            'fontcolor': 'white',
            'fontsize': '12'
        }
    });*/

    return proc.videoFilters(filters).noAudio()
}

