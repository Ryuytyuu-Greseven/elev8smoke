import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService, Order } from '../../../services/orders.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [
    // {
    //   _id: '3456789',
    //   createdAt: '25-09-2024',
    //   mobileNumber: '2345664342',
    //   total: 567.78,
    //   status: 1,
    //   items: [],
    // },
  ];
  loading: boolean = true;
  error: string | null = null;

  pagination = {
    pageNo: 1,
    pageSize: 10,
    search: '',
  };

  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = null;

    const body = {
      pageNo: this.pagination.pageNo,
      pageSize: this.pagination.pageSize,
      search: this.pagination.search,
    };

    this.ordersService.getAllOrders(body).subscribe({
      next: (response) => {
        console.log('resonse of orders', response);
        if (response.success) {
          this.orders = response.data;
        } else {
          // this.error = 'Failed to load orders';
        }
        this.loading = false;
      },
      error: (err) => {
        // this.error = 'Error loading orders';
        this.loading = false;
        console.error('Error loading orders:', err);
      },
    });
  }

  onSearch() {
    this.pagination.pageNo = 1;
    this.loadOrders();
  }

  onPagination(value: boolean) {
    if(this.loading){
      return;
    }
    if (value) {
      this.pagination.pageNo = this.pagination.pageNo + 1;
    } else {
      this.pagination.pageNo = this.pagination.pageNo - 1 ? this.pagination.pageNo - 1 : 1;
    }
    this.loadOrders();
  }

  viewOrderDetails(orderId: string) {
    this.router.navigate(['/admin/orders', orderId]);
  }

  getStatusClass(status: number): string {
    switch (status) {
      case 1:
        return 'status-pending';
      case 2:
        return 'status-processing';
      case 3:
        return 'status-completed';
      case 4:
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
      minute: '2-digit',
    });
  }
}
