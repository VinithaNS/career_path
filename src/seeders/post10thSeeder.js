const mongoose = require("mongoose");
const EleventhGroup = require("../model/core/eleventhGroupModel");
const DiplomaCourse = require("../model/core/diplomaCourseModel");
const DegreeCourse = require("../model/core/degreeCourseModel");
const CareerRoadmap = require("../model/career/careerRoadmapModel");

async function seedPost10thData() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/careerpath"
    );
    console.log("Connected to MongoDB for Post-10th Data Seeding...");

    // Clean existing seed targets
    await Promise.all([
      EleventhGroup.deleteMany({}),
      DiplomaCourse.deleteMany({}),
      DegreeCourse.deleteMany({}),
      CareerRoadmap.deleteMany({})
    ]);

    // 1. 11th Grade Streams
    await EleventhGroup.create([
      {
        groupName: "Bio-Maths",
        groupCode: "BIO-MATHS",
        streamCategory: "Science",
        description:
          "A science group combining Biology and Mathematics, suitable for students interested in Engineering, Medicine, Computer Science, and other science-related careers.",
        coreSubjects: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "Biology",
          "English",
          "Tamil"
        ],
        eligibility:
          "Students who have completed 10th standard with the required marks as per the school or board admission criteria.",
        courseOptions: [
          "MBBS",
          "B.E Computer Science",
          "B.Tech",
          "B.Sc",
          "BCA",
          "B.Pharm",
          "Biomedical Engineering"
        ],
        careerOptions: [
          "Doctor",
          "Software Developer",
          "MERN Stack Developer",
          "AI Engineer",
          "Data Scientist",
          "Biomedical Engineer",
          "Research Scientist"
        ]
      },
      {
        groupName: "Computer Science",
        groupCode: "CS",
        streamCategory: "Science",
        description:
          "A science group focused on Mathematics, Computer Science, and core science subjects.",
        coreSubjects: [
          "Physics",
          "Chemistry",
          "Mathematics",
          "Computer Science",
          "English"
        ],
        eligibility:
          "10th standard pass with minimum qualifying marks in Mathematics and Science.",
        courseOptions: [
          "B.E Computer Science",
          "B.Tech IT",
          "BCA",
          "B.Sc Computer Science",
          "B.Tech Artificial Intelligence & Data Science"
        ],
        careerOptions: [
          "Software Developer",
          "Frontend Developer",
          "Backend Developer",
          "Full Stack Developer",
          "Cloud Solutions Architect"
        ]
      },
      {
        groupName: "Pure Science",
        groupCode: "PURE-SCIENCE",
        streamCategory: "Science",
        description:
          "A science-oriented group designed for students interested in Physics, Chemistry, Biology, and advanced research careers.",
        coreSubjects: [
          "Physics",
          "Chemistry",
          "Biology",
          "Computer Science",
          "English"
        ],
        eligibility:
          "10th standard pass with high marks in Science and English.",
        courseOptions: [
          "B.Sc Microbiology",
          "B.Sc Biotechnology",
          "B.Sc Agriculture",
          "BDS Dental Surgery",
          "B.Pharm"
        ],
        careerOptions: [
          "Research Scientist",
          "Pharmacist",
          "Medical Researcher",
          "Clinical Microbiologist"
        ]
      },
      {
        groupName: "Commerce",
        groupCode: "COMMERCE",
        streamCategory: "Commerce",
        description:
          "A commerce group designed for students interested in business, finance, accounting, and economics.",
        coreSubjects: [
          "Accountancy",
          "Commerce",
          "Economics",
          "Business Mathematics",
          "English"
        ],
        eligibility:
          "10th standard pass with good numerical and analytical aptitude.",
        courseOptions: [
          "B.Com",
          "BBA",
          "B.Com Accounting & Finance",
          "CA Foundation",
          "B.Sc Economics"
        ],
        careerOptions: [
          "Chartered Accountant",
          "Financial Analyst",
          "Investment Banker",
          "Auditor"
        ]
      }
    ]);

    // 2. Polytechnic Diploma Courses (Vocational Route)
    await DiplomaCourse.create([
      {
        courseName: "Diploma in Mechanical Engineering",
        courseCode: "DME",
        stream: "Engineering & Technology",
        duration: "3 Years (6 Semesters)",
        description:
          "Build hands-on industry skills in 3 years. Qualify for direct technical jobs or utilize lateral entry straight into 2nd Year B.E./B.Tech.",
        eligibility:
          "Pass in 10th Standard (SSLC) with minimum required marks in Science & Mathematics.",
        averageSalary: "₹2.5 - 4.5 LPA",
        skills: [
          "AutoCAD",
          "CNC Programming",
          "Hydraulics & Pneumatics",
          "Thermal Engineering",
          "Quality Control"
        ],
        directJobRoles: [
          "Junior Mechanical Engineer",
          "CAD Drafter",
          "CNC Operator",
          "Maintenance Supervisor"
        ],
        lateralEntryScope: {
          isEligibleForEngineering: true,
          targetSemester: "Direct Entry to 3rd Semester (2nd Year B.E/B.Tech)",
          degreeBranches: [
            "B.E Mechanical Engineering",
            "B.Tech Mechatronics",
            "B.E Robotics & Automation",
            "B.E Automobile Engineering"
          ]
        }
      },
      {
        courseName: "Diploma in Electrical and Electronics Engineering",
        courseCode: "DEEE",
        stream: "Engineering & Technology",
        duration: "3 Years (6 Semesters)",
        description:
          "Practical engineering education focusing on power systems, industrial wiring, motor drives, and embedded microcontrollers.",
        eligibility:
          "Pass in 10th Standard (SSLC) from a recognized state or central board.",
        averageSalary: "₹2.5 - 4.2 LPA",
        skills: [
          "Circuit Wiring",
          "PLC Automation",
          "MATLAB Basics",
          "Switchgear Maintenance",
          "Transformer Testing"
        ],
        directJobRoles: [
          "Electrical Supervisor",
          "Substation Operator",
          "Panel Wiring Technician",
          "Field Service Engineer"
        ],
        lateralEntryScope: {
          isEligibleForEngineering: true,
          targetSemester: "Direct Entry to 3rd Semester (2nd Year B.E/B.Tech)",
          degreeBranches: [
            "B.E Electrical & Electronics Engineering",
            "B.E Electronics & Instrumentation",
            "B.Tech Renewable Energy"
          ]
        }
      }
    ]);

    // 3. Degree Course
    await DegreeCourse.create([
      {
        courseName: "B.Sc Computer Science",
        courseCode: "BSCCS",
        degreeType: "UG",
        duration: "3 Years",
        description:
          "An undergraduate degree focused on computer science, programming, and software technologies.",
        about:
          "B.Sc Computer Science provides students with foundational knowledge of programming, databases, computer networks, operating systems, web development, and software engineering.",
        eligibility:
          "12th standard passed with Mathematics or Computer Science.",
        admissionProcess:
          "Admission based on qualifying examination marks and applicable university admission process.",
        averageSalary: { min: 300000, max: 800000 },
        subjects: [
          "Programming in C",
          "Data Structures",
          "Database Management Systems",
          "Operating Systems",
          "Computer Networks",
          "Web Development"
        ],
        skills: [
          "Programming",
          "Problem Solving",
          "Database Management",
          "Web Development",
          "Computer Networking"
        ],
        jobRoles: [
          "Software Developer",
          "Web Developer",
          "Database Administrator",
          "System Administrator"
        ],
        higherStudies: [
          "M.Sc Computer Science",
          "MCA",
          "MBA in Technology Management"
        ]
      }
    ]);

    // 4. Detailed Step-by-Step Career Roadmap
    await CareerRoadmap.create([
      {
        title: "Software Developer Roadmap",
        slug: "software-developer-roadmap",
        description:
          "Follow each step in order and build the skills required for your target career.",
        steps: [
          {
            stepNumber: 1,
            title: "Learn Programming Fundamentals",
            description:
              "Learn programming basics, logic building and problem solving.",
            topics: [
              "Variables & Data Types",
              "Control Flow (if/else, loops)",
              "Functions & Scope",
              "Arrays, Strings & Objects",
              "Time & Space Complexity Basics"
            ],
            tools: ["VS Code", "Node.js REPL", "Git & GitHub Basics"],
            practicePlatforms: [
              "HackerRank",
              "LeetCode (Easy)",
              "freeCodeCamp"
            ],
            miniProject:
              "Build a CLI Calculator or Interactive Todo Application in JavaScript/Python.",
            estimatedDuration: "3 - 4 Weeks"
          },
          {
            stepNumber: 2,
            title: "Learn Frontend Development",
            description: "Learn HTML, CSS, JavaScript and React.",
            topics: [
              "Semantic HTML5 Elements",
              "Modern CSS (Flexbox, Grid)",
              "JavaScript (ES6+, DOM, Fetch API)",
              "React Components, Props & State",
              "Tailwind CSS"
            ],
            tools: ["VS Code", "Vite", "Chrome DevTools", "Figma"],
            practicePlatforms: ["Frontend Mentor", "CSSBattle", "Codewars"],
            miniProject:
              "Build an interactive E-Commerce Product Listing page with search and cart functionality.",
            estimatedDuration: "6 - 8 Weeks"
          },
          {
            stepNumber: 3,
            title: "Learn Backend Development",
            description: "Learn Node.js, Express.js and REST API development.",
            topics: [
              "Node.js Architecture & Event Loop",
              "Express.js Routing & Middleware",
              "RESTful API Design Standards",
              "Authentication (JWT & bcrypt)",
              "Error Handling & Input Validation"
            ],
            tools: [
              "Postman",
              "Thunder Client",
              "npm / pnpm",
              "Linux Terminal"
            ],
            practicePlatforms: ["Exercism", "Postman API Network"],
            miniProject:
              "Build a Secure User Authentication & Note Management REST API.",
            estimatedDuration: "5 - 6 Weeks"
          },
          {
            stepNumber: 4,
            title: "Learn Database",
            description: "Learn MongoDB and Mongoose for database development.",
            topics: [
              "NoSQL vs Relational Concepts",
              "MongoDB CRUD Operations",
              "Mongoose Schemas & Validation",
              "Aggregation Pipelines & Indexing",
              "Referenced vs Embedded Documents"
            ],
            tools: ["MongoDB Compass", "MongoDB Atlas", "DBeaver"],
            practicePlatforms: ["MongoDB University", "SQLBolt"],
            miniProject:
              "Design and implement database models with relational schemas for an Order Management System.",
            estimatedDuration: "3 - 4 Weeks"
          },
          {
            stepNumber: 5,
            title: "Build Full Stack Projects",
            description: "Build real-world MERN stack applications.",
            topics: [
              "Client-Server API Integration",
              "Global State Management",
              "File Uploads (Multer & Cloudinary)",
              "Deployment (Vercel & Render)",
              "Environment Variables & Security Best Practices"
            ],
            tools: ["GitHub Actions", "Vercel", "Render", "Docker Basics"],
            practicePlatforms: ["GitHub Open Source", "Devpost Hackathons"],
            miniProject:
              "Deploy a production-ready MERN Stack application with authentication and media uploads.",
            estimatedDuration: "4 - 6 Weeks"
          },
          {
            stepNumber: 6,
            title: "Prepare for Jobs",
            description:
              "Prepare resume, portfolio, coding interviews and technical interviews.",
            topics: [
              "ATS-Friendly Resume Preparation",
              "System Design & DSA Fundamentals",
              "STAR Method for Behavioral Rounds",
              "GitHub Portfolio & Documentation Polish",
              "Mock Technical Interviews"
            ],
            tools: ["LinkedIn", "GitHub", "LeetCode", "Pramp"],
            practicePlatforms: ["InterviewBit", "Glassdoor Reviews"],
            miniProject:
              "Launch a personal developer portfolio website showcasing 2-3 production-level projects.",
            estimatedDuration: "4 Weeks"
          }
        ]
      }
    ]);

    console.log("Post-10th Data Seeded Successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
}

seedPost10thData();
