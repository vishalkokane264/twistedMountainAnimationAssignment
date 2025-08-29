import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {
  users: any[] = [];
  tableHeaders: string[] = [];
  loading = true;
  editingCell: { row: number, column: string } | null = null;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetState();
    this.loadUsers();
  }

  resetState(): void {
    this.loading = true;
    this.users = [];
    this.tableHeaders = [];
    this.editingCell = null;
  }

  loadUsers(): void {
    this.loading = true;
    
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        if (data.length > 0) {
          this.tableHeaders = Object.keys(data[0]);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  onRowClick(user: any, index: number): void {
    this.router.navigate(['/user', user.id]);
  }

  startEditing(rowIndex: number, column: string): void {
    this.editingCell = { row: rowIndex, column: column };
  }

  stopEditing(): void {
    this.editingCell = null;
  }

  updateValue(rowIndex: number, column: string, event: any): void {
    this.users[rowIndex][column] = event.target.textContent;
    this.stopEditing();
  }

  isEditing(rowIndex: number, column: string): boolean {
    return this.editingCell?.row === rowIndex && this.editingCell?.column === column;
  }
}
