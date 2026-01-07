// Configuration and data

const anim = {
    truck: {
        rafId: null,
        stop: null,
        showTruck: true,
        mode: "drive",
        shouldStopAfterPass: false
    }
};

const projects = {
    'aura': {
        name: 'Aura-App',
        tech: 'Kotlin, Android Studio',
        date: 'Dec. 2025',
        details: [
            'Collaborated with a three person team to build a fitness and nutrition app, where I developed the Edamam API connection to access 100,000+ common foods for meal search and nutrition data.',
            'Improved UI/UX elements and layouts to support a dark themed user experience.'
        ]
    },
    'bitfit': {
        name: 'BitFit Health Tracker-App',
        tech: 'Kotlin, Android Studio',
        date: 'Oct. 2025',
        details: [
            'Created an app that logs meals, calories, and hydration storing user entries with local storage.',
            'Developed a dashboard interface using RecyclerView and Kotlin adapter to aggregate entries and display summaries of health metrics.'
        ]
    },
    'wordle': {
        name: 'Wordle-App',
        tech: 'Kotlin, Android Studio',
        date: 'Sep. 2025',
        details: [
            'Built full Wordle game mechanics including input handling, guess evaluation, and tile updates using RecyclerView adapters.',
            'Designed UI components using RecyclerView and Kotlin adapters, to deliver responsive interactions and game feedback.'
        ]
    },
    'resume-fox': {
        name: 'Resume-Fox',
        tech: 'Python, Typescript, MongoDB, MySQL',
        date: 'Jul. 2025',
        details: [
            'Responsible for the backend file ingestion pipeline within a four-person team resume analysis project, by extracting text (PDF, DOCX, TXT, MD) files, then converting the parsed content into structured JSON. Implemented logic to save results into MongoDB and MySQL to support LLM processing.'
        ]
    },
    'cyber': {
        name: 'Cyber Sentinel Challenge - Correlation One (DoD Sponsored)',
        tech: 'Kali Linux',
        date: 'Jun. 2025',
        details: [
            'One of the selected participants in a national DoD-sponsored challenge, leveraging Splunk, Nessus, Nmap, Wireshark, and OSINT techniques to analyze threats, identify vulnerabilities, and perform reconnaissance in hands on simulation labs.'
        ]
    },
    'stock': {
        name: 'Real-Time Stock Market Tracker (Yahoo Finance)',
        tech: 'Python, MongoDB, PHP, JS',
        date: 'May 2025',
        details: [
            'Scraped livestock data using requests and BeautifulSoup, storing updates in MongoDB.',
            'Built a PHP-based dashboard with Javascript sorting for stocks by price, symbol, and volume.'
        ]
    },
    'weather': {
        name: 'Automated Weather Data Scraper & XHTML Converter',
        tech: 'Python, Java, MySQL',
        date: 'Dec. 2024',
        details: [
            'Scraped real-time weather data via curl, converted to XHTML using TagSoup, and parsed with Python.',
            'Built a live dashboard with PHP + MySQL, displaying weather forecasts from weather.gov',
            'Automated scraping loop every 6 hours and debugged performance issues using GNU Debugger.'
        ]
    },
    'interpreter': {
        name: 'Custom Language Interpreter & Parser',
        tech: 'C++',
        date: 'Jun. 2023',
        details: [
            'Designed and implemented a lexical analyzer and recursive-descent parser in C++.',
            'Integrated the full interpreter pipeline including tokenization, parsing, and execution.',
            'Applied concepts like operator overloading, control structures, and evaluated language specific implementation of types, syntax, and control logic.'
        ]
    },
    'bookstore': {
        name: 'Bookstore Management System',
        tech: 'PHP, MySQL, Javascript',
        date: 'Dec. 2022',
        details: [
            'Engineered a full-stack web application for managing books, customers and order workflows.',
            'Implemented secure CRUD operations and fine-tuned SQL joins to enhance database performance.',
            'Deployed the system to NJIT-hosted servers using FileZilla and improved UX with real-time Javascript alerts.'
        ]
    }
};

