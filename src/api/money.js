/*
 * @Author: Jeff Liu
 * @Date: 2021-09-07 11:27:58
 * @LastEditTime: 2023-05-22 22:19:15
 * @LastEditors: Jeff Liu
 * @Description: 
 * @FilePath: /PubSubDemoUI/src/api/money.js
 * Jeff.liu@intersytems.com
 */
import request from '@/utils/axios'

export function getMoneyIncomePay(params) {
  return request({
    url: '/hcc/pubsub/gettopiclist',
    method: 'get',
    params: params
  })
}

export function addSubscriber(data) {
  return request({
    url: '/hcc/pubsub/newsubscriber',
    method: 'post',
    data: data,
    headers: {
      'Content-Type':'application/json;charset=utf-8'
    }
  })
}

export function removeMoney(params) {
  return request({
    url: '/removesubscriber/'+params.id,
    method: 'delete',
    params: params
  })
}


export function batchremoveMoney(params) {
  return request({
    url: '/money/batchremove',
    method: 'get',
    params: params
  })
}

export function updateMoney(params) {
  return request({
    url: '/money/edit',
    method: 'get',
    params: params
  })
}




// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }) }


