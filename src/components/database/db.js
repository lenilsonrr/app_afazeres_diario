import Dexie from "dexie";

const db = new Dexie("dbAFazer")
db.version(1).stores({ afazer: '++id, descricao, prioridade'});
export const tbAFazer = db.afazer;


 
