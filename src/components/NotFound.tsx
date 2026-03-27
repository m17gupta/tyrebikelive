"use client"

import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound({ slug = "unknown-page", locale = "en" }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Large Text */}
        <div className="relative">
          <h1 className="text-9xl font-black text-slate-200 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-16 h-16 text-slate-400 animate-pulse" />
          </div>
        </div>

        {/* Main Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-3xl font-bold text-slate-800">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            We couldn't find the page you're looking for with slug{' '}
            <span className="font-mono text-sm bg-slate-200 px-2 py-1 rounded">
              {slug}
            </span>
            {' '}for locale{' '}
            <span className="font-mono text-sm bg-slate-200 px-2 py-1 rounded">
              {locale}
            </span>
          </p>
          <p className="text-slate-500">
            This page may have been moved, deleted, or doesn't exist in your CMS.
          </p>
        </div>

        {/* Action Buttons */}

        {/* Helper Links */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">
            You might want to try:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/" className="text-slate-600 hover:text-slate-900 underline underline-offset-4">
              Homepage
            </a>
            <a href="/search" className="text-slate-600 hover:text-slate-900 underline underline-offset-4">
              Search
            </a>
            <a href="/contact" className="text-slate-600 hover:text-slate-900 underline underline-offset-4">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
