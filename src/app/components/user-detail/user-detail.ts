import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {
  user: any = null;
  userId: string = '';
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      
      if (this.userId) {
        this.loadUser();
      } else {
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadUser(): void {
    this.loading = true;
    this.error = false;
    this.user = null;
    
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        if (user) {
          this.user = user;
        } else {
          this.error = true;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  getUserKeys(): string[] {
    return this.user ? Object.keys(this.user) : [];
  }
}
