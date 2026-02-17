'use client';

import { OrganizationSwitcher } from '@clerk/nextjs';
import Link from 'next/link';

export default function OrganizationSwitcherPage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 p-8 space-y-6 w-full max-w-lg">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
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
            afterSwitchOrganizationUrl="/"
            afterCreateOrganizationUrl="/"
          />
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button className="text-slate-600 hover:text-slate-900">
            <Link href="/">
              Back to Dashboard
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
