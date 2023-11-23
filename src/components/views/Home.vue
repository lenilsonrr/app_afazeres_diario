<template>
  <div class="container">
    <div class="home">
      <h1 class="titulo-home">Bem-vindo</h1>
      <div class="button-container">
        <button class="btn-home" @click="cadastrar">Cadastrar</button>
        <button class="btn-home" @click="tabela">Tabela</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cadastrar() {
      this.$router.push('/cadastro');
    },
    tabela() {
      this.$router.push('/tabela');
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
 
}

.home {
  border: 2px solid #ddd;
  width: 100%;
  max-width: 350px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.titulo-home {
  font-size: 24px;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-home {
  width: 100%;
  padding: 10px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: #000000;
  font-weight: bold;
  border-radius: 18px;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
}

.btn-home:hover {
  background-color: #888484;
  color: black;
}
</style>
