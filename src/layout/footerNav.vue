<!--
 * @Author: Jeff Liu
 * @Date: 2021-09-07 11:27:58
 * @LastEditTime: 2021-09-07 14:36:18
 * @LastEditors: Jeff Liu
 * @Description: 
 * @FilePath: /vue2-element-touzi-admin/src/layout/footerNav.vue
 * Jeff.liu@intersytems.com
-->
<template>
	 <div class='footer'>
        <p class="intro rflex">
            <span>{{ $t('commons.xiaoai') }}Admin</span>
        </p>
    </div>
</template>


<script>
    import { github } from "@/utils/env";

export default {
    name: "footerNav",
	data(){
		return {
           
		}
	},
	methods:{

	}
}
</script>

<style lang="less">
	.footer{
        width: 100%;
        padding: 10px 0;
        font-size:12px;
        text-align: center;
        background: #fff;
        p{
            line-height: 30px;
        }
        .intro{
            width: 240px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>


