<template>
  <el-container style="height: 100vh">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background: #2d3a4b; color: #fff">
      <div class="logo">Quit 管理系统</div>
      <el-menu
        :default-active="activeMenu"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/questions">
          <el-icon><Edit /></el-icon>
          <span>题目管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-container>
      <el-header style="background: #f5f7fa; border-bottom: 1px solid #ddd">
        <h3>{{ pageTitle }}</h3>
      </el-header>
      <el-main style="padding: 20px">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { User, Edit } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
const pageTitle = computed(() => route.meta.title || 'Quit 管理系统')
</script>

<style scoped>
.logo {
  text-align: center;
  padding: 16px 0;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  border-bottom: 1px solid #1f2a38;
}
</style>
