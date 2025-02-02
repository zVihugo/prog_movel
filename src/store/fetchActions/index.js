import { db } from "../../firebase/config";
import { addPesquisa, addPesquisas, removePesquisa, updatePesquisa } from "../pesquisa";
import { getDocs, addDoc,collection, query, orderBy, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const convertStringToDate = (dateString) => {
    try {
      if (!dateString || typeof dateString !== 'string') {
        console.warn('Invalid date string:', dateString);
        return new Date(0); 
      }
      const [month, day, year] = dateString.split('/');
      return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    } catch (error) {
      console.error('Error converting date:', error);
      return new Date(0); 
    }
  };

export const getAllPesquisas = () => {
  return async dispatch => {
     try {
      const querySnapshot = await getDocs(query(collection(db, 'pesquisas'), orderBy('data', 'asc')));
      let pesquisasList = Array.from(new Map(querySnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() }])).values());
      pesquisasList = pesquisasList.sort((a, b) => {
        const dateA = convertStringToDate(a.data);
        const dateB = convertStringToDate(b.data);
        return dateB - dateA;
      });
      dispatch(addPesquisas(pesquisasList));
    } catch (error) {
      console.error('Erro ao buscar as pesquisas:', error);
    }
  };
};

export const addNewPesquisa = (novaPesquisa) => {
  return async dispatch => {
    try {
      const colecaoPesquisa = collection(db, 'pesquisas');
      const pesquisaRef = await addDoc(colecaoPesquisa, novaPesquisa);
      const pesquisa = { id: pesquisaRef.id, ...novaPesquisa };
      dispatch(addPesquisa(pesquisa));
    } catch (error) {
      console.error('Erro ao adicionar as pesquisas:', error);
    }  
  };
} ;

export const deletePesquisa = (pesquisaId) => {
  return async dispatch => {
    try {
      await deleteDoc(doc(db, 'pesquisas', pesquisaId));
      dispatch(removePesquisa(pesquisaId));
    } catch (error) {
      console.error('Erro ao deletar pesquisa:', error);
    }
  };
};

export const update = (pesquisaAtualizada) => async dispatch => {
  try {
    const pesquisaRef = doc(db, 'pesquisas', pesquisaAtualizada.id);
    const { id, ...dadosAtualizados } = pesquisaAtualizada;
    await updateDoc(pesquisaRef, dadosAtualizados);
    dispatch(updatePesquisa(pesquisaAtualizada));
  } catch (error) {
    console.error('Erro ao atualizar pesquisa:', error);
  }
};