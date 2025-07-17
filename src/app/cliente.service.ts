import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(
      ClienteService.REPO_CLIENTES, JSON.stringify(storage)
    );
  }

  buscarClientePorId(id: string) : Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes: Cliente[] = this.obterStorage();

    if(!nomeBusca){
      return clientes;
    }

    return clientes.filter(
      cliente => cliente.nome?.indexOf(nomeBusca) !== -1
    )
  }

  private obterStorage(): Cliente[]{
    const repositorioClientes = localStorage.getItem(
      ClienteService.REPO_CLIENTES
    );
    if(repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(
      ClienteService.REPO_CLIENTES, JSON.stringify(clientes)
    );

    return clientes;


  }
}
