<template>
    <el-dialog :visible.sync="isVisible" :title="addFundDialog.title" :close-on-click-modal='false'
        :close-on-press-escape='false' :modal-append-to-body="false" @close="closeDialog">
        <div class="form">
            <el-form ref="form" :model="form" :rules="form_rules" :label-width="dialog.formLabelWidth"
                style="margin:10px;width:auto;">
                <el-form-item label="订阅者名称:">
                    <el-input type="text" v-model="form.SubscriberName"></el-input>
                </el-form-item>
                <el-form-item label="订阅者端点url:">
                    <el-input type="text" v-model="form.TargetURL"></el-input>
                </el-form-item>
                <el-form-item label="订阅者目标production:">
                    <el-input type="text" v-model="form.TargetProduction"></el-input>
                </el-form-item>
                <el-form-item label="订阅者组件类:">
                    <el-input type="text" v-model="form.TargetClass"></el-input>
                </el-form-item>
                <el-form-item label="平台业务组件名称">
                    <el-input type="text" v-model="form.Target"></el-input>
                </el-form-item>
                <el-form-item label="订阅者目标soap action">
                    <el-input type="text" v-model="form.TargetSoapAction"></el-input>
                </el-form-item>
                <el-form-item label="平台验证账户">
                    <el-input type="text" v-model="form.TargetAuthConfigName"></el-input>
                </el-form-item>
                <el-form-item label="优先级">
                    <el-input type="text" v-model="form.Priority"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-radio-group v-model="form.IsActive" size="small" >
                        <el-radio label=1 border>是</el-radio>
                        <el-radio label=0 border>否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input type="text" v-model="form.Role"></el-input>
                </el-form-item>
                <el-form-item label="服务联系人">
                    <el-input type="text" v-model="form.PersonalContactName"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input type="text" v-model="form.PersonalContact"></el-input>
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
import { addSubscriber } from "@/api/money";
import AreaJson from "@/assets/datas/area.json";
import axios from 'axios';

export default {
    name: 'addFundDialogs',
    data() {
        return {
            areaData: [],
            isVisible: this.isShow,
            TopicName: '',
            form: {
                SubscriberName: 'aav',
                TargetURL: 'www.baidu.com',
                TargetProduction: 'HCC.SVR.Prod.FoundationProduction',
                TargetClass: 'HCC.SVR.Prod.BO.StandardHCCOutBound',
                Target: 'EMRaaaa',
                TargetSoapAction: 'urn:hl7-org:v3/EMR.WS.PatientService.HIPMessageServer',
                TargetAuthConfigName: '',
                Priority: 'Normal',
                IsActive: 'true',
                Role: 'System',
                PersonalContactName: '张三',
                PersonalContact: '13000000011'
            },

            form_rules: {
                SubscriberName: [
                    { required: true, message: '订阅者名称不能为空！', trigger: 'blur' }
                ],
                SubscriberBusinessHostName: [
                    { required: true, message: '平台业务组件名称不能为空！', trigger: 'blur' }
                ]
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
        ...mapGetters(['addFundDialog']),
    },
    mounted() {
        //this.TopicName = this.$route.query.TopicName
        if (this.addFundDialog.type === 'edit') {

            //this.form = this.dialogRow;
            console.log(this.form.TopicName);
            //console.log(this.form);
            //this.form.incomePayType = (this.dialogRow.incomePayType).toString();
            // this.form.address = ["120000", "120200", "120223"]

        } else {
            this.$nextTick(() => {
                this.$refs['form'].resetFields()
            })
        }
    },
    methods: {
        getCascaderObj(val, opt) {
            return val.map(function (value, index, array) {
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
        booleanformat(p) {
            console.log('adasfadfasfd' + JSON.parse(p))
            return;

        },
        //表单提交
        onSubmit(form) {
            //this.$refs[form].validate((valid) => {

            if (true) { //表单数据验证完成之后，提交数据;
                let formData = this[form];
                console.log(formData)
                //const para = Object.assign({}, formData)

                // edit
                // if (this.addFundDialog.type === 'edit') {


                axios
                    .post('/hcc/pubsub/newsubscriber', formData, {
                        timeout: 5000,
                        headers: { 'Content-Type': 'application/json' }
                    })
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
                    .catch(function (error) { // 请求失败处理
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
}</style>
