import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // Daha spesifik locale'ler
  locales: ['en_EN', 'en_US', 'tr_TR'],
 
  // Eşleşme olmazsa kullanılacak varsayılan locale
  defaultLocale: 'en_EN'
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);
