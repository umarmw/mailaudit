import * as cheerio from 'cheerio';

// Helper function to get the HTTP status code of a URL
async function getStatusCode(url: string): Promise<number | null | string> {
    try {
        const res = await fetch(url, { method: 'HEAD' }); // Use 'HEAD' to only get headers (faster)
        return res.status;
    } catch (error) {
        // console.error(`Error fetching ${url}:`, error);
        return "Invalid URL"; // Return null if there's an error (e.g., invalid URL or network issue)
    }
}

// Helper function to clean the text content
function cleanText(text: string): string {
    return text
        .replace(/\s+/g, ' ') // Replace multiple spaces, newlines, and tabs with a single space
        .trim(); // Trim leading and trailing spaces
}

export const extract = async (data: any) => {

    // console.log(data)
    // Load the HTML content into cheerio
    const $ = cheerio.load(data);

    // Extract all <a> tags and their href attributes
    let links = $("a")
        .map((_, el) => ({
            href: $(el).attr("href") || "", // Get href attribute or empty string
            // text: $(el).text(), // Get the link text
            text: cleanText($(el).text()), // Clean the link text
        }))
        .get(); // Convert to array

    // Extract all <img> tags and their src and alt attributes
    let images = $("img")
        .map((_, el) => ({
            src: $(el).attr("src") || "", // Get src attribute or empty string
            alt: $(el).attr("alt") || "", // Get alt attribute or empty string
        }))
        .get(); // Convert to array

    // Extract metadata from <meta> tags
    const metadata = {
        title: $("title").text(), // Get the page title
        description: $('meta[name="description"]').attr("content") || "", // Get meta description
        keywords: $('meta[name="keywords"]').attr("content") || "", // Get meta keywords
        ogTitle: $('meta[property="og:title"]').attr("content") || "", // Get OpenGraph title
        ogDescription: $('meta[property="og:description"]').attr("content") || "", // Get OpenGraph description
    };

    return [links, images, metadata];
}

export const getLinkStatus = async (links: any) => {
    // Filter out empty href/src values and check for status codes
    links = await Promise.all(
        links
            .filter((link:any) => link.href) // Filter out empty href
            .map(async (link:any) => {
                const status = await getStatusCode(link.href);
                return { ...link, status };
            })
    );
    return links;
}

export const getImageStatus = async (images: any) => {
    images = await Promise.all(
        images
            .filter((img:any) => img.src) // Filter out empty src
            .map(async (img:any) => {
                const status = await getStatusCode(img.src);
                return { ...img, status };
            })
    );
    return images;
}