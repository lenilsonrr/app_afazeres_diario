<template>
 <div class="formulario">
   <form>
     <label>Digite a descrição</label>
     <br />
     <input type="text" v-model="descricao" />
     <br />
     <label>Selecione a prioridade</label>
     <br />
     <select v-model="prioridade" class="select-prioridade">
       <option value="ALTA">ALTA</option>
       <option value="MÉDIA">MÉDIA</option>
       <option value="BAIXA">BAIXA</option>
     </select>
   </form>
   <br />
   <button class="btn" @click="salvar">Salvar</button>
   <br />
   <button class="btn" @click="voltar">Cancelar</button>
 </div>
</template>

<script>
import { tbAFazer } from '@/components/database/db';


export default {
 name: "mFormulario",
 data() {
  return {
   prioridade: null,
   descricao: null
  };
 },mounted() {
  this.prioridade = "ALTA"
 },
 methods: {
  salvar() {
   const self = this;
   const router = this.$router
   if (this.descricao != null && this.descricao !="") {
    tbAFazer.add({ descricao: this.descricao, prioridade: this.prioridade }).then(function () {
      
     self.descricao = '';
     self.prioridade = '';
     router.push('/tabela');
    });
   } else {
    alert("A descrição tem que ser preenchida!")
   }

  },
  voltar() {
   this.$router.push('/')
  }
 },
};
</script >
<style scoped>
.formulario {
  display: flex;
  flex-direction: column;
  border: 2px solid;
  margin-top: 30px;
  width: 350px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  align-items: center;
}

form {
  display: flex;
  width: 300px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}

input {
  width: 100%;
  border: none; 
  height: 30px;
  font-size: 20px;
  border-bottom: 2px solid;
  outline: none;
}

select.select-prioridade{
  width: 100%;
  border: none; 
  border-bottom: 2px solid;
  height: 30px;
  font-size: 20px;
  outline: none;
}

.btn {
  width: 100px;
  padding: 10px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: #000000;
  font-weight: bold;
}

.btn:hover {
  background-color: #888484;
  color: black;
}
</style>