import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight, Share2, Calendar, User, Clock, Settings, Plus, Edit2, Trash2, LogOut, Mail, Send } from 'lucide-react';

/* ============================================================
   EDITABLE ARTICLE DATA
   Replace/add/remove entries here. Each article needs:
   id, title, category, excerpt, content (HTML string),
   featured_image, author, published_date, updated_date,
   featured (bool), tags (array of strings)
   ============================================================ */
const initialArticles = [
  {
    id: 1,
    title: "Inside the Next Wave of Agentic AI Systems",
    category: "Artificial Intelligence",
    excerpt: "AI agents that can plan, browse, and execute multi-step tasks are moving from research demos into everyday products. Here's what's changing.",
    content: `<h2>From Chatbots to Agents</h2>
<p>The last two years have marked a clear shift in how AI systems are built and used. Instead of simple question-and-answer chat interfaces, developers are now shipping AI agents capable of planning multi-step tasks, calling external tools, and operating with a degree of autonomy.</p>

<h2>What Makes an Agent Different</h2>
<h3>Planning and Tool Use</h3>
<p>Modern agentic systems can break a goal into sub-tasks, decide which tools or APIs to call, and adjust their plan based on intermediate results, rather than producing a single response in one pass.</p>

<h3>Persistent Context</h3>
<p>Longer context windows and memory systems let agents keep track of a project across many steps and even across sessions, making them useful for research, coding, and operations work.</p>

<h2>Where Agents Are Already Useful</h2>
<p>Software engineering, customer support triage, and data analysis are among the areas where agentic AI is delivering measurable time savings today, though human oversight remains important for high-stakes decisions.</p>

<h2>What to Watch</h2>
<p>Expect continued progress on reliability, tool integration standards, and safety guardrails as agentic systems take on more consequential tasks.</p>`,
    featured_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
    author: "Faisal Hub",
    published_date: "2026-08-05",
    updated_date: "2026-08-10",
    featured: true,
    tags: ["AI", "Agents", "Automation"]
  },
  {
    id: 2,
    title: "On-Device AI: How Phones and Laptops Are Getting Smarter Without the Cloud",
    category: "Technology",
    excerpt: "Chipmakers are racing to fit powerful AI models directly onto consumer devices. Here's why local processing matters for speed, privacy, and cost.",
    content: `<h2>The Shift Toward the Edge</h2>
<p>A growing share of AI workloads are running directly on phones, laptops, and other edge devices instead of remote data centers. Dedicated neural processing units are now standard in flagship hardware.</p>

<h2>Why It Matters</h2>
<h3>Lower Latency</h3>
<p>Running a model locally removes the round trip to a server, which makes features like live translation, camera effects, and voice assistants feel instant.</p>

<h3>Privacy by Design</h3>
<p>Keeping data on-device reduces how much personal information needs to leave the hardware, which is increasingly a selling point for privacy-conscious buyers.</p>

<h3>Cost at Scale</h3>
<p>For manufacturers, offloading inference to the device reduces the server costs associated with supporting millions of users.</p>

<h2>The Trade-offs</h2>
<p>On-device models are typically smaller and less capable than their cloud counterparts, so many products now blend local and cloud processing depending on the task.</p>`,
    featured_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
    author: "Faisal Hub",
    published_date: "2026-08-02",
    updated_date: null,
    featured: true,
    tags: ["Hardware", "AI", "Mobile"]
  },
  {
    id: 3,
    title: "Foldable and Dual-Screen Devices Are Finally Going Mainstream",
    category: "Gadgets",
    excerpt: "After several generations of iteration, foldable phones and tablets are shedding their early reliability issues and gaining real market share.",
    content: `<h2>A Maturing Category</h2>
<p>Foldable devices spent their first few years being seen as expensive novelties. Improved hinge mechanisms, tougher flexible displays, and lighter builds have made recent generations far more practical for daily use.</p>

<h2>What's Improved</h2>
<h3>Durability</h3>
<p>Crease visibility and screen durability, two of the most common early complaints, have both seen substantial engineering improvements.</p>

<h3>Software Support</h3>
<p>App developers are now optimizing more of their apps for larger, foldable screens instead of simply stretching a phone layout.</p>

<h2>Who Should Consider One</h2>
<p>Foldables make the most sense for users who want a phone-tablet hybrid without carrying two devices, though they still carry a price premium over traditional flagship phones.</p>`,
    featured_image: "https://images.unsplash.com/photo-1592286927505-1def25115481?w=800&h=500&fit=crop",
    author: "Faisal Hub",
    published_date: "2026-07-29",
    updated_date: null,
    featured: true,
    tags: ["Gadgets", "Smartphones", "Hardware"]
  },
  {
    id: 4,
    title: "A Practical Guide to Getting Started with Local AI Models",
    category: "Tutorials",
    excerpt: "Want to run AI models on your own hardware instead of relying on the cloud? Here's a step-by-step starting point.",
    content: `<h2>Why Run Models Locally</h2>
<p>Running open-weight AI models on your own machine gives you more control over privacy, cost, and customization compared to calling a hosted API for every request.</p>

<h2>Getting Started</h2>
<h3>1. Check Your Hardware</h3>
<p>Available memory is usually the biggest constraint. Smaller quantized models can run comfortably on consumer laptops, while larger models benefit from a dedicated GPU.</p>

<h3>2. Choose a Runtime</h3>
<p>Several open-source tools now make it straightforward to download and serve models locally with a simple command-line interface or local web UI.</p>

<h3>3. Pick the Right Model Size</h3>
<p>Start with a smaller model to confirm your setup works end-to-end before moving to larger, more capable versions.</p>

<h2>Common Pitfalls</h2>
<p>Running out of memory, mismatched driver versions, and unrealistic expectations about speed on modest hardware are the most frequent issues newcomers run into.</p>`,
    featured_image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop",
    author: "Faisal Hub",
    published_date: "2026-07-24",
    updated_date: null,
    featured: false,
    tags: ["Tutorial", "AI", "Self-Hosting"]
  },
  {
    id: 5,
    title: "The State of Cybersecurity: What Changed as AI Entered the Fight",
    category: "Technology",
    excerpt: "Both attackers and defenders are using AI tools. Here's how the security landscape has shifted and what organizations are doing about it.",
    content: `<h2>AI on Both Sides</h2>
<p>Security teams are increasingly using AI-assisted tools to detect anomalies and triage alerts faster, while attackers are using similar technology to craft more convincing phishing campaigns and automate reconnaissance.</p>

<h2>Emerging Threats</h2>
<h3>AI-Generated Phishing</h3>
<p>Generated emails and messages are harder to distinguish from legitimate communication than the poorly written scams of the past.</p>

<h3>Deepfake-Assisted Fraud</h3>
<p>Voice and video cloning have been used in a growing number of social engineering attacks targeting employees with financial authority.</p>

<h2>Defensive Measures</h2>
<p>Multi-factor authentication, employee training that accounts for AI-generated content, and anomaly-detection systems remain the most effective baseline defenses available today.</p>`,
    featured_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
    author: "Faisal Hub",
    published_date: "2026-07-18",
    updated_date: null,
    featured: false,
    tags: ["Security", "Cybersecurity", "AI"]
  },
  {
    id: 6,
    title: "How Streaming Services Are Using AI to Personalize Everything",
    category: "Digital World",
    excerpt: "From recommendation engines to AI-generated thumbnails, streaming platforms are leaning further into automation to keep viewers engaged.",
    content: `<h2>Beyond Simple Recommendations</h2>
<p>Streaming platforms have used recommendation algorithms for years, but newer systems go further, personalizing thumbnails, trailers, and even the order of rows on a home screen for each individual viewer.</p>

<h2>The Content Production Side</h2>
<h3>AI-Assisted Editing</h3>
<p>Production teams are using AI tools to speed up editing, subtitling, and dubbing workflows, cutting down the time needed to localize content for global audiences.</p>

<h2>Viewer Concerns</h2>
<p>Some users have pushed back on hyper-personalized interfaces and AI-generated promotional imagery, prompting platforms to offer more transparency and manual controls.</p>

<h2>What's Next</h2>
<p>Expect deeper integration of conversational search and AI-generated recaps as platforms compete for viewer attention.</p>`,
    featured_image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=500&fit=crop",
    author: "Faisal Hub",
    published_date: "2026-07-11",
    updated_date: null,
    featured: false,
    tags: ["Streaming", "AI", "Entertainment"]
  }
];

const categories = [
  "Artificial Intelligence",
  "Technology",
  "Trending News",
  "Gadgets",
  "Tutorials",
  "Digital World"
];

/* ============================================================
   SEO helper - injects title/meta/canonical/JSON-LD for a page
   ============================================================ */
const useSEO = ({ title, description, path = '', image, type = 'website' }) => {
  useEffect(() => {
    const baseUrl = 'https://faisalhub.com';
    const url = `${baseUrl}${path}`;
    const fullTitle = title ? `${title} | Faisal Hub` : 'Faisal Hub - AI, Technology & Trending News';
    const desc = description || 'Faisal Hub delivers original articles about artificial intelligence, technology trends, gadgets, and digital innovation.';
    const img = image || `${baseUrl}/og-image.jpg`;

    document.title = fullTitle;

    const setMeta = (attr, key, value) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Faisal Hub');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', desc);
    setMeta('name', 'twitter:image', img);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    let ld = document.getElementById('faisalhub-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'faisalhub-jsonld';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(
      type === 'article'
        ? {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: desc,
            image: img,
            author: { '@type': 'Organization', name: 'Faisal Hub' },
            publisher: { '@type': 'Organization', name: 'Faisal Hub', url: baseUrl },
            url
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Faisal Hub',
            description: desc,
            url: baseUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${baseUrl}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          }
    );
  }, [title, description, path, image, type]);
};

/* ============================================================
   Newsletter
   ============================================================ */
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-blue-100 mb-8">Get the latest articles and news delivered to your inbox every week.</p>
        <form onSubmit={handleSubscribe} className="flex gap-3 flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Subscribe
          </button>
        </form>
        {subscribed && <p className="text-green-100 mt-4">Thank you for subscribing!</p>}
      </div>
    </section>
  );
};

/* ============================================================
   Header (with working search)
   ============================================================ */
const Header = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen, onSearch }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const submitSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div
          onClick={() => setCurrentPage('home')}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg transform group-hover:scale-110 transition-transform">
            F
          </div>
          <span className="font-bold text-xl text-gray-900 hidden sm:inline">Faisal Hub</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {['home', 'blog'].map((item) => (
            <button
              key={item}
              onClick={() => setCurrentPage(item)}
              className={`capitalize font-medium transition-colors ${
                currentPage === item ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {item === 'home' ? 'Home' : 'Blog'}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage('about')}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            About
          </button>
          <button
            onClick={() => setCurrentPage('contact')}
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Search Bar */}
      {searchOpen && (
        <div className="hidden sm:block border-t border-gray-200/50 bg-white/95 backdrop-blur">
          <form onSubmit={submitSearch} className="max-w-7xl mx-auto px-4 py-4 flex gap-3">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur">
          <div className="px-4 py-4 space-y-4">
            <form
              onSubmit={(e) => {
                submitSearch(e);
                setMobileMenuOpen(false);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded-lg">
                <Search size={18} />
              </button>
            </form>
            {['home', 'blog', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCurrentPage(item);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left capitalize py-2 font-medium text-gray-700 hover:text-blue-600"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

/* ============================================================
   Hero
   ============================================================ */
const HeroSection = ({ featuredArticle, setCurrentPage, setSelectedArticle }) => {
  return (
    <section className="relative px-4 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {featuredArticle.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {featuredArticle.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{featuredArticle.excerpt}</p>
          <button
            onClick={() => {
              setSelectedArticle(featuredArticle);
              setCurrentPage('article');
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Read Article <ArrowRight size={18} />
          </button>
          <div className="flex items-center gap-6 text-sm text-gray-600 pt-4">
            <span className="flex items-center gap-1"><User size={16} /> {featuredArticle.author}</span>
            <span className="flex items-center gap-1"><Calendar size={16} /> {featuredArticle.published_date}</span>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
          <img
            src={featuredArticle.featured_image}
            alt={featuredArticle.title}
            className="w-full h-96 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   Article Card
   ============================================================ */
const ArticleCard = ({ article, setCurrentPage, setSelectedArticle }) => {
  return (
    <div
      onClick={() => {
        setSelectedArticle(article);
        setCurrentPage('article');
      }}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:translate-y-1"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={article.featured_image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {article.published_date}
          </span>
          <span className="flex items-center gap-1">
            <User size={14} /> {article.author}
          </span>
        </div>
        <button className="w-full mt-4 py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors">
          Read More →
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   Category Card
   ============================================================ */
const CategoryCard = ({ category, setCurrentPage, setFilterCategory }) => {
  const icons = {
    "Artificial Intelligence": "🤖",
    "Technology": "💻",
    "Trending News": "📰",
    "Gadgets": "📱",
    "Tutorials": "📚",
    "Digital World": "🌐"
  };

  return (
    <div
      onClick={() => {
        setFilterCategory(category);
        setCurrentPage('blog');
      }}
      className="group cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:scale-105"
    >
      <div className="text-4xl mb-4">{icons[category] || "📌"}</div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
        {category}
      </h3>
      <p className="text-gray-500 text-sm mt-2">Explore articles</p>
    </div>
  );
};

/* ============================================================
   Blog Page
   ============================================================ */
const BlogPage = ({ articles, setCurrentPage, setSelectedArticle, filterCategory, setFilterCategory, initialSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || 'All');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    setSearchTerm(initialSearch || '');
  }, [initialSearch]);

  useEffect(() => {
    setSelectedCategory(filterCategory || 'All');
  }, [filterCategory]);

  const filteredArticles = articles.filter((article) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      article.title.toLowerCase().includes(term) || article.excerpt.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPageNum - 1) * articlesPerPage,
    currentPageNum * articlesPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setFilterCategory('');
                setCurrentPageNum(1);
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setFilterCategory(cat);
                  setCurrentPageNum(1);
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            setCurrentPage={setCurrentPage}
            setSelectedArticle={setSelectedArticle}
          />
        ))}
      </div>

      {paginatedArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles found. Try different search terms.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPageNum(page)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPageNum === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   Article Page
   ============================================================ */
const ArticlePage = ({ article, articles, setCurrentPage, setSelectedArticle }) => {
  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const handleShare = (platform) => {
    const url = `https://faisalhub.com/article/${article.id}`;
    const text = article.title;
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    window.open(shareUrls[platform], '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <button onClick={() => setCurrentPage('home')} className="hover:text-blue-600">Home</button>
        <span>/</span>
        <button onClick={() => setCurrentPage('blog')} className="hover:text-blue-600">Blog</button>
        <span>/</span>
        <span className="text-gray-900 font-medium">{article.category}</span>
      </div>

      <article>
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            {article.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>Published: {article.published_date}</span>
            </div>
            {article.updated_date && (
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>Updated: {article.updated_date}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
          <img src={article.featured_image} alt={article.title} className="w-full h-auto object-cover" />
        </div>

        <div
          className="prose prose-lg max-w-none mb-12 text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="bg-gray-50 p-6 rounded-lg mb-12 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Share2 size={20} /> Share This Article
          </h3>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => handleShare('twitter')}
              className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium"
            >
              Twitter/X
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Facebook
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
            >
              LinkedIn
            </button>
          </div>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relArticle) => (
                <ArticleCard
                  key={relArticle.id}
                  article={relArticle}
                  setCurrentPage={setCurrentPage}
                  setSelectedArticle={setSelectedArticle}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 border-t border-gray-200 pt-12">
          {prevArticle ? (
            <button
              onClick={() => setSelectedArticle(prevArticle)}
              className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-left group"
            >
              <div className="text-sm text-gray-500 mb-2">← Previous Article</div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                {prevArticle.title}
              </div>
            </button>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <button
              onClick={() => setSelectedArticle(nextArticle)}
              className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors text-right group"
            >
              <div className="text-sm text-gray-500 mb-2">Next Article →</div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                {nextArticle.title}
              </div>
            </button>
          ) : (
            <div />
          )}
        </div>
      </article>
    </div>
  );
};

/* ============================================================
   Admin Panel (Add / Edit / Delete all working)
   ============================================================ */
const emptyForm = { title: '', category: 'Technology', excerpt: '', content: '', featured_image: '', author: 'Faisal Hub', tags: '' };

const AdminPanel = ({ articles, setArticles, setCurrentPage, setAdminPassword }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const startNew = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const startEdit = (article) => {
    setFormData({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      featured_image: article.featured_image,
      author: article.author,
      tags: Array.isArray(article.tags) ? article.tags.join(', ') : ''
    });
    setEditingId(article.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.content) return;

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingId) {
      setArticles(
        articles.map((a) =>
          a.id === editingId
            ? {
                ...a,
                ...formData,
                tags: tagsArray,
                updated_date: new Date().toISOString().split('T')[0]
              }
            : a
        )
      );
    } else {
      const newArticle = {
        id: Math.max(...articles.map((a) => a.id), 0) + 1,
        ...formData,
        tags: tagsArray,
        published_date: new Date().toISOString().split('T')[0],
        updated_date: null,
        featured: false
      };
      setArticles([...articles, newArticle]);
    }

    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <button
          onClick={() => {
            setAdminPassword(null);
            setCurrentPage('home');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {!showForm && (
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-8"
        >
          <Plus size={18} /> New Article
        </button>
      )}

      {showForm && (
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Article' : 'Create New Article'}</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
            />
            <textarea
              placeholder="Content (HTML supported)"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
            />
            <input
              type="text"
              placeholder="Featured Image URL"
              value={formData.featured_image}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {editingId ? 'Update Article' : 'Create Article'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200 flex justify-between items-start gap-4"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">{article.title}</h3>
              <p className="text-sm text-gray-600">
                {article.category} • {article.published_date}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => startEdit(article)}
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                title="Edit article"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDeleteArticle(article.id)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                title="Delete article"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   Contact Page (functional form)
   ============================================================ */
const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-10">
        Have a question, tip, or partnership idea? Send us a message and the Faisal Hub team will get back to you.
      </p>

      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <Send size={18} /> Send Message
          </button>

          {submitted && (
            <p className="text-center text-green-600 font-medium">
              Thanks for reaching out! We'll get back to you soon.
            </p>
          )}
        </form>
      </div>

      <div className="mt-10 flex items-center gap-3 text-gray-600">
        <Mail size={20} />
        <span>Or email us directly at hello@muhammadfaisalawan41@gmail.com</span>
      </div>
    </div>
  );
};

/* ============================================================
   Static Pages (About, Legal)
   ============================================================ */
const StaticPage = ({ page }) => {
  const pages = {
    about: {
      title: 'About Faisal Hub',
      content: `<h2>Our Mission</h2>
<p>Faisal Hub is dedicated to providing high-quality, original content about artificial intelligence, technology, trending news, gadgets, and digital innovation.</p>
<h2>Our Values</h2>
<p>We believe in accuracy, transparency, and providing real value to our readers. Every article is thoroughly researched and clearly written.</p>
<h2>Get in Touch</h2>
<p>Have questions or story ideas? Visit our Contact page and use the form to reach the Faisal Hub team.</p>`
    },
    privacy: {
      title: 'Privacy Policy',
      content: `<h2>Data Collection</h2>
<p>We collect minimal personal data. Email addresses provided through our newsletter or contact form are used only to respond to inquiries and send article updates.</p>
<h2>Your Privacy</h2>
<p>We respect your privacy and do not sell or share your information with third parties.</p>`
    },
    terms: {
      title: 'Terms and Conditions',
      content: `<h2>Use License</h2>
<p>Content on this website is for informational purposes. Reproduction without permission is prohibited.</p>
<h2>Disclaimer</h2>
<p>While we strive for accuracy, we provide no warranty regarding the completeness or accuracy of the content.</p>`
    },
    disclaimer: {
      title: 'Disclaimer',
      content: `<p>The information provided on this website is for educational and informational purposes only. We make no warranties about the accuracy of the content. Always consult with a qualified professional before making decisions based on information from this site.</p>`
    },
    cookies: {
      title: 'Cookie Policy',
      content: `<p>This website uses cookies for analytics and to improve user experience. By using this site, you consent to our use of cookies.</p>`
    }
  };

  const pageData = pages[page];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{pageData.title}</h1>
      <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
};

/* ============================================================
   Footer (functional categories)
   ============================================================ */
const Footer = ({ setCurrentPage, setFilterCategory }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold">
                F
              </div>
              <span className="font-bold text-white">Faisal Hub</span>
            </div>
            <p className="text-sm text-gray-400">
              Premium technology, AI, and trending news blog delivering high-quality original content.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <div className="flex flex-col gap-2 text-sm items-start">
              <button onClick={() => setCurrentPage('home')} className="hover:text-blue-400 transition-colors">Home</button>
              <button onClick={() => setCurrentPage('blog')} className="hover:text-blue-400 transition-colors">Blog</button>
              <button onClick={() => setCurrentPage('about')} className="hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => setCurrentPage('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Categories</h4>
            <div className="flex flex-col gap-2 text-sm items-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilterCategory(cat);
                    setCurrentPage('blog');
                  }}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <div className="flex flex-col gap-2 text-sm items-start">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-blue-400 transition-colors">Privacy Policy</button>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-blue-400 transition-colors">Terms & Conditions</button>
              <button onClick={() => setCurrentPage('disclaimer')} className="hover:text-blue-400 transition-colors">Disclaimer</button>
              <button onClick={() => setCurrentPage('cookies')} className="hover:text-blue-400 transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2026 Faisal Hub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ============================================================
   Main App
   ============================================================ */
export default function FaisalHubBlog() {
  const [articles, setArticles] = useState(initialArticles);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(initialArticles[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminPassword, setAdminPassword] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const handleAdminAccess = () => {
    const correctPassword = 'admin123';
    if (passwordInput === correctPassword) {
      setAdminPassword(passwordInput);
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setCurrentPage('admin');
    } else {
      alert('Incorrect password');
      setPasswordInput('');
    }
  };

  const handleHeaderSearch = (query) => {
    setSearchQuery(query);
    setFilterCategory('');
    setCurrentPage('blog');
  };

  const trendingArticles = articles.filter((a) => a.featured).slice(0, 4);

  const seoByPage = {
    home: { title: null, description: null, path: '/', type: 'website' },
    blog: { title: 'Blog', description: 'Browse the latest AI, technology, gadgets, and trending news articles from Faisal Hub.', path: '/blog', type: 'website' },
    article: selectedArticle
      ? { title: selectedArticle.title, description: selectedArticle.excerpt, path: `/article/${selectedArticle.id}`, image: selectedArticle.featured_image, type: 'article' }
      : { title: null, description: null, path: '/', type: 'website' },
    about: { title: 'About', description: 'Learn about Faisal Hub, a technology and AI news publication.', path: '/about', type: 'website' },
    contact: { title: 'Contact', description: 'Get in touch with the Faisal Hub team.', path: '/contact', type: 'website' },
    privacy: { title: 'Privacy Policy', description: 'Read the Faisal Hub privacy policy.', path: '/privacy', type: 'website' },
    terms: { title: 'Terms and Conditions', description: 'Read the Faisal Hub terms and conditions.', path: '/terms', type: 'website' },
    disclaimer: { title: 'Disclaimer', description: 'Read the Faisal Hub disclaimer.', path: '/disclaimer', type: 'website' },
    cookies: { title: 'Cookie Policy', description: 'Read the Faisal Hub cookie policy.', path: '/cookies', type: 'website' },
    admin: { title: 'Admin', description: 'Faisal Hub admin panel.', path: '/admin', type: 'website' },
    settings: { title: 'Settings', description: 'Faisal Hub settings.', path: '/settings', type: 'website' }
  };

  const seo = seoByPage[currentPage] || seoByPage.home;
  useSEO(seo);

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontSize: '16px' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #1f2937;
        }

        @supports (backdrop-filter: blur(10px)) {
          .backdrop-blur-md {
            backdrop-filter: blur(10px);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .prose h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          color: #374151;
        }

        .prose p {
          margin-bottom: 1rem;
          color: #4b5563;
        }

        @media (max-width: 768px) {
          .prose h2 {
            font-size: 1.5rem;
          }

          .prose h3 {
            font-size: 1.125rem;
          }
        }

        * {
          transition-property: color, background-color, border-color, box-shadow;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onSearch={handleHeaderSearch}
      />

      <main className="flex-1">
        {showPasswordPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm mx-4">
              <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminAccess()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                autoFocus
              />
              <div className="flex gap-4">
                <button
                  onClick={handleAdminAccess}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setPasswordInput('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'home' && (
          <>
            <HeroSection
              featuredArticle={articles[0]}
              setCurrentPage={setCurrentPage}
              setSelectedArticle={setSelectedArticle}
            />

            <section className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {articles.slice(1, 7).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    setCurrentPage={setCurrentPage}
                    setSelectedArticle={setSelectedArticle}
                  />
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => setCurrentPage('blog')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Articles <ArrowRight size={18} />
                </button>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">Trending Now</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      setSelectedArticle(article);
                      setCurrentPage('article');
                    }}
                    className="cursor-pointer group bg-white rounded-lg p-4 shadow hover:shadow-lg transition-all"
                  >
                    <div className="h-32 overflow-hidden rounded-lg mb-4">
                      <img
                        src={article.featured_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-12">Browse by Category</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <CategoryCard
                    key={category}
                    category={category}
                    setCurrentPage={setCurrentPage}
                    setFilterCategory={setFilterCategory}
                  />
                ))}
              </div>
            </section>

            <NewsletterSection />
          </>
        )}

        {currentPage === 'blog' && (
          <BlogPage
            articles={articles}
            setCurrentPage={setCurrentPage}
            setSelectedArticle={setSelectedArticle}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            initialSearch={searchQuery}
          />
        )}

        {currentPage === 'article' && selectedArticle && (
          <ArticlePage
            article={selectedArticle}
            articles={articles}
            setCurrentPage={setCurrentPage}
            setSelectedArticle={setSelectedArticle}
          />
        )}

        {currentPage === 'about' && <StaticPage page="about" />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <StaticPage page="privacy" />}
        {currentPage === 'terms' && <StaticPage page="terms" />}
        {currentPage === 'disclaimer' && <StaticPage page="disclaimer" />}
        {currentPage === 'cookies' && <StaticPage page="cookies" />}

        {currentPage === 'admin' && adminPassword && (
          <AdminPanel
            articles={articles}
            setArticles={setArticles}
            setCurrentPage={setCurrentPage}
            setAdminPassword={setAdminPassword}
          />
        )}

        {currentPage === 'settings' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <button
              onClick={() => {
                setShowPasswordPrompt(true);
                setCurrentPage('home');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings size={18} /> Admin Panel
            </button>
          </div>
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} setFilterCategory={setFilterCategory} />

      <button
        onClick={() => setShowPasswordPrompt(true)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg"
        title="Admin Panel"
        style={{ fontSize: '12px' }}
      >
        ⚙️
      </button>
    </div>
  );
}
