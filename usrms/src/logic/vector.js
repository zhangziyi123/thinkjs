/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2018/12/8 22:31
 */

export default class extends think.Logic {
    async __before() {
        const token = this.header("authorization");
        let result = await this.checkAuth(token);
        if (!result.success) {
            return this.fail(result);
        }
    }
};