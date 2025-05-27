import type {CustomerFragment} from 'customer-accountapi.generated';
import type {CustomerUpdateInput} from '@shopify/hydrogen/customer-account-api-types';
import {CUSTOMER_UPDATE} from '~/graphql/customer-account/CustomerUpdateMutation';
import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
  type MetaFunction,
} from 'react-router';
import {User, Save, AlertCircle, CheckCircle} from 'lucide-react';
import {useConfig} from '~/utils/themeContext';

export type ActionResponse = {
  error: string | null;
  customer: CustomerFragment | null;
};

export const meta: MetaFunction = () => {
  const config = useConfig();
  return [{title: `${config.brandName} | Profile`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  await context.customerAccount.handleAuthStatus();

  return {};
}

export async function action({request, context}: ActionFunctionArgs) {
  const {customerAccount} = context;

  if (request.method !== 'PUT') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const form = await request.formData();

  try {
    const customer: CustomerUpdateInput = {};
    const validInputKeys = ['firstName', 'lastName'] as const;
    for (const [key, value] of form.entries()) {
      if (!validInputKeys.includes(key as any)) {
        continue;
      }
      if (typeof value === 'string' && value.length) {
        customer[key as (typeof validInputKeys)[number]] = value;
      }
    }

    // update customer and possibly password
    const {data, errors} = await customerAccount.mutate(
      CUSTOMER_UPDATE,
      {
        variables: {
          customer,
        },
      },
    );

    if (errors?.length) {
      throw new Error(errors[0].message);
    }

    if (data?.customerUpdate?.userErrors?.length) {
      throw new Error(data.customerUpdate.userErrors[0].message);
    }

    // Refetch customer data after update
    const { data: customerData } = await customerAccount.query(
      `query GetUpdatedCustomer {
        customer {
          id
          firstName
          lastName
        }
      }`
    );

    return {
      error: null,
      customer: customerData?.customer,
    };
  } catch (error: any) {
    return data(
      {error: error.message, customer: null},
      {
        status: 400,
      },
    );
  }
}

export default function AccountProfile() {
  const account = useOutletContext<{customer: CustomerFragment}>();
  const {state} = useNavigation();
  const action = useActionData<ActionResponse>();
  const customer = action?.customer ?? account?.customer;
  const config = useConfig();

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-sm p-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <User className="w-6 h-6 text-gold-500 mr-3" />
        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
      </div>

      {/* Success Message */}
      {action?.customer && !action?.error && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-sm flex items-center">
          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
          <span className="text-green-300">Profile updated successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {action?.error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-sm flex items-center">
          <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
          <span className="text-red-300">{action.error}</span>
        </div>
      )}

      {/* Form */}
      <Form method="PUT" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label 
              htmlFor="firstName" 
              className="block text-sm font-bold text-gold-500 mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Enter your first name"
              aria-label="First name"
              defaultValue={customer.firstName ?? ''}
              minLength={2}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-300"
            />
          </div>

          {/* Last Name */}
          <div>
            <label 
              htmlFor="lastName" 
              className="block text-sm font-bold text-gold-500 mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Enter your last name"
              aria-label="Last name"
              defaultValue={customer.lastName ?? ''}
              minLength={2}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-sm py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-300"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={state !== 'idle'}
            className="inline-flex items-center bg-gold-500 hover:bg-gold-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-8 rounded-sm transition-all duration-300 uppercase tracking-wider"
          >
            <Save className="w-4 h-4 mr-2" />
            {state !== 'idle' ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </Form>

      {/* Championship Note */}
      <div className="mt-8 p-4 bg-gradient-to-r from-gold-900/20 via-gold-500/10 to-gold-900/20 border border-gold-500/30 rounded-sm">
        <p className="text-gray-300 text-sm leading-relaxed">
          Keep your profile updated to ensure you receive the latest news about {config.brandName}'s championship collection and exclusive offers.
        </p>
      </div>
    </div>
  );
}
