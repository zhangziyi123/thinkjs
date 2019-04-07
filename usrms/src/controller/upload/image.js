/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2019/4/7 14:22
 */

'use strict';
var fs = require('fs'); // 载入fs模块
const Base = require('../base.js');

module.exports = class extends Base {
    uploadAction () {
        // let type = this.get('type'); // 获取地址定义的参数值
        if (!think.isEmpty(this.file('uploadFile'))) {
            let savePath = ''; // 保存在数据库的位置？？
            let file = think.extend({}, this.file('uploadFile'));
            let fPath = file.path;
            let suffix = fPath.substr(fPath.lastIndexOf('.') + 1);
            let newfilename = Math.random().toString(36).substr(2) + '.' + suffix;
            let supportSuffix = ['jpg', 'png', 'jpeg'];
            if (supportSuffix.includes(suffix)) {
                console.log(suffix);
                let savepath = think.ROOT_PATH + '/www/static/uploadimg/';
                think.mkdir(savepath);//创建该目录
                //读文件
                let datas = fs.readFileSync(fPath);
                //写文件
                fs.writeFileSync(savepath + newfilename, datas);
                this.success('上传图片成功!');
            } else {
                return this.fail('上传图片格式暂不支持，请重新上传！支持格式如下JPG,PNG,JPEG!')
            }
        } else {
            return this.fail('未获取到文件!')
        }
    }
};