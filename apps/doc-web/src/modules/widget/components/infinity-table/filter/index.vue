<template>
    <!-- 自定义表格头部的条件设置区域 -->
    <div class="filter_area">
        <form-group desc="姓名(模糊匹配)" :formWidth="150">
            <el-input placeholder="请输入内容" v-model="privateQueryParams.username"></el-input>
        </form-group>
        <form-group desc="省份(精确匹配)" :formWidth="150">
            <el-select v-model="privateQueryParams.province" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </form-group>
        <div class="button_area">
            <el-button icon="el-icon-plus" type="primary" @click="$emit('showFormDialog')">
                新增
            </el-button>
            <el-button icon="el-icon-upload" type="info" @click="$emit('download')">
                下载
            </el-button>
            <el-button icon="el-icon-search" type="warning" @click="$emit('search')">
                检索
            </el-button>
            <el-button icon="el-icon-delete" type="danger" @click="$emit('batchRemove')">
                删除
            </el-button>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
