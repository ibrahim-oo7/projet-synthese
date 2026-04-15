import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCalendar, FaUser, FaTag, FaArrowRight, FaClock, FaComment, FaEye } from "react-icons/fa";

export default function Blog() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Blog categories
    const categories = [
        { id: "all", name: "All Posts", count: 12 },
        { id: "learning-tips", name: "Learning Tips", count: 4 },
        { id: "success-stories", name: "Success Stories", count: 3 },
        { id: "industry-news", name: "Industry News", count: 2 },
        { id: "course-highlights", name: "Course Highlights", count: 3 }
    ];

    // Blog posts data
    const blogPosts = [
        {
            id: 1,
            title: "10 Tips to Learn Programming Faster",
            excerpt: "Discover effective strategies to accelerate your programming learning journey and master new technologies quickly.",
            content: "Full content here...",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
            category: "learning-tips",
            author: "Aya Rbib",
            authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "March 15, 2026",
            readTime: "5 min read",
            comments: 24,
            views: 1245
        },
        {
            id: 2,
            title: "How to Get Certified in React: A Complete Guide",
            excerpt: "Everything you need to know about React certification and how to prepare for the exam with FormInnova.",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            category: "course-highlights",
            author: "Brahim El Hichou",
            authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
            date: "March 10, 2026",
            readTime: "8 min read",
            comments: 18,
            views: 987
        },
        {
            id: 3,
            title: "From Beginner to Data Scientist: Sarah's Journey",
            excerpt: "Read how Sarah transformed her career from marketing to data science using FormInnova courses.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            category: "success-stories",
            author: "Hanae Sanhayi",
            authorImage: "https://randomuser.me/api/portraits/women/63.jpg",
            date: "March 5, 2026",
            readTime: "6 min read",
            comments: 32,
            views: 1567
        },
        {
            id: 4,
            title: "Top 5 Web Development Trends in 2026",
            excerpt: "Stay ahead of the curve with these emerging web development trends that are shaping the industry.",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
            category: "industry-news",
            author: "Souhaib El Mizzari",
            authorImage: "https://randomuser.me/api/portraits/men/46.jpg",
            date: "February 28, 2026",
            readTime: "7 min read",
            comments: 15,
            views: 876
        },
        {
            id: 5,
            title: "The Importance of Continuous Learning in Tech",
            excerpt: "Why staying updated with new technologies is crucial for your career growth in the tech industry.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
            category: "learning-tips",
            author: "Aya Rbib",
            authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "February 20, 2026",
            readTime: "4 min read",
            comments: 12,
            views: 654
        },
        {
            id: 6,
            title: "How to Choose the Right Online Course",
            excerpt: "A comprehensive guide to selecting the perfect course for your learning goals and career aspirations.",
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            category: "learning-tips",
            author: "Hanae Sanhayi",
            authorImage: "https://randomuser.me/api/portraits/women/63.jpg",
            date: "February 15, 2026",
            readTime: "6 min read",
            comments: 21,
            views: 789
        }
    ];

    // Filter posts based on search and category
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                             post.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Featured post (first post)
    const featuredPost = blogPosts[0];

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <div style={styles.heroOverlay}></div>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        FormInnova <span style={styles.heroHighlight}>Blog</span>
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Insights, tips, and stories from our learning community
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section style={styles.searchSection}>
                <div style={styles.containerInner}>
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section style={styles.mainSection}>
                <div style={styles.containerInner}>
                    <div style={styles.contentGrid}>
                        {/* Sidebar */}
                        <aside style={styles.sidebar}>
                            <div style={styles.sidebarCard}>
                                <h3 style={styles.sidebarTitle}>Categories</h3>
                                <ul style={styles.categoryList}>
                                    {categories.map(category => (
                                        <li
                                            key={category.id}
                                            style={{
                                                ...styles.categoryItem,
                                                ...(selectedCategory === category.id ? styles.categoryItemActive : {})
                                            }}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            <span>{category.name}</span>
                                            <span style={styles.categoryCount}>{category.count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={styles.sidebarCard}>
                                <h3 style={styles.sidebarTitle}>Popular Tags</h3>
                                <div style={styles.tagsContainer}>
                                    <span style={styles.tag}>React</span>
                                    <span style={styles.tag}>JavaScript</span>
                                    <span style={styles.tag}>Career</span>
                                    <span style={styles.tag}>Learning</span>
                                    <span style={styles.tag}>Certification</span>
                                    <span style={styles.tag}>Web Development</span>
                                    <span style={styles.tag}>Data Science</span>
                                    <span style={styles.tag}>Success Story</span>
                                </div>
                            </div>

                            <div style={styles.sidebarCard}>
                                <h3 style={styles.sidebarTitle}>Newsletter</h3>
                                <p style={styles.newsletterText}>
                                    Subscribe to get the latest posts and updates
                                </p>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    style={styles.newsletterInput}
                                />
                                <button style={styles.newsletterBtn}>
                                    Subscribe
                                </button>
                            </div>
                        </aside>

                        {/* Blog Posts */}
                        <main style={styles.mainContent}>
                            {/* Featured Post */}
                            {search === "" && selectedCategory === "all" && (
                                <div style={styles.featuredPost}>
                                    <div style={styles.featuredImageContainer}>
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            style={styles.featuredImage}
                                        />
                                        <span style={styles.featuredBadge}>Featured</span>
                                    </div>
                                    <div style={styles.featuredContent}>
                                        <div style={styles.postMeta}>
                                            <span style={styles.postCategory}>
                                                <FaTag style={styles.metaIcon} />
                                                {featuredPost.category.split('-').map(word => 
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')}
                                            </span>
                                            <span style={styles.postDate}>
                                                <FaCalendar style={styles.metaIcon} />
                                                {featuredPost.date}
                                            </span>
                                        </div>
                                        <h2 style={styles.featuredTitle}>{featuredPost.title}</h2>
                                        <p style={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                                        <div style={styles.postFooter}>
                                            <div style={styles.authorInfo}>
                                                <img
                                                    src={featuredPost.authorImage}
                                                    alt={featuredPost.author}
                                                    style={styles.authorImage}
                                                />
                                                <span style={styles.authorName}>{featuredPost.author}</span>
                                            </div>
                                            <div style={styles.postStats}>
                                                <span style={styles.postStat}>
                                                    <FaClock style={styles.statIcon} />
                                                    {featuredPost.readTime}
                                                </span>
                                                <span style={styles.postStat}>
                                                    <FaComment style={styles.statIcon} />
                                                    {featuredPost.comments}
                                                </span>
                                                <span style={styles.postStat}>
                                                    <FaEye style={styles.statIcon} />
                                                    {featuredPost.views}
                                                </span>
                                            </div>
                                        </div>
                                        <Link to={`/blog/${featuredPost.id}`} style={styles.readMoreBtn}>
                                            Read Full Article <FaArrowRight style={styles.readMoreIcon} />
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Posts Grid */}
                            <div style={styles.postsGrid}>
                                {filteredPosts.map(post => (
                                    <div key={post.id} style={styles.postCard}>
                                        <div style={styles.postImageContainer}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                style={styles.postImage}
                                            />
                                        </div>
                                        <div style={styles.postContent}>
                                            <div style={styles.postMeta}>
                                                <span style={styles.postCategory}>
                                                    <FaTag style={styles.metaIcon} />
                                                    {post.category.split('-').map(word => 
                                                        word.charAt(0).toUpperCase() + word.slice(1)
                                                    ).join(' ')}
                                                </span>
                                                <span style={styles.postDate}>
                                                    <FaCalendar style={styles.metaIcon} />
                                                    {post.date}
                                                </span>
                                            </div>
                                            <h3 style={styles.postTitle}>{post.title}</h3>
                                            <p style={styles.postExcerpt}>{post.excerpt}</p>
                                            <div style={styles.postFooter}>
                                                <div style={styles.authorInfo}>
                                                    <img
                                                        src={post.authorImage}
                                                        alt={post.author}
                                                        style={styles.authorImageSmall}
                                                    />
                                                    <span style={styles.authorNameSmall}>{post.author}</span>
                                                </div>
                                                <div style={styles.postStats}>
                                                    <span style={styles.postStat}>
                                                        <FaClock style={styles.statIcon} />
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link to={`/blog/${post.id}`} style={styles.readMoreLink}>
                                                Read More <FaArrowRight style={styles.readMoreIcon} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {filteredPosts.length > 0 && (
                                <div style={styles.loadMoreContainer}>
                                    <button style={styles.loadMoreBtn}>
                                        Load More Articles
                                    </button>
                                </div>
                            )}

                            {/* No Results */}
                            {filteredPosts.length === 0 && (
                                <div style={styles.noResults}>
                                    <img
                                        src="https://img.icons8.com/ios/452/search--v1.png"
                                        alt="No results"
                                        style={styles.noResultsImg}
                                    />
                                    <h3 style={styles.noResultsTitle}>No articles found</h3>
                                    <p style={styles.noResultsText}>
                                        Try adjusting your search or filter to find what you're looking for.
                                    </p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

const styles = {
    container: {
        width: '100%',
        overflow: 'hidden'
    },
    containerInner: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
    },

    // Hero Section
    hero: {
        position: 'relative',
        height: '50vh',
        minHeight: '400px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
    },
    heroContent: {
        position: 'relative',
        zIndex: 2,
        color: 'white',
        maxWidth: '800px',
        padding: '0 20px'
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: '700',
        marginBottom: '1rem',
        lineHeight: '1.2'
    },
    heroHighlight: {
        color: '#15BE6A'
    },
    heroSubtitle: {
        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
        opacity: '0.95'
    },

    // Search Section
    searchSection: {
        padding: '2rem 0',
        backgroundColor: '#f9f9f9',
        borderBottom: '1px solid #f0f0f0'
    },
    searchContainer: {
        position: 'relative',
        maxWidth: '600px',
        margin: '0 auto'
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#15BE6A',
        fontSize: '1.1rem'
    },
    searchInput: {
        width: '100%',
        padding: '1rem 1rem 1rem 3rem',
        borderRadius: '50px',
        border: '1px solid #e0e0e0',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },

    // Main Section
    mainSection: {
        padding: '4rem 0',
        backgroundColor: '#ffffff'
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '3rem'
    },

    // Sidebar
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    sidebarCard: {
        backgroundColor: '#f9f9f9',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
    },
    sidebarTitle: {
        fontSize: '1.2rem',
        color: '#333',
        marginBottom: '1.2rem',
        fontWeight: '600',
        paddingBottom: '0.8rem',
        borderBottom: '2px solid #15BE6A'
    },
    categoryList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    categoryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 0',
        cursor: 'pointer',
        color: '#666',
        transition: 'color 0.3s ease',
        borderBottom: '1px solid #f0f0f0'
    },
    categoryItemActive: {
        color: '#15BE6A',
        fontWeight: '600'
    },
    categoryCount: {
        backgroundColor: '#e0e0e0',
        padding: '0.2rem 0.6rem',
        borderRadius: '12px',
        fontSize: '0.8rem',
        color: '#666'
    },
    tagsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem'
    },
    tag: {
        backgroundColor: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.85rem',
        color: '#666',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid #e0e0e0'
    },
    newsletterText: {
        fontSize: '0.95rem',
        color: '#666',
        marginBottom: '1rem',
        lineHeight: '1.6'
    },
    newsletterInput: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '1rem',
        fontSize: '0.95rem',
        outline: 'none'
    },
    newsletterBtn: {
        width: '100%',
        padding: '0.8rem',
        backgroundColor: '#15BE6A',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },

    // Main Content
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
    },

    // Featured Post
    featuredPost: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    featuredImageContainer: {
        position: 'relative',
        height: '100%',
        minHeight: '300px'
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    featuredBadge: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: '#15BE6A',
        color: 'white',
        padding: '0.3rem 1rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    featuredContent: {
        padding: '2rem 2rem 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    featuredTitle: {
        fontSize: '1.8rem',
        color: '#333',
        fontWeight: '700',
        lineHeight: '1.3'
    },
    featuredExcerpt: {
        fontSize: '1rem',
        color: '#666',
        lineHeight: '1.7'
    },

    // Posts Grid
    postsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem'
    },
    postCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease'
    },
    postImageContainer: {
        height: '200px',
        overflow: 'hidden'
    },
    postImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.5s ease'
    },
    postContent: {
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
    },
    postTitle: {
        fontSize: '1.2rem',
        color: '#333',
        fontWeight: '600',
        lineHeight: '1.4'
    },
    postExcerpt: {
        fontSize: '0.95rem',
        color: '#666',
        lineHeight: '1.6',
        marginBottom: '0.5rem'
    },

    // Common Post Elements
    postMeta: {
        display: 'flex',
        gap: '1rem',
        fontSize: '0.85rem',
        color: '#888',
        flexWrap: 'wrap'
    },
    postCategory: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        color: '#15BE6A',
        fontWeight: '500'
    },
    postDate: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem'
    },
    metaIcon: {
        fontSize: '0.8rem'
    },
    postFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '0.5rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
    },
    authorInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    authorImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    authorImageSmall: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    authorName: {
        fontSize: '0.95rem',
        color: '#333',
        fontWeight: '500'
    },
    authorNameSmall: {
        fontSize: '0.85rem',
        color: '#666'
    },
    postStats: {
        display: 'flex',
        gap: '1rem',
        fontSize: '0.85rem',
        color: '#888'
    },
    postStat: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem'
    },
    statIcon: {
        fontSize: '0.8rem',
        color: '#15BE6A'
    },
    readMoreBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#15BE6A',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '600',
        marginTop: '1rem',
        transition: 'gap 0.3s ease'
    },
    readMoreLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        color: '#15BE6A',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500',
        marginTop: '0.5rem',
        transition: 'gap 0.3s ease'
    },
    readMoreIcon: {
        fontSize: '0.8rem'
    },

    // Load More
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '2rem'
    },
    loadMoreBtn: {
        backgroundColor: 'transparent',
        color: '#15BE6A',
        border: '2px solid #15BE6A',
        padding: '1rem 3rem',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },

    // No Results
    noResults: {
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '20px'
    },
    noResultsImg: {
        width: '100px',
        height: '100px',
        marginBottom: '1.5rem',
        opacity: '0.5'
    },
    noResultsTitle: {
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '1rem'
    },
    noResultsText: {
        color: '#666',
        fontSize: '1rem'
    },

    // Responsive Design
    '@media (max-width: 1024px)': {
        contentGrid: {
            gridTemplateColumns: '1fr'
        },
        featuredPost: {
            gridTemplateColumns: '1fr'
        },
        featuredContent: {
            padding: '2rem'
        },
        postsGrid: {
            gridTemplateColumns: '1fr'
        }
    },
    '@media (max-width: 768px)': {
        postsGrid: {
            gridTemplateColumns: '1fr'
        }
    }
};