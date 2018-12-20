/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2018/12/18 15:48
 */
const util = require('util')
const jsonwebtoken = require('jsonwebtoken');
const verify = util.promisify(jsonwebtoken.verify) // 解密

export default {
    authFail() {
        return this.fail('JWT 验证失败');
    },
    // 下面代码使用了es7的修饰器decorator 语法糖
    /*   checkAuth(target, name, descriptor) {
     const action = descriptor.value;
     descriptor.value = function () {
     console.log(this.ctx.state.user);
     const userName = this.ctx.state.user && this.ctx.state.user.name;
     if (!userName) {
     return this.authFail();
     }
     this.updateAuth(userName);
     return action.apply(this, arguments);
     }
     return descriptor;
     },*/
    checkAuth(token) {
        return this.getToken(token);
    },

    updateAuth(userid) {
        const userInfo = {
            userid: userid
        }
        const {secret, cookie, expire} = this.config('jwt');
        const token = jsonwebtoken.sign(userInfo, secret, {expiresIn: expire});
        return token;
    },

    async getToken(token) {
        const {secret} = this.config('jwt');
        let _this = this;
        let userInfo = await verify(token, secret);
        let rediscacheToken = await this.cache(userInfo.userid);
        let oldToken = rediscacheToken.token || "";
        let jwtObj = jsonwebtoken.verify(token, secret, function (err, decoded) {
            let result = {success: false, msg: "", data: null}
            if (err) {
                result.success = false;
                let errorStr = err.name;
                if (errorStr === "TokenExpiredError") {
                    result.msg = "token expried";
                } else {
                    result.msg = "token error";
                }
            } else if(oldToken && oldToken !== token) {
                result.success = false;
                result.msg = "token expried";
            } else {
                result.success = true;
                result.data = decoded;
            }
            return result;
        })
        return new Promise(function (resolve, reject) {
            resolve(jwtObj);
        })
    }
}