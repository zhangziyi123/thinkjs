/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2018/12/21 10:27
 */
import Base from "./base";

export default class extends Base {
    __after() {
        //indexAction 执行完成后执行，如果 indexAction 返回了 false 则不再执行
    }

    // 矢量切片样式的增删改查
    async createAction() {
        let model = this.model('vector_style_tb');
        const token = this.header("authorization");
        let decodeInfo = await this.decodeToken(token);
        if (decodeInfo) {
            this.success(decodeInfo);
        }
        /*      model.add({
         center: [],
         glyphs: "",
         isbase: false,
         layers: [],
         metadata: {},
         name: "",
         ownerid: "",
         sharetype: "private",
         sources: [],
         sprite: "",
         thumbnail: "",
         userid: "",
         version: 8,
         zoom: "13"
         });*/
    }

    deleteAction() {
    }

    updateAction() {
    }

    async selectAction() {
        let model = this.model('vector_style_tb');
        let data = await model.limit(2).select();
    }

    indexAction() {
        this.body = 'hello world!';
    } // 为什么不需要逗号？？？

    listAction() {

    }

    __call() {
        //如果相应的Action不存在则调用该方法
    }

}