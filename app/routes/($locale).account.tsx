import {
  data as remixData,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Form, NavLink, Outlet, useLoaderData, Link, type MetaFunction} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {ArrowLeft, User, Package, MapPin, LogOut} from 'lucide-react';

export const meta: MetaFunction = () => {
  return [{title: `Sugar Shane | Account`}];
};

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: LoaderFunctionArgs) {
  const {data, errors} = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  );

  if (errors?.length || !data?.customer) {
    throw new Error('Customer not found');
  }

  return remixData(
    {customer: data.customer},
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    },
  );
}

export default function AccountLayout() {
  const {customer} = useLoaderData<typeof loader>();

  const heading = customer
    ? customer.firstName
      ? `Welcome, ${customer.firstName}`
      : `Welcome to your account.`
    : 'Account Details';

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-gold-500 hover:text-gold-400 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-gold-500/20 text-gold-500 text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            Account
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {heading}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Manage your account, view orders, and update your information.
          </p>
        </div>

        {/* Account Navigation */}
        <div className="mb-12">
          <AccountMenu />
        </div>

        {/* Account Content */}
        <div className="max-w-4xl mx-auto">
          <Outlet context={{customer}} />
        </div>
      </div>
    </div>
  );
}

function AccountMenu() {
  function getNavLinkClass({isActive}: {isActive: boolean}) {
    return `flex items-center space-x-2 px-6 py-3 rounded-sm border transition-all duration-300 ${
      isActive
        ? 'bg-gold-500 text-black border-gold-500 font-bold'
        : 'bg-gray-900/80 text-white border-gray-800 hover:border-gold-500 hover:text-gold-500'
    }`;
  }

  return (
    <nav className="flex flex-wrap justify-center gap-4">
      <NavLink to="/account/orders" className={getNavLinkClass}>
        <Package className="w-4 h-4" />
        <span>Orders</span>
      </NavLink>
      
      <NavLink to="/account/profile" className={getNavLinkClass}>
        <User className="w-4 h-4" />
        <span>Profile</span>
      </NavLink>
      
      <NavLink to="/account/addresses" className={getNavLinkClass}>
        <MapPin className="w-4 h-4" />
        <span>Addresses</span>
      </NavLink>
      
      <Logout />
    </nav>
  );
}

function Logout() {
  return (
    <Form method="POST" action="/account/logout">
      <button 
        type="submit"
        className="flex items-center space-x-2 px-6 py-3 rounded-sm border bg-red-900/20 text-red-400 border-red-800 hover:border-red-500 hover:text-red-300 transition-all duration-300"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </Form>
  );
}
