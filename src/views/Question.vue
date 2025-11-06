<template>
  <div class="question-page">
    <el-card>
      <div class="toolbar">
        <el-input
          v-model="searchKeyword"
          placeholder="请输入题目关键字"
          clearable
          style="width: 200px"
        />
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="success" @click="dialogVisible = true">添加题目</el-button>
      </div>

      <el-table :data="pagedQuestions" stripe border style="margin-top: 16px">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="content" label="题目内容" />
        <el-table-column prop="options" label="选项">
          <template #default="{ row }">
            <div v-for="(opt, key) in row.options" :key="key">{{ key }}. {{ opt }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="answer" label="正确答案" width="100" />
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
    <el-dialog title="添加题目" v-model="dialogVisible" width="500px">
      <el-form label-width="100px">
        <el-form-item label="题目内容">
          <el-input v-model="form.content" placeholder="请输入题目内容" />
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="form.optionA" placeholder="请输入选项A" />
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="form.optionB" placeholder="请输入选项B" />
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="form.optionC" placeholder="请输入选项C" />
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="form.optionD" placeholder="请输入选项D" />
        </el-form-item>
        <el-form-item label="正确答案">
          <el-select v-model="form.answer" placeholder="请选择正确答案">
            <el-option label="A" value="A" />
            <el-option label="B" value="B" />
            <el-option label="C" value="C" />
            <el-option label="D" value="D" />
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
  content: string
  options: Record<string, string>
  answer: string
}

const questions = ref<Question[]>(
  Array.from({ length: 123 }, (_, i) => ({
    id: i + 1,
    content: `这是第 ${i + 1} 题的题干`,
    options: { A: '选项A', B: '选项B', C: '选项C', D: '选项D' },
    answer: ['A', 'B', 'C', 'D'][i % 4],
  })),
)

const searchKeyword = ref('')
const dialogVisible = ref(false)
const form = ref({
  content: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  answer: '',
})

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
