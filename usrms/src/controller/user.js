import Base from "./base";

export default class extends Base {
    async __before() {
        /*   const userInfo = await this.session('userInfo');
         //获取用户的 session 信息，如果为空，返回 false 阻止后续的行为继续执行
         if(think.isEmpty(userInfo)){
         return false;
         }*/
    }

    __after() {
        //indexAction 执行完成后执行，如果 indexAction 返回了 false 则不再执行
    }

    indexAction() {
        this.body = 'hello world!';
    } // 为什么不需要逗号？？？

    listAction() {

    }

    __call() {
        //如果相应的Action不存在则调用该方法
    }

    async loginAction() {
        const req = this.ctx.req;
        const res = this.ctx.res;
        const method = this.method; // 获取当前请求类型
        const username = this.get("username");
        const password = this.get("password");
        if (this.isGet) { // 如果是 GET 请求
            let model = this.model('user_tb');
            let data = await model.limit(2).select();
            let userinfo = data[0];
            const token = this.updateAuth(userinfo.userid); // 设置token
            userinfo.token = token;
            // await this.cache(userinfo.userid, null, 'redis');
            if (userinfo.userid) {
                this.cache(userinfo.userid, null, 'redis');
                this.cache(userinfo.userid, userinfo, 'redis'); // 这样外层打印userdata输出OK
                this.success(userinfo);
                /*   this.cache(userinfo.userid, (result) => {
                 // 这里result对应userinfo.userid
                 // 函数里有异步操作，需要返回 Promise
                 return this.cache(userinfo.userid, userinfo, 'redis'); // 这样外层打印userdata输出OK
                 }, 'redis');*/
            }
            // let data = await model.where({name: 'thinkjs'}).find();
            //data returns {name: 'thinkjs', email: 'admin@thinkjs.org', ...}
        }
    }

    infoAction() {
        let result = {success: true};
        return this.success(result);
    }
}