<template>
  <div id="app" style="margin: 0px !important;">
    <Ctrl></Ctrl>
  </div>
</template>

<script>
import Ctrl from './components/CtrlTec'
export default {
  name: 'App',
  components:{
    Ctrl
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
