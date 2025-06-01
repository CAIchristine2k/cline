import {type LoaderFunctionArgs} from 'react-router';
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  Link,
  type MetaFunction,
} from 'react-router';
import {CUSTOMER_DETAILS_QUERY} from '~/graphql/customer-account/CustomerDetailsQuery';
import {ArrowLeft, User, Package, MapPin, LogOut} from 'lucide-react';
import {getConfig} from '~/utils/config';

export const meta: MetaFunction = () => {
  const config = getConfig();
  return [{title: `${config.brandName} | Account`}];
};

export function shouldRevalidate() {
  return true;
}

export async function loader({context}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  const heading = 'Account';

  // Fetch the customer information
  const response = await context.customerAccount.query(CUSTOMER_DETAILS_QUERY);
  const customer = response.data?.customer;

  // Get configuration
  const config = getConfig();

  return {
    customer,
    heading,
    config: {
      ...config,
      theme: config.influencerName.toLowerCase().replace(/\s+/g, '-'),
    },
  };
}

export default function AccountLayout() {
  const {customer, heading, config} = useLoaderData<typeof loader>();

  return (
    <div data-theme={config.theme} className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Account Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-primary/20 text-primary text-sm font-bold tracking-wider uppercase mb-4 rounded-sm">
            My Account
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{heading}</h1>
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
    return `flex items-center px-4 py-2 ${
      isActive
        ? 'bg-primary text-black font-bold'
        : 'bg-gray-800 text-white hover:bg-gray-700'
    } rounded-sm transition-colors duration-300`;
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
    <Form action="/account/logout" method="POST" className="flex">
      <button
        type="submit"
        className="flex items-center px-4 py-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 rounded-sm transition-colors duration-300"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign out</span>
      </button>
    </Form>
  );
}
