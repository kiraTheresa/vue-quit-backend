<template>
  <div class="user-page">
    <el-card>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入用户名"
          clearable
          style="width: 200px"
        />
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="success" @click="dialogVisible = true">添加用户</el-button>
      </div>

      <el-table :data="pagedUsers" stripe border style="margin-top: 16px">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="role" label="角色" />
      </el-table>

      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="users.length"
          v-model:current-page="currentPage"
          :page-size="pageSize"
        />
      </div>
    </el-card>

    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" v-model="dialogVisible" width="400px">
      <el-form>
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select placeholder="选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="user" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  role: string
}

const users = ref<User[]>(
  Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    role: i % 2 === 0 ? '管理员' : '普通用户',
  })),
)

const searchKeyword = ref('')
const dialogVisible = ref(false)
const currentPage = ref(1)
const pageSize = 10

const pagedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return users.value.slice(start, start + pageSize)
})

function onSearch() {
  console.log('搜索用户：', searchKeyword.value)
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
  align-items: center;
}
.pagination {
  margin-top: 16px;
  text-align: center;
}
</style>
