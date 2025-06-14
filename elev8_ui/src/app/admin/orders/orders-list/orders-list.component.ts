import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService, Order } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = null;

    this.ordersService.getAllOrders().subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.data;
        } else {
          this.error = 'Failed to load orders';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading orders';
        this.loading = false;
        console.error('Error loading orders:', err);
      }
    });
  }

  viewOrderDetails(orderId: string) {
    this.router.navigate(['/admin/orders', orderId]);
  }

  getStatusClass(status: Order['status']): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
