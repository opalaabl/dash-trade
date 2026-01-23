import { useEffect } from 'react';

export const useDynamicTitle = (price: number | null, pair: string) => {
  useEffect(() => {
    if (price !== null && !isNaN(price)) {
      document.title = `${price.toLocaleString('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      })} | ${pair} | Trade | Dash`;
    } else {
      document.title = 'Dash';
    }
  }, [price, pair]);
};
