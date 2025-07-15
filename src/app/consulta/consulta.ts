import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatIconModule} from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';


@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta implements OnInit {
  
  nomeBusca = '';
  listaClientes: Cliente[] = [];
  ColunasTable: string[] = ["Id", "Nome", "CPF", "Data Nascimento", "Email", "Acoes"];

  constructor(
    private service: ClienteService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar(){
    this.listaClientes = this.service.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: String){
    this.router.navigate(['/cadastro'], {queryParams: {"id": id}})
  }
}
