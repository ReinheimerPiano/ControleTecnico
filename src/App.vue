<template>
  <div id="app" style="margin: 0px !important;">
    <controle-tecnico></controle-tecnico>
  </div>
</template>

<script>
import ControleTecnico from './screens/controleTecnico/ControleTecnico'
export default {
  name: 'App',
  components:{
    ControleTecnico
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
