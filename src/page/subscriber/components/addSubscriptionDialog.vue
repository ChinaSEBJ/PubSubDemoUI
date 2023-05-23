<!--
 * @Author: Jeff Liu
 * @Date: 2023-05-22 17:52:56
 * @LastEditTime: 2023-05-22 23:18:11
 * @LastEditors: Jeff Liu
 * @Description: 
 * @FilePath: /PubSubDemoUI/src/page/subscriber/components/addSubscriptionDialog.vue
 * Jeff.liu@intersytems.com
-->
<template>
    <el-dialog :visible.sync="isVisible" :title="添加订阅" :close-on-click-modal='false' :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
        <div class="form">
            <el-form ref="form" :model="form"  :label-width="dialog.formLabelWidth" style="margin:10px;width:auto;">
                <el-form-item label="订阅者名字">
                    <el-input type="text" v-model="form.SubscriberName"></el-input>
                </el-form-item>
                <el-form-item label="是否同步">
                    <el-radio-group v-model="form.IsSync" size="small" >
                        <el-radio label=true border>是</el-radio>
                        <el-radio label=false border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-radio-group v-model="form.IsEnabled" size="small" >
                        <el-radio label=true border>是</el-radio>
                        <el-radio label=false border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提 交</el-button>
                </el-form-item>
                 
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AreaJson from "@/assets/datas/area.json";
import axios from 'axios';

export default {
    name: 'addSubscriptionDialog',
    data() {
        return {
            areaData: [],
            isVisible: this.isShow,
            TopicName: '',
            form: {
                SubscriberName: 'EMR订阅者',
                TopicName: this.$route.query.TopicName,
                IsSync: '',
                IsEnabled: '',

            },
            //详情弹框信息
            dialog: {
                width: '500px',
                formLabelWidth: '160px'
            }
        }
    },
    props: {
        isShow: Boolean,
        // topicName:String,
    },
    computed: {
       // ...mapGetters(['addSubscriptionDialog']),
    },
    mounted() {
        //this.TopicName = this.$route.query.TopicName
       // if (this.addSubscriptionDialog.type === 'edit') {

            //this.form = this.dialogRow;
          //  console.log(this.form.SubTopic);
            //console.log(this.form);
            //this.form.incomePayType = (this.dialogRow.incomePayType).toString();
            // this.form.address = ["120000", "120200", "120223"]

        //} else {
            this.$nextTick(() => {
                this.$refs['form'].resetFields()
            })
        //}
    },
    methods: {
        getCascaderObj(val, opt) {
            return val.map(function(value, index, array) {
                for (var item of opt) {
                    if (item.value == value) {
                        opt = item.children;
                        return item.label;
                    }
                }
                return null;
            });
        },
        closeDialog() {
            this.$emit('closeDialog');
        },
        //表单提交
        onSubmit(form) {
            //this.$refs[form].validate((valid) => {

            if (true) { //表单数据验证完成之后，提交数据;
                let formData = this[form];
                formData.IsEnabled=JSON.parse(formData.IsEnabled)
                formData.IsSync=JSON.parse(formData.IsSync)
                console.log(formData)
                //const para = Object.assign({}, formData)

                // edit
                //if (this.addSubscriptionDialog.type === 'edit') {

                    
                    axios
                        .post('/hcc/pubsub/newsubscription', formData,{
                            timeout: 5000,
                            headers: {'Content-Type': 'application/json'}})
                        .then(response => {
                            console.log(2)
                            let resb = JSON.parse(JSON.stringify(response.data))
                            console.log(7)
                            this.$message({
                                message: "成功",
                                type: 'success'

                            })
                            console.log(3)
                            this.$refs['form'].resetFields()
                            console.log(4)
                            this.isVisible = false
                            console.log(5)
                            this.$emit('getSubscriberList', this.$route.query.TopicName);
                            this.$router.go(0)
                            console.log(6)
                        })
                        //console.log(response.data.Topics))
                        .catch(function(error) { // 请求失败处理
                            console.log(error)
                        })
                    //  },)
                //}
            }
        }
    }
}
</script>

<style lang="less" scoped>
.btnRight {
    float: right;
    margin-right: 0px !important;
}
</style>
