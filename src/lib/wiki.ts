
export interface WikiData {
    title: string;
    image?: string;
    description?: string;
    lat?: number;
    lon?: number;
}

export async function fetchWikiBatch(titles: string[]): Promise<Record<string, WikiData>> {
    if (titles.length === 0) return {};
    
    // Wikipedia supports up to 50 titles per request
    const titlesQuery = titles.map(t => encodeURIComponent(t)).join('|');
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts|coordinates&exintro&explaintext&titles=${titlesQuery}&format=json&origin=*&pithumbsize=1000`;
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        const results: Record<string, WikiData> = {};
        
        Object.values(pages).forEach((page: any) => {
            if (page.pageid) {
                results[page.title] = {
                    title: page.title,
                    image: page.thumbnail?.source,
                    description: page.extract,
                    lat: page.coordinates?.[0]?.lat,
                    lon: page.coordinates?.[0]?.lon
                };
            }
        });
        
        return results;
    } catch (e) {
        console.error(`Error fetching wiki batch:`, e);
        return {};
    }
}

