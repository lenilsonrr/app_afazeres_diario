<template>
  <div class="tabela">
    <h1>Lista do Dia</h1>
    <br /><br />
    <div class="prioridade-botoes">
      <button @click="filtrarPorPrioridade('ALTA')">Mostrar Alta</button>
      <button @click="filtrarPorPrioridade('MÉDIA')">Mostrar Média</button>
      <button @click="filtrarPorPrioridade('BAIXA')">Mostrar Baixa</button>
    </div>
    <div class="table-responsive">
      <table>
        <thead class="linha-titulo">
          <tr>
            <th>DESCRIÇÃO</th>
            <th style="width: 15%;">PRIORIDADE</th>
            <th style="width: 30%;">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(f, i) in aFazeres" :key="i">
            <td>{{ f.descricao }}</td>
            <td style="width: 15%;">{{ f.prioridade }}</td>
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
        <input v-model="nDescricao" placeholder="Descrição" />
        <br />
        <select v-model="nPrioridade" class="select-prioridade">
          <option value="ALTA">ALTA</option>
          <option value="MÉDIA">MÉDIA</option>
          <option value="BAIXA">BAIXA</option>
        </select>
        <br />
        <button @click="salvar">Salvar</button>
        <button @click="cancelar">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { tbAFazer } from "@/components/database/db";

export default {
  data() {
    return {
      id: null,
      aFazeres: [],
      nDescricao: null,
      nPrioridade: null,
      showModal: false,
    };
  },
  mounted() {
    this.filtrarPorPrioridade("ALTA")
  },
  methods: {
    getAFazer() {
      tbAFazer.orderBy("descricao").toArray((aFazer) => {
        this.aFazeres = aFazer;
      });
    },
    editar(f) {
      this.nDescricao = f.descricao;
      this.nPrioridade = f.prioridade;
      this.id = f.id;
      this.showModal = true;
    },
    excluir(f) {
      tbAFazer.delete(f.id).then(() => {
        this.filtrarPorPrioridade(this.nPrioridade);
      });
    },
    salvar() {
      tbAFazer
        .update(this.id, { descricao: this.nDescricao, prioridade: this.nPrioridade })
        .then(() => {
          this.filtrarPorPrioridade(this.nPrioridade);
        });
      this.showModal = false;
    },
    cancelar() {
      this.showModal = false;
    },
    filtrarPorPrioridade(prioridade) {
      tbAFazer
        .where("prioridade")
        .equals(prioridade)
        .toArray((aFazer) => {
          this.aFazeres = aFazer.sort((a, b) => {
            return a.descricao.localeCompare(b.descricao);
          });
        });
    },
  },
};
</script>
<style scoped>
.tabela {
  text-align: center;
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
  height: 50px;
  font-size: 15px;
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

.box-modal {
  background-color: #979797;
  padding: 20px;
  border-radius: 30px;
  margin-top: 40px;
}

.show-modal {
  display: block;
}

input {
  width: 80%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-bottom: 1px solid;
  background: #979797;
  border-radius: 3px;
  outline: none;
}

.prioridade-botoes {
  margin-bottom: 20px;
}

select {
  width: 80%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  border-bottom: 1px solid;
  background: #979797;
  border-radius: 3px;
  outline: none;
}

button {
  background-color: #000000;
  color: white;
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ffffff;
  color: black;
}
</style>
