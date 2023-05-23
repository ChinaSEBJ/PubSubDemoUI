<!--
 * @Author: Jeff Liu
 * @Date: 2021-09-07 15:44:39
 * @LastEditTime: 2023-05-22 22:36:15
 * @LastEditors: Jeff Liu
 * @Description: 
 * @FilePath: /PubSubDemoUI/src/page/subscriber/chinaTabsList.vue
 * Jeff.liu@intersytems.com
-->
<template>
    <div class="fillcontain">
        <div class="tabContainer" ref="tabContainer">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <el-button type="info" icon='edit' size="mini" @click='addSubscriber(TopicName)'>新增订阅者</el-button>
                     <addSubscriptionDialog  v-if="addSubscriptionDialog.show" :isShow="addSubscriptionDialog.show" :subTopic="addSubscriptionDialog.topicName"   @closeDialog="hideAddFundDialog"></addSubscriptionDialog>
                    <span slot="label" @click="toggleTabs('eastChina')"><icon-svg icon-class="icondashboard" />{{TopicName}}</span>
                    <china-tabs-table :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import chinaTabsTable from './components/chinaTabsTable';
import addFundDialog from "./components/addFundDialog";
import addSubscriptionDialog from './components/addSubscriptionDialog';
//import data from './data/chinaTabs.json';
//import Pagination from "@/components/pagination";

export default {
    data() {
        return {

            TopicName: '',
            toggleData: '',
             addSubscriptionDialog:{  
                    show:false,
                    topicName: ''
                },
        }
    },
    components: {
        chinaTabsTable,
        addSubscriptionDialog
       
    },
    mounted() {
        //  this.setTabHeight();
        //  window.onresize = () => {
        //     this.setTabHeight();
        //  }
        this.TopicName = this.$route.query.TopicName
        this.toggleTabs('eastChina');


    },
    methods: {
        setTabHeight() {
            this.$nextTick(() => {
                this.$refs.tabContainer.style.height = (document.body.clientHeight - 160) + 'px'
            })
        },
        addSubscriber(TopicName) {
            console.log(this.TopicName)
            this.addSubscriptionDialog.topicName = TopicName;
            this.showAddFundDialog();
        },
         showAddFundDialog(val){
                this.$store.commit('SET_DIALOG_TITLE', val)
                this.addSubscriptionDialog.show = true;
            },
            hideAddFundDialog(){
                this.addSubscriptionDialog.show = false;
            },
        toggleTabs(item) {
            this.toggleData = item;
        }
    }
}
</script>

<style lang="less" scoped>

</style>


