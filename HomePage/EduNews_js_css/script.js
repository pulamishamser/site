  // Enhanced news sources with multiple fallback options
    const newsSources = [
        {
            name: "OnlineKhabar",
            rss: "https://www.onlinekhabar.com/rss",
            logo: "https://www.onlinekhabar.com/wp-content/themes/onlinekhabar-20/img/logo.png",
            fallbacks: [
                "https://api.rss2json.com/v1/api.json?rss_url=https://www.onlinekhabar.com/rss",
                "https://corsproxy.io/?https://www.onlinekhabar.com/rss",
                "https://api.allorigins.win/get?url=https://www.onlinekhabar.com/rss"
            ],
            maxItems: 5
        },
        {
            name: "Setopati",
            rss: "https://setopati.com/rss",
            logo: "https://setopati.com/images/logo.png",
            fallbacks: [
                "https://api.rss2json.com/v1/api.json?rss_url=https://setopati.com/rss",
                "https://corsproxy.io/?https://setopati.com/rss"
            ],
            maxItems: 5
        },
        {
            name: "Ratopati",
            rss: "https://ratopati.com/rss",
            logo: "https://ratopati.com/static/media/ratopati-logo.6b7d1b3f.png",
            fallbacks: [
                "https://api.rss2json.com/v1/api.json?rss_url=https://ratopati.com/rss",
                "https://corsproxy.io/?https://ratopati.com/rss"
            ],
            maxItems: 5
        },
        {
            name: "EduKhabar",
            rss: "https://edukhabar.com/feed",
            logo: "https://edukhabar.com/wp-content/uploads/2020/05/cropped-edukhabar-logo-32x32.png",
            fallbacks: [
                "https://api.rss2json.com/v1/api.json?rss_url=https://edukhabar.com/feed",
                "https://corsproxy.io/?https://edukhabar.com/feed"
            ],
            maxItems: 4
        },
        {
            name: "Himalayan Times",
            rss: "https://thehimalayant