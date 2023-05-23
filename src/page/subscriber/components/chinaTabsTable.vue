<template>
    <div class="chinaTabsTable">
        <el-table :data="tableData" style="width: 100%" align='center'>
            <el-table-column prop="ID" label="序号" align='center' width="80">
                <template slot-scope="scope">
                                            {{scope.$index+1}}
</template>
            </el-table-column>
            <el-table-column
                prop="SubscriberName"
                label="订阅者名称"
                align='center'
                >
            </el-table-column>
            <el-table-column
                prop="IsSync"
                label="是否同步"
                align='center'
                >
            </el-table-column>
            <el-table-column
                prop="SubscriberID"
                label="订阅者ID"
                align='center'
                >
<template slot-scope="scope">
    <span style="color:#00d053;">{{ scope.row.SubscriberID }}</span>
</template>
            </el-table-column>
            <el-table-column
                prop="SubscriptionID"
                label="订阅ID"
                align='center'
                >
            </el-table-column>
             <el-table-column prop="operation" align='center' label="操作">
<template slot-scope='scope'>
    <el-button type="danger" icon='delete' size="mini" @click='onDeleteSubscriber(scope.row)'>
        删除订阅者</el-button>
</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
//import data from '../data/chinaTabs.json';
import axios from 'axios';

export default {
    data() {
        return {
            TopicName: '',
            tableData: [],
            tableHeight: 0,

        }
    },
    props: {
        toggleData: [String]
    },
    mounted() {
        this.TopicName = this.$route.query.TopicName
        this.getSubscriberList(this.TopicName);
        this.setTableHeight();
        window.onresize = () => {
            this.setTableHeight();
        }

    },
    methods: {
        onDeleteSubscriber(row) {
            console.log(row.SubscriptionID)
              axios
                    .delete('/hcc/pubsub/removesubscription/' + row.SubscriptionID)
                    .then(response => {
                        console.log(response.data)
                        this.$message({
                                message: response.data.Status,
                                type: 'success'

                            })
                             this.$router.go(0)
                    })
                    .catch(function(error) { // 请求失败处理
                        console.log(error);
                    });
                   
        },
        showTableData(item) {

        },

        setTableHeight() {
            this.$nextTick(() => {
                this.tableHeight = document.body.clientHeight - 280
            })
        },
        getSubscriberList(TopicName) {
            console.log(TopicName)
            //console.log(TopicName)
            axios
                .get('/hcc/pubsub/getsubscription')
                .then(response => {
                    this.loading = false,
                        this.tableData = JSON.parse(JSON.stringify(response.data)).filter(function(e) { return e.TopicName == TopicName; })
                    console.log(this.tableData)
                })
                //console.log(response.data.Topics))
                .catch(function(error) { // 请求失败处理
                    console.log(error);
                });
        },
        showTableData(item) {

        }

    },
    watch: {
        // 监听属性的变化，可以接收参数;
        toggleData(v) {
            this.showTableData(v);
        },
    }
}
</script>

<style lang="less">

</style>
