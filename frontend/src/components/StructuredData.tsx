export default function StructuredData() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "BlogAgent AI",
        "operatingSystem": "Web",
        "applicationCategory": "ProductivityApplication",
        "description": "Premium AI Blog Generation Agent powered by Gemini 2.0. Research-backed content and AI images.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
