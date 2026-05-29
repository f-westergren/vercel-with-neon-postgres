'use client';

import { OrganizationSwitcher, useOrganizationList } from '@clerk/nextjs';
import Link from 'next/link';

export default function OrganizationSwitcherPage() {
  const { isLoaded, userMemberships } = useOrganizationList({ userMemberships: true});

  console.log('isLoaded: ', isLoaded, ' isLoading: ', userMemberships.isLoading, ' isFetching: ', userMemberships.isFetching, ' data: ', userMemberships.data);  

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 space-y-6 w-full max-w-lg">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Switch Organization
          </h1>
          <p className="text-slate-600 text-base">
            Select a different organization or create a new one to continue
          </p>
        </div>

        {/* Organization Switcher */}
        <div className="flex justify-center">
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox: 'flex justify-center',
                organizationSwitcherTrigger: 'mx-auto',
                organizationPreview: 'mx-auto',
                organizationPreviewText: 'text-slate-900',
                organizationPreviewSecondaryIdentifier: 'text-slate-500',
                popoverCard: 'shadow-lg border border-slate-200',
                organizationSwitcherPopoverCard: 'shadow-xl',
              },
            }}
            afterCreateOrganizationUrl="/"
          />
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
