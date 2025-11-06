<template>
  <div class="question-page">
    <el-card>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入题目名称"
          clearable
          style="width: 200px"
        />
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="success" @click="dialogVisible = true">添加题目</el-button>
      </div>

      <el-table :data="pagedQuestions" stripe border style="margin-top: 16px">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="题目标题" />
        <el-table-column prop="difficulty" label="难度" />
      </el-table>

      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="questions.length"
          v-model:current-page="currentPage"
          :page-size="pageSize"
        />
      </div>
    </el-card>

    <!-- 添加题目弹窗 -->
    <el-dialog title="添加题目" v-model="dialogVisible" width="400px">
      <el-form>
        <el-form-item label="题目标题">
          <el-input placeholder="请输入题目标题" />
        </el-form-item>
        <el-form-item label="难度">
          <el-select placeholder="选择难度">
            <el-option label="简单" value="简单" />
            <el-option label="中等" value="中等" />
            <el-option label="困难" value="困难" />
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

interface Question {
  id: number
  title: string
  difficulty: string
}

const questions = ref<Question[]>(
  Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `题目${i + 1}`,
    difficulty: ['简单', '中等', '困难'][i % 3],
  })),
)

const searchKeyword = ref('')
const dialogVisible = ref(false)
const currentPage = ref(1)
const pageSize = 10

const pagedQuestions = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return questions.value.slice(start, start + pageSize)
})

function onSearch() {
  console.log('搜索题目：', searchKeyword.value)
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
