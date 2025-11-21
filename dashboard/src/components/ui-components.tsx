import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white rounded-lg shadow-md p-6", className)}>
      {children}
    </div>
  );
}

export function Metric({ title, value, helpText }: { title: string; value: string | number; helpText?: string }) {
  return (
    <Card className="flex flex-col items-center justify-center text-center border border-gray-200">
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      {helpText && <p className="text-xs text-gray-400 mt-2">{helpText}</p>}
    </Card>
  );
}

export function Header() {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">Uniswap Tokens</h1>
      <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-4 bg-amber-50 p-6 rounded-xl border border-amber-100">
        <p>
          This dashboard offers an in-depth analysis of token activity on Uniswap, focusing on trends across multiple chains and Uniswap versions.
          It addresses key questions such as the growth of unique tokens over time, shifts in popular token pairs, and differences in token activity across chains.
          The analysis covers the following blockchains: Arbitrum, Avalanche, Base, Binance Smart Chain (BSC), Ethereum, Optimism, and Polygon.
        </p>
      </div>
    </div>
  );
}

export function SectionHeader({ title }: { title: string }) {
    return (
        <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            {title && (
                <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">{title}</span>
                </div>
            )}
            {!title && (
                <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-gray-500">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                    </span>
                </div>
            )}
        </div>
    )
}
