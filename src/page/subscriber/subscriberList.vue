<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="getMoneyList" @onBatchDelMoney="onBatchDelMoney"></search-item>
        <div class="table_container">
            <el-table v-loading="loading" :data="tableData" style="width: 100%" align='center' @select="selectTable" @select-all="selectAll">
                <el-table-column v-if="idFlag" prop="id" label="id" align='center' width="60">
                </el-table-column>
                <el-table-column type="selection" align='center' width="60">
                </el-table-column>
                <el-table-column prop="TopicName" label="订阅主题英文名称" align='center'>
                </el-table-column>
                <el-table-column prop="TopicName" :formatter="FormatTopic" label="订阅主题中文名称" align='center'>
                </el-table-column>
                <el-table-column prop="SchemaName" label="Schema名称" align='center'>
                </el-table-column>
                <el-table-column prop="operation" align='center' label="操作">
                    <template slot-scope='scope'>
                                    <el-button 
                                        type="warning" 
                                        icon='edit' 
                                        size="mini"
                                        @click='onEditMoney(scope.row)'
                                    >显示订阅者</el-button>
                                    <el-button 
                                        type="danger" 
                                        icon='delete' 
                                        size="mini"
                                        @click='onDeleteMoney(scope.row,scope.$index)'
                                    >删除</el-button>
</template>
            </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="getMoneyList"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from "vuex";
import * as mutils from '@/utils/mUtils'
import SearchItem from "./components/searchItem";
import AddFundDialog from "./components/addFundDialog";
import Pagination from "@/components/pagination";
import { getMoneyIncomePay, removeMoney, batchremoveMoney } from "@/api/money";
import cdata from "@/assets/datas/serviceRef.json";

export default {
    data() {
        return {
            window:window,
            tableData: [],
            tableHeight: 0,
            loading: true,
            idFlag: false,
            isShow: false, // 是否显示资金modal,默认为false
            editid: '',
            rowIds: [],
            sortnum: 0,
            addFundDialog: {
                show: false,
                dialogRow: {}
            },
            incomePayData: {
                page: 1,
                limit: 20,
                name: ''
            },
            pageTotal: 0,
            // 用于列表筛选
            fields: {
                incomePayType: {
                    filter: {
                        list: [{
                            text: '提现',
                            value: 0
                        }, {
                            text: '提现手续费',
                            value: 1
                        }, {
                            text: '提现锁定',
                            value: 2
                        }, {
                            text: '理财服务退出',
                            value: 3
                        }, {
                            text: '购买宜定盈',
                            value: 4
                        }, {
                            text: '充值',
                            value: 5
                        }, {
                            text: '优惠券',
                            value: 6
                        }, {
                            text: '充值礼券',
                            value: 7
                        }, {
                            text: '转账',
                            value: 8
                        }],
                        multiple: true
                    }
                },
            },
        }
    },
    components: {
        SearchItem,
        AddFundDialog,
        Pagination
    },
    computed: {
        ...mapGetters(['search'])
    },
    mounted() {
        this.getMoneyList();
    },
    methods: {
        FormatTopic(row, column) {
            let tn = row.TopicName
            let s = cdata.filter(function(e) { return e.EngName == tn;})
            return s[0].ChName
        },
        setAddress(value) {

        },
        setTableHeight() {
            this.$nextTick(() => {
                this.tableHeight = document.body.clientHeight - 300
            })
        },
        // 
        getMoneyList() {
            console.log(12345)
           
            axios
                .get('/hcc/pubsub/gettopic')
                .then(response => {
                    this.loading = false,
                        this.tableData = response.data
                })
                .catch(function(error) { // 请求失败处理
                    console.log(error);
                });
        },

        // 显示资金弹框
        showAddFundDialog(val) {
            this.$store.commit('SET_DIALOG_TITLE', val)
            this.addFundDialog.show = true;
        },
        hideAddFundDialog() {
            this.addFundDialog.show = false;
        },
        // 上下分页
        handleCurrentChange(val) {
            this.incomePayData.page = val;
            this.getMoneyList()
        },
        // 每页显示多少条
        handleSizeChange(val) {
            this.incomePayData.limit = val;
            this.getMoneyList()
        },
        getPay(val) {
            if (mutils.isInteger(val)) {
                return -val;
            } else {
                return val;
            }
        },
        /**
         * 格式化状态
         */
        formatterType(item) {
            const type = parseInt(item.incomePayType);
            return this.format_type_list[type];
        },
        filterType(value, item) {
            const type = parseInt(item.incomePayType);
            return this.format_type_list[value] == this.format_type_list[type];
        },
        // 编辑操作方法
        onEditMoney(row) {
            // this.addFundDialog.dialogRow = {...row};
            // this.showAddFundDialog();
            // this.$router.push({
            //     name: “demo”,
            //     params: {
            //         content: ‘123’,
            //     }
            // });
            // 用query传参， 可以用path。

            row = JSON.parse(JSON.stringify(row))
            console.log(row.TopicName)
            this.$router.push({
                path: "/pubsub/topicSubscriber",
                query: {
                    TopicName: row.TopicName,
                }
            });
        },
        // 删除数据
        onDeleteMoney(row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const para = { id: row.id }
                    removeMoney(para).then(res => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getMoneyList()
                    })
                })
                .catch(() => {})
        },
        onBatchDelMoney() {
            this.$confirm('确认批量删除记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const ids = this.rowIds.map(item => item.id).toString()
                    const para = { ids: ids }
                    batchremoveMoney(para).then(res => {
                        this.$message({
                            message: '批量删除成功',
                            type: 'success'
                        })
                        this.getMoneyList()
                    })
                })
                .catch(() => {})
        },
        // 当用户手动勾选数据行的 Checkbox 时触发的事件
        selectTable(val, row) {
            this.setSearchBtn(val);
        },
        // 用户全选checkbox时触发该事件
        selectAll(val) {
            val.forEach((item) => {
                this.rowIds.push(item.id);
            });
            this.setSearchBtn(val);
        },
        setSearchBtn(val) {
            let isFlag = true;
            if (val.length > 0) {
                isFlag = false;
            } else {
                isFlag = true;
            }
            this.$store.commit('SET_SEARCHBTN_DISABLED', isFlag);
        }
    },
}
</script>

<style lang="less" scoped>
.table_container {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
}

.el-dialog--small {
    width: 600px !important;
}

.pagination {
    text-align: left;
    margin-top: 10px;
}
</style>


