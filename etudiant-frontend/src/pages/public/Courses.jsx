import { useState } from "react";
import CourseCard from "../../components/CourseCard";
import { courses } from "../../data/courses";
import { FaSearch, FaCode, FaBookOpen, FaGraduationCap, FaClock, FaStar,FaBriefcase  ,FaPaintBrush,FaBullhorn, FaChartLine } from "react-icons/fa";

export default function Courses(){
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedLevel, setSelectedLevel] = useState("all");
    const [sortBy, setSortBy] = useState("popular");

    // Categories for filtering
    const categories = [
        { id: "all", name: "All Courses", icon: <FaBookOpen /> },
        { id: "development", name: "Development", icon: <FaCode /> },
        { id: "design", name: "Design", icon: <FaPaintBrush /> },
        { id: "marketing", name: "Marketing", icon: <FaBullhorn />},
        { id: "business", name: "Business", icon: <FaBriefcase /> },
        { id: "data-science", name: "Data Science",icon: <FaChartLine /> }
    ];

    const levels = [
        { id: "all", name: "All Levels" },
        { id: "beginner", name: "Beginner" },
        { id: "intermediate", name: "Intermediate" },
        { id: "advanced", name: "Advanced" }
    ];

    // Filter and sort courses
    const filtredCourses = courses
        .filter(course => 
            course.title.toLowerCase().includes(search.toLowerCase()) &&
            (selectedCategory === "all" || course.category === selectedCategory) &&
            (selectedLevel === "all" || course.level === selectedLevel)
        )
        .sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0; 
        });

    // Statistics
    const stats = {
        totalCourses: courses.length,
        totalStudents: "15.2K",
        totalCenters: 45,
        avgRating: 4.7
    };

    return(
        <div style={styles.container}>
            {/* Header Section */}
            <div style={styles.header}>
                <h1 style={styles.title}>Browse <span style={styles.highlight}>Courses</span></h1>
                <p style={styles.subtitle}>Discover thousands of courses from top education centers worldwide</p>
                
                {/* Stats Banner */}
                <div style={styles.statsBanner}>
                    <div style={styles.statItem}>
                        <FaBookOpen style={styles.statIcon} />
                        <div>
                            <h3 style={styles.statNumber}>{stats.totalCourses}+</h3>
                            <p style={styles.statLabel}>Courses</p>
                        </div>
                    </div>
                    <div style={styles.statDivider}></div>
                    <div style={styles.statItem}>
                        <FaGraduationCap style={styles.statIcon} />
                        <div>
                            <h3 style={styles.statNumber}>{stats.totalStudents}</h3>
                            <p style={styles.statLabel}>Students</p>
                        </div>
                    </div>
                    <div style={styles.statDivider}></div>
                    <div style={styles.statItem}>
                        <FaClock style={styles.statIcon} />
                        <div>
                            <h3 style={styles.statNumber}>{stats.totalCenters}</h3>
                            <p style={styles.statLabel}>Centers</p>
                        </div>
                    </div>
                    <div style={styles.statDivider}></div>
                    <div style={styles.statItem}>
                        <FaStar style={styles.statIcon} />
                        <div>
                            <h3 style={styles.statNumber}>{stats.avgRating}</h3>
                            <p style={styles.statLabel}>Avg Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div style={styles.controls}>
                <div style={styles.searchContainer}>
                    <FaSearch style={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Search courses by title, instructor, or topic..." 
                        value={search} 
                        onChange={(e)=>setSearch(e.target.value)}
                        style={styles.searchInput} 
                    />
                </div>

                <div style={styles.filterContainer}>
                    <div style={styles.sortWrapper}>
                        <label style={styles.filterLabel}>Sort by:</label>
                        <select 
                            style={styles.select} 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popular">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>

                    <div style={styles.filterWrapper}>
                        <label style={styles.filterLabel}>Level:</label>
                        <select 
                            style={styles.select} 
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                        >
                            {levels.map(level => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Categories Tabs */}
            <div style={styles.categories}>
                {categories.map(category => (
                    <button
                        key={category.id}
                        style={{
                            ...styles.categoryBtn,
                            ...(selectedCategory === category.id ? styles.categoryBtnActive : {})
                        }}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <span style={styles.categoryIcon}>{category.icon}</span>
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Results Info */}
            <div style={styles.resultsInfo}>
                <p style={styles.resultsText}>
                    Showing <span style={styles.resultsNumber}>{filtredCourses.length}</span> courses
                    {search && <span> for "<span style={styles.searchTerm}>{search}</span>"</span>}
                </p>
            </div>

            {/* Courses Grid */}
            {filtredCourses.length > 0 ? (
                <div style={styles.grid}>
                    {filtredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div style={styles.noResults}>
                    <img 
                        src="https://img.icons8.com/ios/452/search--v1.png" 
                        alt="No results" 
                        style={styles.noResultsImg}
                    />
                    <h3 style={styles.noResultsTitle}>No courses found</h3>
                    <p style={styles.noResultsText}>
                        Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button 
                        style={styles.clearBtn}
                        onClick={() => {
                            setSearch("");
                            setSelectedCategory("all");
                            setSelectedLevel("all");
                        }}
                    >
                        Clear all filters
                    </button>
                </div>
            )}

            
            </div>
    )
}

const styles = {
    container: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem 20px 4rem'
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    title: {
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        color: '#333',
        marginBottom: '1rem',
        fontWeight: '700'
    },
    highlight: {
        color: '#15BE6A',
        position: 'relative',
        display: 'inline-block'
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#666',
        marginBottom: '3rem'
    },
    statsBanner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3rem',
        flexWrap: 'wrap',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '60px',
        maxWidth: '900px',
        margin: '0 auto',
        boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
    },
    statItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    statIcon: {
        fontSize: '2rem',
        color: '#15BE6A'
    },
    statNumber: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#333',
        marginBottom: '0.2rem'
    },
    statLabel: {
        fontSize: '0.9rem',
        color: '#666'
    },
    statDivider: {
        width: '1px',
        height: '40px',
        backgroundColor: '#e0e0e0'
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    searchContainer: {
        position: 'relative',
        flex: '1',
        minWidth: '300px'
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#15BE6A',
        fontSize: '1rem'
    },
    searchInput: {
        width: '850px',
        padding: '1rem 1rem 1rem 3rem',
        borderRadius: '50px',
        border: '1px solid #e0e0e0',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        outline: 'none'
    },
    filterContainer: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    sortWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    filterWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    filterLabel: {
        color: '#666',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    select: {
        padding: '0.8rem 2rem 0.8rem 1rem',
        borderRadius: '25px',
        border: '1px solid #e0e0e0',
        backgroundColor: 'white',
        fontSize: '0.9rem',
        color: '#333',
        cursor: 'pointer',
        outline: 'none',
        appearance: 'none',
        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2315BE6A\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.7rem center',
        backgroundSize: '1rem'
    },
    categories: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        justifyContent: 'center'
    },
    categoryBtn: {
        padding: '0.8rem 1.5rem',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: '#f0f0f0',
        color: '#666',
        fontSize: '0.95rem',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease'
    },
    categoryBtnActive: {
        backgroundColor: '#15BE6A',
        color: 'white',
        boxShadow: '0 4px 10px rgba(21, 190, 106, 0.3)'
    },
    categoryIcon: {
        fontSize: '1.1rem'
    },
    resultsInfo: {
        marginBottom: '2rem',
        padding: '1rem 0'
    },
    resultsText: {
        fontSize: '1rem',
        color: '#666'
    },
    resultsNumber: {
        fontWeight: '700',
        color: '#15BE6A',
        fontSize: '1.2rem'
    },
    searchTerm: {
        fontWeight: '600',
        color: '#333',
        fontStyle: 'italic'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
    },
    noResults: {
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '20px',
        marginBottom: '4rem'
    },
    noResultsImg: {
        width: '100px',
        height: '100px',
        marginBottom: '1.5rem',
        opacity: '0.5'
    },
    noResultsTitle: {
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '1rem'
    },
    noResultsText: {
        color: '#666',
        marginBottom: '2rem',
        fontSize: '1.1rem'
    },
    clearBtn: {
        backgroundColor: '#15BE6A',
        color: 'white',
        border: 'none',
        padding: '1rem 2.5rem',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    featuredSection: {
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid #f0f0f0'
    },
    featuredTitle: {
        fontSize: '2rem',
        color: '#333',
        textAlign: 'center',
        marginBottom: '2rem'
    },
    featuredGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
    },
    featuredCard: {
        backgroundColor: '#f9f9f9',
        padding: '2rem',
        borderRadius: '15px',
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
    },
    featuredEmoji: {
        fontSize: '3rem',
        marginBottom: '1rem',
        display: 'block'
    },
    featuredCardTitle: {
        fontSize: '1.2rem',
        color: '#333',
        marginBottom: '0.5rem'
    },
    featuredCardDesc: {
        color: '#666',
        marginBottom: '1.5rem',
        fontSize: '0.95rem'
    },
    featuredBtn: {
        backgroundColor: 'transparent',
        color: '#15BE6A',
        border: '2px solid #15BE6A',
        padding: '0.6rem 1.5rem',
        borderRadius: '25px',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease'
    },
    featuredBtnIcon: {
        fontSize: '0.8rem'
    }
}

