<template>
  <div class="container">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline left">
        <el-form-item label="姓名：">
          <el-input v-model="formInline.name" placeholder="姓名" style="width:120px;" />
        </el-form-item>
        <el-form-item label="申请入党日期：">
          <el-date-picker v-model="formInline.startDate" type="date" placeholder="请选择" style="width:150px;" />
          -
          <el-date-picker v-model="formInline.endDate" type="date" placeholder="请选择" style="width:150px;" />
        </el-form-item>
        <el-form-item label="入党成熟度：">
          <el-select v-model="formInline.maturityType" placeholder="请选择">
            <el-option v-for="item in types" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        name: '',
        startDate: '',
        endDate: '',
        maturityType: ''
      },
      types: [
        { value: '1', label: '申请人' },
        { value: '2', label: '积极分子' },
        { value: '3', label: '发展对象' },
        { value: '4', label: '预备党员' }
      ]
    }
  }
}
</script>
