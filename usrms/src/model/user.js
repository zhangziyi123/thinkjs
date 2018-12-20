/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2018/12/6 15:34
 */
export default class extends think.Model {
    init(...args) {
        // super.init(...args);
        // this.tablePrefix = ''; //将数据表前缀设置为空
        this.tableName = 'user_tb'; //将对应的数据表名设置为 user2
    }
}