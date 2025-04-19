
    // Enhanced news sources with multiple fallback options
    const newsSources = [
      {
        name: "OnlineKhabar",
        rss: "https://www.onlinekhabar.com/rss",
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
        fallbacks: [
          "https://api.rss2json.com/v1/api.json?rss_url=https://setopati.com/rss",
          "https://corsproxy.io/?https://setopati.com/rss"
        ],
        maxItems: 5
      },
      {
        name: "Ratopati",
        rss: "https://ratopati.com/rss",
        fallbacks: [
          "https://api.rss2json.com/v1/api.json?rss_url=https://ratopati.com/rss",
          "https://corsproxy.io/?https://ratopati.com/rss"
        ],
        maxItems: 5
      },
      {
        name: "EduKhabar",
        rss: "https://edukhabar.com/feed",
        fallbacks: [
          "https://api.rss2json.com/v1/api.json?rss_url=https://edukhabar.com/feed",
          "https://corsproxy.io/?https://edukhabar.com/feed"
        ],
        maxItems: 4
      },
      {
        name: "Himalayan Times",
        rss: "https://thehimalayantimes.com/feed",
        fallbacks: [
          "https://api.rss2json.com/v1/api.json?rss_url=https://thehimalayantimes.com/feed",
          "https://corsproxy.io/?https://thehimalayantimes.com/feed"
        ],
        maxItems: 4
      }
    ];

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Cache for storing fetched news
    const newsCache = {
      data: {},
      lastUpdated: null,
      set: function(source, items) {
        this.data[source] = {
          items: items,
          timestamp: new Date().getTime()
        };
      },
      get: function(source) {
        const cache = this.data[source];
        if (!cache) return null;
        
        // Cache valid for 15 minutes
        const isFresh = (new Date().getTime() - cache.timestamp) < (15 * 60 * 1000);
        return isFresh ? cache.items : null;
      }
    };

    // Main function to fetch and display news
    async function fetchAndDisplayNews() {
      const container = document.getElementById('news-container');
      
      try {
        // Show skeleton loading state
        document.getElementById('skeleton-loading').style.display = 'block';
        
        // Fetch all news sources in parallel with retries
        const newsPromises = newsSources.map(source => {
          const cached = newsCache.get(source.name);
          if (cached) return Promise.resolve(cached);
          return fetchWithRetries(source);
        });
        
        const results = await Promise.allSettled(newsPromises);
        
        // Hide skeleton loading
        document.getElementById('skeleton-loading').style.display = 'none';
        
        // Clear container and build news sections
        container.innerHTML = '';
        
        results.forEach((result, index) => {
          const source = newsSources[index];
          const section = document.createElement('div');
          section.className = 'news-section';
          
          section.innerHTML = `
            <h2 class="news-source-title">
              ${source.name}
            </h2>
            <div class="news-list" id="${source.name.toLowerCase().replace(/\s+/g, '-')}-news"></div>
          `;
          
          const listDiv = section.querySelector('.news-list');
          
          if (result.status === 'fulfilled' && result.value && result.value.length > 0) {
            // Cache the successful fetch
            newsCache.set(source.name, result.value);
            
            // Limit items based on source configuration
            const itemsToShow = result.value.slice(0, source.maxItems || 5);
            
            itemsToShow.forEach(item => {
              const newsItem = createNewsItem(item);
              listDiv.appendChild(newsItem);
            });
          } else {
            // Try to show cached data if available
            const cached = newsCache.get(source.name);
            if (cached && cached.length > 0) {
              cached.slice(0, source.maxItems || 5).forEach(item => {
                const newsItem = createNewsItem(item);
                listDiv.appendChild(newsItem);
              });
              
              // Add a note that this is cached data
              const cachedNote = document.createElement('div');
              cachedNote.className = 'news-meta';
              cachedNote.style.marginTop = '0.5rem';
              cachedNote.textContent = 'Last updated: ' + formatDate(newsCache.data[source.name].timestamp);
              listDiv.appendChild(cachedNote);
            } else {
              // Show error message if no data available
              listDiv.innerHTML = `
                <div class="error-message">
                  Could not load news from ${source.name}. 
                  <button class="refresh-btn" onclick="fetchSingleSource('${source.name.toLowerCase().replace(/\s+/g, '-')}')">
                    Try Again
                  </button>
                </div>
              `;
            }
          }
          
          container.appendChild(section);
        });
      } catch (error) {
        console.error('Error loading news:', error);
        document.getElementById('skeleton-loading').style.display = 'none';
        container.innerHTML = `
          <div class="error-message">
            Failed to load news. Please check your internet connection and try again.
            <button class="refresh-btn" onclick="fetchAndDisplayNews()">
              Refresh
            </button>
          </div>
        `;
      }
    }

    // Fetch with retry logic and timeout
    async function fetchWithRetries(source, retries = 3) {
      for (let i = 0; i < retries; i++) {
        try {
          // Add timeout to prevent hanging
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);
          
          const items = await fetchNewsSource(source, controller.signal);
          clearTimeout(timeoutId);
          
          if (items && items.length > 0) return items;
        } catch (error) {
          if (i === retries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
      }
      return [];
    }

    // Fetch news from a source using multiple methods
    async function fetchNewsSource(source, signal) {
      // Try all available endpoints in order
      const endpoints = [source.rss, ...source.fallbacks];
      
      for (const endpoint of endpoints) {
        try {
          let data;
          
          if (endpoint.includes('rss2json.com')) {
            // RSS2JSON API
            const response = await fetch(endpoint, { signal });
            if (!response.ok) continue;
            const json = await response.json();
            return json.items || [];
          } else if (endpoint.includes('allorigins.win')) {
            // AllOrigins proxy
            const response = await fetch(endpoint, { signal });
            if (!response.ok) continue;
            const json = await response.json();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(json.contents, "text/xml");
            return parseRSSItems(xmlDoc);
          } else {
            // Direct or CORS proxy fetch
            const response = await fetch(endpoint, { signal });
            if (!response.ok) continue;
            const text = await response.text();
            
            if (text.startsWith('<')) {
              // XML response
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(text, "text/xml");
              return parseRSSItems(xmlDoc);
            } else {
              // JSON response
              const json = JSON.parse(text);
              return json.items || [];
            }
          }
        } catch (error) {
          console.log(`Failed with endpoint ${endpoint} for ${source.name}:`, error);
          continue;
        }
      }
      
      throw new Error(`All fetch methods failed for ${source.name}`);
    }

    // Parse RSS XML items with better error handling
    function parseRSSItems(xmlDoc) {
      try {
        const items = xmlDoc.querySelectorAll('item, entry');
        return Array.from(items).slice(0, 10).map(item => ({
          title: item.querySelector('title')?.textContent?.trim() || 'No title',
          link: item.querySelector('link')?.textContent?.trim() || 
               item.querySelector('link')?.getAttribute('href')?.trim() || '#',
          description: item.querySelector('description')?.textContent?.trim() || 
                      item.querySelector('content')?.textContent?.trim() || 
                      item.querySelector('summary')?.textContent?.trim() || '',
          pubDate: item.querySelector('pubDate')?.textContent?.trim() || 
                  item.querySelector('published')?.textContent?.trim() || 
                  item.querySelector('date')?.textContent?.trim() || 
                  new Date().toISOString()
        }));
      } catch (error) {
        console.error('Error parsing RSS items:', error);
        return [];
      }
    }

    // Create a news item DOM element
    function createNewsItem(item) {
      const newsItem = document.createElement('div');
      newsItem.className = 'news-item';
      
      // Clean and prepare data
      const cleanTitle = sanitizeHTML(item.title);
      const cleanLink = encodeURI(item.link);
      const cleanDescription = truncateText(stripHTML(item.description), 120);
      const pubDate = formatDate(item.pubDate);
      
      newsItem.innerHTML = `
        <div class="news-content">
          <a href="${cleanLink}" target="_blank" rel="noopener noreferrer">${cleanTitle}</a>
          <div class="news-description">${cleanDescription}</div>
          <div class="news-meta">
            <span class="news-date">${pubDate}</span>
          </div>
        </div>
      `;
      
      return newsItem;
    }

    // Helper function to strip HTML tags
    function stripHTML(html) {
      if (!html) return '';
      return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
    }

    // Helper function to sanitize HTML
    function sanitizeHTML(str) {
      if (!str) return '';
      return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Helper function to truncate text
    function truncateText(text, maxLength) {
      if (!text) return '';
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    // Helper function to format date in Nepali style
    function formatDate(dateString) {
      try {
        // Handle Unix timestamps (in milliseconds)
        if (/^\d+$/.test(dateString)) {
          dateString = parseInt(dateString);
        }
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        
        // Nepali date format: YYYY-MM-DD HH:MM
        const pad = num => num.toString().padStart(2, '0');
        
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
      } catch {
        return '';
      }
    }

    // Fetch a single news source with loading state
    async function fetchSingleSource(sourceId) {
      const source = newsSources.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === sourceId);
      if (!source) return;
      
      const listDiv = document.getElementById(`${sourceId}-news`);
      if (!listDiv) return;
      
      // Show loading state
      const originalContent = listDiv.innerHTML;
      listDiv.innerHTML = '<div class="loading">Loading...</div>';
      
      try {
        const items = await fetchWithRetries(source);
        
        // Clear and rebuild content
        listDiv.innerHTML = '';
        
        if (items && items.length > 0) {
          // Cache the successful fetch
          newsCache.set(source.name, items);
          
          // Limit items based on source configuration
          const itemsToShow = items.slice(0, source.maxItems || 5);
          
          itemsToShow.forEach(item => {
            const newsItem = createNewsItem(item);
            listDiv.appendChild(newsItem);
          });
        } else {
          // Restore original content if fetch failed
          listDiv.innerHTML = originalContent;
          throw new Error('No items returned');
        }
      } catch (error) {
        console.error(`Error loading ${source.name}:`, error);
        listDiv.innerHTML = `
          <div class="error-message">
            Error loading ${source.name}.
            <button class="refresh-btn" onclick="fetchSingleSource('${sourceId}')">
              Try Again
            </button>
          </div>
        `;
      }
    }

    // Initialize with retry logic and offline detection
    async function initializeWithRetry(retries = 3) {
      // Check online status first
      if (!navigator.onLine) {
        showOfflineMessage();
        return;
      }
      
      try {
        await fetchAndDisplayNews();
        
        // Schedule background refresh
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          navigator.serviceWorker.ready.then(registration => {
            registration.sync.register('refresh-news');
          });
        }
      } catch (error) {
        if (retries > 0) {
          console.log(`Retrying... ${retries} attempts left`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          return initializeWithRetry(retries - 1);
        } else {
          showErrorMessage();
        }
      }
    }

    // Show offline message
    function showOfflineMessage() {
      const container = document.getElementById('news-container');
      document.getElementById('skeleton-loading').style.display = 'none';
      
      container.innerHTML = `
        <div class="error-message">
          You are currently offline. Showing cached news.
          <button class="refresh-btn" onclick="initializeWithRetry()">
            Retry
          </button>
        </div>
      `;
      
      // Try to show cached data
      newsSources.forEach(source => {
        const cached = newsCache.get(source.name);
        if (cached && cached.length > 0) {
          const section = document.createElement('div');
          section.className = 'news-section';
          
          section.innerHTML = `
            <h2 class="news-source-title">
              ${source.name} (Cached)
            </h2>
            <div class="news-list" id="${source.name.toLowerCase().replace(/\s+/g, '-')}-news"></div>
          `;
          
          const listDiv = section.querySelector('.news-list');
          cached.slice(0, source.maxItems || 5).forEach(item => {
            const newsItem = createNewsItem(item);
            listDiv.appendChild(newsItem);
          });
          
          container.appendChild(section);
        }
      });
    }

    // Show error message
    function showErrorMessage() {
      const container = document.getElementById('news-container');
      document.getElementById('skeleton-loading').style.display = 'none';
      
      container.innerHTML = `
        <div class="error-message">
          Failed to load news after multiple attempts. Please check your connection.
          <button class="refresh-btn" onclick="initializeWithRetry(3)">
            Try Again
          </button>
        </div>
      `;
    }

    // Initial load
    document.addEventListener('DOMContentLoaded', () => {
      // Set up online/offline detection
      window.addEventListener('online', () => initializeWithRetry());
      window.addEventListener('offline', showOfflineMessage);
      
      // Initial load
      initializeWithRetry();
      
      // Refresh every 15 minutes
      setInterval(() => {
        if (navigator.onLine) {
          initializeWithRetry(1);
        }
      }, 15 * 60 * 1000);
    });

    // Register service worker for offline support
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful');
            // Check for updates periodically
            setInterval(() => registration.update(), 60 * 60 * 1000); // Every hour
          })
          .catch(error => console.log('ServiceWorker registration failed:', error));
      });
    }
  </script>
