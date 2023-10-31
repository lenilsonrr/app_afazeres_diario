<template>
  <div class="tabela">
    <h1>Lista do Dia</h1>
    <button class="btn-voltar-inicio" @click="$router.push('/')">Voltar</button>
    <br><br>
    <div class="table-responsive">
      <table>
        <thead class="linha-titulo">
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Prioridade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(f, i) in aFazeres" :key="i">
            <td>{{ f.id }}</td>
            <td>{{ f.descricao }}</td>
            <td>{{ f.prioridade }}</td>
            <td>
              <button class="btn" @click="editar(f)">Editar</button>
              <button class="btn" @click="excluir(f)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div id="modal" :class="{ 'modal': true, 'show-modal': showModal }">
    <div class="box-modal">
      <form>
        <input v-model="nDescricao" placeholder="Descrição">
        <br>
        <select v-model="nPrioridade" class="select-prioridade">
          <option value="ALTA">ALTA</option>
          <option value="MÉDIA">MÉDIA</option>
          <option value="BAIXA">BAIXA</option>
        </select>
        <br>
        <button @click="salvar">Salvar</button>
        <button @click="cancelar">cancelar</button>
      </form>
    </div>
  </div>
</template>
<script>
import { tbAFazer } from '@/components/database/db'

export default {
  data() {
    return {
      id: null,
      aFazeres: [],
      nDescricao: null,
      nPrioridade: null,
      showModal: false
    }
  },
  mounted() {
    this.getAFazer()
  },
  methods: {
    getAFazer() {
      tbAFazer.orderBy('descricao').toArray((aFazer) => {
        this.aFazeres = aFazer;
      })
    },
    editar(f) {
      this.nDescricao = f.descricao
      this.nPrioridade = f.prioridade
      this.id = f.id;
      this.showModal = true;
    },
    excluir(f) {
      tbAFazer.delete(f.id).then(() => {
        this.getAFazer();
      });
    },
    salvar() {
      tbAFazer.update(this.id, { descricao: this.nDescricao, prioridade: this.nPrioridade }).then((r) => {
        console.log('Atualizou', r);
        this.getAFazer();
      });
      this.showModal = false;
    },
    cancelar() {
      this.showModal = false;
    }

  }
}
</script>

<style>
.tabela {
  text-align: center;
}

.btn-voltar-inicio {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: #000000;
  font-weight: bold;
}

.btn-voltar-inicio:hover {
  background-color: #888484;
  color: black;
}

.table-responsive {
  overflow-x: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

table,
th,
td {
  border: 1px solid #ddd;
}

.linha-titulo {
  background-color: black;
  color: white;
  text-align: center;
}

.modal {
  display: none;
  position: fixed;
  padding: 30px;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.479);
  color: white;
  text-align: center;
}
.box-modal{
  background-color: rgb(151, 151, 151);
  padding: 20px;
  border-radius: 30px;
  margin-top: 40px;
}

.show-modal {
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #000000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
  background-color: #888484;
  color: black;
}
</style>
