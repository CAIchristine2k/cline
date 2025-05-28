import {Link, useLoaderData, type MetaFunction} from 'react-router';
import {
  Money,
  getPaginationVariables,
  flattenConnection,
} from '@shopify/hydrogen';
import {redirect, type LoaderFunctionArgs} from 'react-router';
import type {
  CustomerOrdersFragment,
  OrderItemFragment,
} from 'customer-accountapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {Package, Calendar, CreditCard, Truck, Eye, ShoppingBag} from 'lucide-react';
import {getConfig} from '~/utils/config';

// Temporary placeholder query
const CUSTOMER_ORDERS_QUERY = `#graphql
  query CustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 20) {
        nodes {
          id
          name
          processedAt
          financialStatus
          totalPrice {
            amount
            currencyCode
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
`;

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [{title: `${config.brandName} | Orders`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 20,
  });
  
  // Get customer access token
  await context.customerAccount.handleAuthStatus();
  const customerAccessToken = await context.customerAccount.getAccessToken();
  
  if (!customerAccessToken) {
    return redirect('/account/login');
  }
  
  const response = await context.customerAccount.query(CUSTOMER_ORDERS_QUERY, {
    variables: {
      ...paginationVariables,
      customerAccessToken,
    },
  });
  const customer = response.data?.customer;

  // Get configuration
  const config = getConfig();

  return {
    customer,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

export default function Orders() {
  const {customer, config} = useLoaderData<{customer: CustomerOrdersFragment, config: any}>();
  const {orders} = customer;
  
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Package className="w-6 h-6 text-primary mr-3" />
        <h2 className="text-2xl font-bold text-white">Order History</h2>
      </div>

      {orders.nodes.length ? <OrdersTable orders={orders} /> : <EmptyOrders />}
    </div>
  );
}

function OrdersTable({orders}: Pick<CustomerOrdersFragment, 'orders'>) {
  return (
    <div className="space-y-6">
      <PaginatedResourceSection connection={orders}>
        {({node: order}) => <OrderItem key={order.id} order={order} />}
      </PaginatedResourceSection>
    </div>
  );
}

function EmptyOrders() {
  const {config} = useLoaderData<{customer: CustomerOrdersFragment; config: any}>();
  
  return (
    <div className="text-center py-16">
      <div className="mb-8">
        <ShoppingBag className="h-24 w-24 text-gray-600 mx-auto mb-6" />
        <h3 className="text-xl font-bold text-gray-400 mb-4">
          No orders yet
        </h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                      You haven't placed any orders yet. Start building your championship collection with {config.influencerName}'s premium gear.
        </p>
      </div>
      
      <Link 
        to="/collections/all"
        className="group inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-black font-bold py-4 px-8 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Start Shopping
      </Link>
    </div>
  );
}

function OrderItem({order}: {order: OrderItemFragment}) {
  const fulfillmentStatus = flattenConnection(order.fulfillments)[0]?.status || 'UNFULFILLED';
  
  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    
    switch (status.toLowerCase()) {
      case 'paid':
      case 'fulfilled':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'pending':
      case 'unfulfilled':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'cancelled':
      case 'refunded':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };
  
  return (
    <div className="border-b border-gray-800 py-6 last:border-b-0">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Order Info */}
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <Link 
              to={`/account/orders/${btoa(order.id)}`}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-300"
            >
              #{order.number}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {/* Date */}
            <div className="flex items-center text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>{new Date(order.processedAt).toLocaleDateString()}</span>
            </div>
            
            {/* Financial Status */}
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
              <span className={`px-2 py-1 rounded-sm text-xs font-bold border ${getStatusColor(order.financialStatus)}`}>
                {order.financialStatus}
              </span>
            </div>
            
            {/* Fulfillment Status */}
            {fulfillmentStatus && (
              <div className="flex items-center">
                <Truck className="w-4 h-4 mr-2 text-gray-400" />
                <span className={`px-2 py-1 rounded-sm text-xs font-bold border ${getStatusColor(fulfillmentStatus)}`}>
                  {fulfillmentStatus}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Total & Actions */}
        <div className="flex items-center justify-between lg:justify-end gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-1">Total</div>
            <Money 
              data={order.totalPrice} 
              className="text-xl font-bold text-primary"
            />
          </div>
          
          <Link 
            to={`/account/orders/${btoa(order.id)}`}
            className="inline-flex items-center bg-gray-700 hover:bg-primary text-white hover:text-black px-4 py-2 rounded-sm transition-all duration-300 text-sm font-bold"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
}
