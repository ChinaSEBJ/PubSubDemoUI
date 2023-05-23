/*
 * @Author: Jeff Liu
 * @Date: 2021-09-07 11:27:58
 * @LastEditTime: 2023-05-22 17:47:46
 * @LastEditors: Jeff Liu
 * @Description: 
 * @FilePath: /PubSubDemoUI/src/store/modules/money.js
 * Jeff.liu@intersytems.com
 */

import { getMoneyIncomePay } from '@/api/money'  // 导入资金信息相关接口

const money = {
  state: {
     addFundDialog: {
        title:'新增订阅者',
        type:'add'
     },
     search: {
        startTime:'',
        endTime:'',
        name:''
     },
     searchBtnDisabled: true
  },
  getters:{
    addFundDialog: state => state.addFundDialog,
    search: state => state.search,
    searchBtnDisabled: state => state.searchBtnDisabled,
  },
  mutations: {
    SET_DIALOG_TITLE: (state, type) => {
      if(type === 'add'){
        state.addFundDialog.title = '新增订阅者'
        state.addFundDialog.type = 'add'
      }else{
        state.addFundDialog.title = '新增订阅者'
        state.addFundDialog.type = 'edit'
      }
    },
    SET_SEARCH : (state, payload) => {
       state.search = payload;
    },
    SET_SEARCHBTN_DISABLED : (state, payload) => {
      state.searchBtnDisabled = payload;
   }
  },
  actions: {
     // 获取资金列表
     GetMoneyIncomePay({commit},reqData) {
        return new Promise(resolve => {
            getMoneyIncomePay(reqData).then(response => {
                const data = response.data.Topics
                resolve(data)
            })
        })
    } 


  }
}

export default money
