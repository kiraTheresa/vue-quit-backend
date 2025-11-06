<template>
  <el-card>
    <template #header>
      <span>题目管理</span>
    </template>

    <el-table :data="pagedData" border style="width: 100%">
      <el-table-column prop="id" label="题目ID" width="100" />
      <el-table-column prop="title" label="题目标题" />
      <el-table-column prop="difficulty" label="难度" width="100" />
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="questions.length"
        :page-size="pageSize"
        v-model:current-page="currentPage"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Question {
  id: number
  title: string
  difficulty: string
}

const questions = ref<Question[]>(
  Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `示例题目 ${i + 1}`,
    difficulty: ['简单', '中等', '困难'][i % 3] as string,
  })),
)

const currentPage = ref(1)
const pageSize = 8

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return questions.value.slice(start, start + pageSize)
})
</script>

<style scoped>
.pagination {
  margin-top: 16px;
  text-align: right;
}
</style>
