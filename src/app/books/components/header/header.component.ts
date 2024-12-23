import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { NgStyle } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, SplitButtonModule, InputTextModule, NgStyle, TabMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Lista de livros', icon: 'pi pi-home' },
            { label: 'Tabela de livros', icon: 'pi pi-home' },
            { label: 'Lista de editoras', icon: 'pi pi-home' },
            { label: 'Lista de autores', icon: 'pi pi-home' },
            { label: 'Buscar livro por ID', icon: 'pi pi-chart-line' },
            { label: 'Cadastrar um novo livro', icon: 'pi pi-list' },
            { label: 'Messages', icon: 'pi pi-inbox' }
        ]
    }
}
