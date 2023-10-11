import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { RouterGuardService } from '../service/router-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ManageBillComponent } from './manage-bill/manage-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';



export const MaterialRoutes: Routes = [
    {
        path:"category",
        component:ManageCategoryComponent,
        canActivate:[RouterGuardService],
        data:{
            expectedRole : ['admin']
        }
    },{
        path:"product",
        component:ManageProductComponent,
        canActivate:[RouterGuardService],
        data:{
            expectedRole : ['admin']
        }
    },{
        path:"order",
        component:ManageOrderComponent,
        canActivate:[RouterGuardService],
        data:{
            expectedRole:["admin","user"]
        }
    },  {
        path: 'bill',
        component: ManageBillComponent,
        canActivate: [RouterGuardService],
        data: {
          expectedRole: ['admin', 'user'],
        },
      },
      {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouterGuardService],
        data: {
          expectedRole: ['admin'],
        },
      },
];
