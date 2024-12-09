import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private adminUsers = [
    { username: 'admin1', password: 'admin123' },
    { username: 'admin2', password: 'admin456' }
  ];

  constructor() {}
  validateAdmin(username: string, password: string): boolean {
    return this.adminUsers.some(
      admin => admin.username === username && admin.password === password
    );
  }
}
