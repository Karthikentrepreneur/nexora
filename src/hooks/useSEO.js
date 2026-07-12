import { useEffect } from 'react';
import { getSeoMetadata } from '../utils/seoData';

/**
 * Custom React Hook to dynamically apply SEO meta tags for a page.
 * @param {string} pageKey The unique identifier of the page (e.g. 'home', 'about', 'contact')
 */
const useSEO = (pageKey) => {
  useEffect(() => {
    let active = true;

    const applySEO = async () => {
      try {
        const seoList = await getSeoMetadata();
        if (!active) return;
        
        const seoItem = seoList.find(item => item.page_key === pageKey);
        if (seoItem) {
          // 1. Update Document Title
          if (seoItem.title) {
            document.title = seoItem.title;
          }

          // 2. Update Meta Description
          if (seoItem.description) {
            let descMeta = document.querySelector('meta[name="description"]');
            if (!descMeta) {
              descMeta = document.createElement('meta');
              descMeta.name = 'description';
              document.head.appendChild(descMeta);
            }
            descMeta.content = seoItem.description;
          }

          // 3. Update Meta Keywords
          if (seoItem.keywords) {
            let keywordsMeta = document.querySelector('meta[name="keywords"]');
            if (!keywordsMeta) {
              keywordsMeta = document.createElement('meta');
              keywordsMeta.name = 'keywords';
              document.head.appendChild(keywordsMeta);
            }
            keywordsMeta.content = seoItem.keywords;
          }

          // 4. Update Robots Meta
          if (seoItem.robots) {
            let robotsMeta = document.querySelector('meta[name="robots"]');
            if (!robotsMeta) {
              robotsMeta = document.createElement('meta');
              robotsMeta.name = 'robots';
              document.head.appendChild(robotsMeta);
            }
            robotsMeta.content = seoItem.robots;
          }
        }
      } catch (err) {
        console.error('Failed to apply SEO meta tags:', err);
      }
    };

    applySEO();

    return () => {
      active = false;
    };
  }, [pageKey]);
};

export default useSEO;
