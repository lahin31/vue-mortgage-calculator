<template>
  <div>
    <el-main>
      <app-mortgage-calculator></app-mortgage-calculator>
    </el-main>
  </div>
</template>

<script>
import MortgageCalculator from './components/MortgageCalculator.vue'

export default {
  components: {
    'app-mortgage-calculator': MortgageCalculator
  }
}
</script>
