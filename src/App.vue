<template>
  <div>
    <el-main>
      <app-navbar></app-navbar>
      <router-view />
    </el-main>
  </div>
</template>

<script>
import MortgageCalculator from './components/MortgageCalculator.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    'app-navbar': Navbar,
    'app-mortgage-calculator': MortgageCalculator
  }
}
</script>
