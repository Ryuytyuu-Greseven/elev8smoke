import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService, Order } from '../../../services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order: Order | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetails(orderId);
    } else {
      this.error = 'Order ID not found';
      this.loading = false;
    }
  }

  loadOrderDetails(orderId: string) {
    this.loading = true;
    this.error = null;

    this.ordersService.getOrderDetails(orderId).subscribe({
      next: (response) => {
        if (response.success) {
          this.order = response.data;
        } else {
          this.error = 'Failed to load order details';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading order details';
        this.loading = false;
        console.error('Error loading order details:', err);
      }
    });
  }

  updateOrderStatus(event: any) {
    const status = event.target.value;
    if (!this.order) return;

    this.ordersService.updateOrderStatus(this.order._id, status).subscribe({
      next: (response) => {
        if (response.success && this.order) {
          this.order.status = status;
        }
      },
      error: (err) => {
        console.error('Error updating order status:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/orders']);
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
