
import { useEffect } from 'react';
import { Translations } from '@/utils/languageUtils';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
