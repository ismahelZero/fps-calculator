export const useAffiliate = () => {
  // 1. CONFIGURATION: Your Tags for each country
  // Replace these with your actual IDs later!
  const affiliates = {
    US: { domain: 'amazon.com', tag: 'myfps-20' },
    UK: { domain: 'amazon.co.uk', tag: 'myfps-21' },
    CA: { domain: 'amazon.ca', tag: 'myfps-20' },
    DE: { domain: 'amazon.de', tag: 'myfps-21' },
    FR: { domain: 'amazon.fr', tag: 'myfps-21' },
    ES: { domain: 'amazon.es', tag: 'myfps-21' },
    IT: { domain: 'amazon.it', tag: 'myfps-21' },
    JP: { domain: 'amazon.co.jp', tag: 'myfps-22' },
    // Fallback for everyone else
    DEFAULT: { domain: 'amazon.com', tag: 'myfps-20' }
  }

  // 2. LOGIC: Detect Country from Timezone
  // This is a fast, client-side heuristic (no API calls needed)
  const getCountryCode = () => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''

      if (tz.startsWith('Europe/London')) return 'UK'
      if (tz.startsWith('Europe/Berlin')) return 'DE'
      if (tz.startsWith('Europe/Paris')) return 'FR'
      if (tz.startsWith('Europe/Madrid')) return 'ES'
      if (tz.startsWith('Europe/Rome')) return 'IT'
      if (
        tz.startsWith('America/Toronto') ||
        tz.startsWith('America/Vancouver')
      )
        return 'CA'
      if (tz.startsWith('Asia/Tokyo')) return 'JP'

      // Default to US for generic 'America' zones or unknown
      return 'US'
    } catch (e) {
      return 'US'
    }
  }

  // 3. MAIN FUNCTION: Generate the Link
  const getLink = (productName: string) => {
    if (!productName) return '#'

    // Clean string (e.g. "NVIDIA GeForce RTX 4060" -> "NVIDIA+GeForce+RTX+4060")
    const query = productName.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '+')

    const country = getCountryCode()
    const store =
      affiliates[country as keyof typeof affiliates] || affiliates.DEFAULT

    return `https://www.${store.domain}/s?k=${query}&tag=${store.tag}`
  }

  return { getLink }
}
