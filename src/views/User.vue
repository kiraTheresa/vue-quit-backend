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
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="password" label="密码" />
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
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            show-password
          />
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
  username: string
  password: string
}

const users = ref<User[]>(
  Array.from({ length: 53 }, (_, i) => ({
    id: i + 1,
    username: `user_${i + 1}`,
    password: '********',
  })),
)

const searchKeyword = ref('')
const dialogVisible = ref(false)
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
})

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
