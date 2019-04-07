/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2019/4/7 19:46
 */
'use strict';
var fs = require('fs'); // 载入fs模块
const Base = require('../base.js');
let node_xlsx = require('node-xlsx');
module.exports = class extends Base {
    uploadAction () {
        // let type = this.get('type'); // 获取地址定义的参数值
        if (!think.isEmpty(this.file('uploadFile'))) {
            let savePath = ''; // 保存在数据库的位置？？
            let file = think.extend({}, this.file('uploadFile'));
            let fPath = file.path;
            let suffix = fPath.substr(fPath.lastIndexOf('.') + 1);
            let newfilename = Math.random().toString(36).substr(2) + '.' + suffix;
            let supportSuffix = ['xlsx', 'csv', 'xls'];
            if (supportSuffix.includes(suffix)) {
                let excelObj = node_xlsx.parse(fPath);
                let dataObj = excelObj[0].data; // 取得第一个excel表的数据
                this.success({success: true, msg: '上传文件成功!', data: dataObj});
            } else {
                return this.fail('上传文件格式暂不支持，请重新上传！支持格式如下JPG,PNG,JPEG!')
            }
        } else {
            return this.fail('未获取到文件!')
        }
    }
};