import React from "react";
import { Activity } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#FBFBFD] dark:bg-[#1D1D1F] border-t border-zinc-200 dark:border-zinc-800 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-apple-blue to-apple-blue-bright flex items-center justify-center">
                <Activity className="text-white h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">AI Analyst</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Making data analysis accessible to everyone through the power of generative AI.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">How It Works</Link></li>
              <li><Link href="/dashboard" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-text-secondary hover:text-apple-blue transition-colors">Community</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-text-secondary mb-4 md:mb-0">
            © {new Date().getFullYear()} AI Analyst Dashboard. All rights reserved.
          </p>
          <div className="flex space-x-6">
             <span className="text-xs text-text-secondary">Designed with ❤️ using HIG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
