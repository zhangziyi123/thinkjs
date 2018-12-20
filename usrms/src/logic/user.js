/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2018/12/8 22:31
 */

export default class extends think.Logic {
    async __before() {
        if (this.ctx.path.indexOf("/user/login") < 0) {
            const token = this.header("authorization");
            let result = await this.checkAuth(token);
            if (!result.success) {
                return this.fail(result);
            }
        }
    }

    loginAction() {
        if (this.isGet) {
            let rules = {
                username: {
                    string: true,
                    required: true,
                    default: "",
                    trim: true
                    //  method: "GET" // // 指定获取数据的方式
                },
                password: {
                    required: true,
                    trim: true,
                    length: {min: 3} //长度不能小于3
                }
            }

            // 自定义错误信息
            // 优先级为 规则 5 > (4 = 3) > 2 > 1 。
            let msgs = {
                required: '{password} can not blank',         // 规则 1
                password: '{password} can not blank',         // 规则 2
                length: "长度不能小于3",
                password: {
                    required: '{password} can not blank'        // 规则 3
                }
            }

            let flag = this.validate(rules, msgs);
            if (!flag) {
                return this.fail('validate error', this.validateErrors);
            }
            // 相当于上面的代码
            // 不想每次都手动调用 this.validate 进行校验，可以通过将校验规则赋值给 this.rules 属性进行自动校验
            /*     this.rules = {
             username: {
             required: true
             },
             password: {
             required: true
             }
             }*/
        }
    }

    infoAction() {
    }
};