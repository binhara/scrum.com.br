// Blog specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogFilters();
    initializeBlogSearch();
    initializeLoadMore();
});

// Category filters
function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const articles = document.querySelectorAll('.article-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected category
            const selectedCategory = this.dataset.category;
            
            // Filter articles
            articles.forEach(article => {
                if (selectedCategory === 'all' || article.dataset.category === selectedCategory) {
                    article.style.display = 'block';
                    article.style.opacity = '1';
                } else {
                    article.style.display = 'none';
                    article.style.opacity = '0';
                }
            });
            
            // Update counter or show "no results" message
            updateFilterResults(selectedCategory, articles);
        });
    });
}

// Search functionality
function initializeBlogSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    let searchTimeout;
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performBlogSearch(query, searchResults);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Perform blog search
function performBlogSearch(query, resultsContainer) {
    const articles = document.querySelectorAll('.article-card');
    const results = [];
    
    articles.forEach(article => {
        const title = article.querySelector('h3 a').textContent.toLowerCase();
        const content = article.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        if (title.includes(query) || content.includes(query) || tags.some(tag => tag.includes(query))) {
            results.push({
                title: article.querySelector('h3 a').textContent,
                url: article.querySelector('h3 a').href,
                excerpt: article.querySelector('p').textContent.substring(0, 150) + '...',
                category: article.dataset.category
            });
        }
    });
    
    displayBlogSearchResults(results, resultsContainer, query);
}

// Display search results
function displayBlogSearchResults(results, container, query) {
    if (results.length === 0) {
        container.innerHTML = `
            <div class="search-no-results">
                ${currentLanguage === 'pt-BR' ? 
                    `Nenhum resultado encontrado para "${query}"` : 
                    `No results found for "${query}"`
                }
            </div>
        `;
    } else {
        const resultsHTML = results.map(result => `
            <div class="search-result-item">
                <div class="result-category">${result.category.toUpperCase()}</div>
                <h4><a href="${result.url}">${highlightSearchTerm(result.title, query)}</a></h4>
                <p>${highlightSearchTerm(result.excerpt, query)}</p>
            </div>
        `).join('');
        
        container.innerHTML = resultsHTML;
    }
    
    container.style.display = 'block';
}

// Highlight search terms
function highlightSearchTerm(text, term) {
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// Update filter results
function updateFilterResults(category, articles) {
    const visibleArticles = Array.from(articles).filter(article => 
        article.style.display !== 'none'
    );
    
    // Could add a results counter here if needed
    console.log(`Showing ${visibleArticles.length} articles for category: ${category}`);
}

// Load more functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more articles
            this.textContent = currentLanguage === 'pt-BR' ? 'Carregando...' : 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // In a real implementation, you would fetch more articles from your backend
                showNotification(
                    currentLanguage === 'pt-BR' ? 
                    'Todos os artigos foram carregados!' : 
                    'All articles have been loaded!',
                    'info'
                );
                
                this.style.display = 'none';
            }, 1500);
        });
    }
}

// Article sharing functionality
function shareArticle(url, title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback to copying URL
        navigator.clipboard.writeText(url).then(() => {
            showNotification(
                currentLanguage === 'pt-BR' ? 
                'Link do artigo copiado!' : 
                'Article link copied!',
                'success'
            );
        });
    }
}

// Add share buttons to articles (if needed)
function addShareButtons() {
    const articles = document.querySelectorAll('.article-card');
    
    articles.forEach(article => {
        const link = article.querySelector('h3 a');
        if (link) {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '📤';
            shareBtn.onclick = () => shareArticle(link.href, link.textContent);
            
            article.querySelector('.article-content').appendChild(shareBtn);
        }
    });
}

// Reading time calculation (if needed)
function calculateReadingTime(content) {
    const wordsPerMinute = currentLanguage === 'pt-BR' ? 200 : 250;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    return currentLanguage === 'pt-BR' ? 
        `${readingTime} min de leitura` : 
        `${readingTime} min read`;
}