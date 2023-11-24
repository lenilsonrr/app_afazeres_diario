<template>
 <div class="titulo">
  <p @click="voltar">A <span>Fazer</span></p>
 </div>
</template>
<script>
export default {
 nome: 'titulo',
 methods:{
  voltar(){
   this.$router.push('/')
  }
 }
}
</script>
<style>
.titulo {
 background-color: black;
 color: white;
 padding: 20px;
 text-align: center;
 font-size: 30px;
 font-weight: 900;

}
p{
 display: block;
 background: black;
 width: 110px;
 margin-left: auto;
 margin-right: auto;
 cursor: pointer;
}
span{
 background-color: white;
 color: black;
}
</style>