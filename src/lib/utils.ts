import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { performance } from 'node:perf_hooks';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currencyCode?: string, locale?: string) {
	try {
		// Note: if no `locale` is provided, the browser's default
		// locale will be used.
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode || 'USD'
		}).format(value);
	} catch {
		// A fallback in case the NumberFormat fails for any reason
		return value.toFixed(2);
	}
}

async function trackPerformance<T>(
	name: string,
	operation: () => Promise<T>,
	logger?: (duration: number, result: T) => void
): Promise<T> {
	const start = performance.now();
	const result = await operation();
	const duration = performance.now() - start;

	console.log(`[Performance] ${name} took ${duration.toFixed(2)}ms`);

	if (logger) {
		logger(duration, result);
	}

	return result;
}
