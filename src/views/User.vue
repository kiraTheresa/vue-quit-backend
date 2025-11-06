<template>
  <div>
    <el-card>
      <template #header>
        <span>用户管理</span>
      </template>

      <el-table :data="pagedData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="users.length"
          :page-size="pageSize"
          v-model:current-page="currentPage"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

const users = ref<User[]>(
  Array.from({ length: 37 }, (_, i) => ({
    id: i + 1,
    name: `用户 ${i + 1}`,
    email: `user${i + 1}@example.com`,
  })),
)

const currentPage = ref(1)
const pageSize = 10

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return users.value.slice(start, start + pageSize)
})
</script>

<style scoped>
.pagination {
  margin-top: 16px;
  text-align: right;
}
</style>
