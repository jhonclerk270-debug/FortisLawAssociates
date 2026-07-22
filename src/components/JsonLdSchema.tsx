import React, { useEffect } from 'react';

export const JsonLdSchema: React.FC = () => {
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Fortis Law Associates Advocates & Corporate Legal Consultants",
      "image": "https://images.unsplash.com/photo-1556157382-97eda2d62296",
      "@id": "https://fortislaw.pk",
      "url": "https://fortislaw.pk",
      "telephone": "+923080291021",
      "email": "fortislaw313@gmail.com",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Fareed Chambers 3rd Floor, Abdullah Haroon Road, Saddar",
        "addressLocality": "Karachi",
        "addressRegion": "Sindh",
        "postalCode": "74400",
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 33.7294,
        "longitude": 73.0551
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "08:30",
        "closes": "19:00"
      },
      "sameAs": [
        "https://www.linkedin.com/company/kakakhel-law-associates",
        "https://twitter.com/kakakhellaw"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-legal-service';
    script.text = JSON.stringify(schemaData);

    const existingScript = document.getElementById('json-ld-legal-service');
    if (existingScript) {
      existingScript.remove();
    }
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('json-ld-legal-service');
      if (el) el.remove();
    };
  }, []);

  return null;
};
