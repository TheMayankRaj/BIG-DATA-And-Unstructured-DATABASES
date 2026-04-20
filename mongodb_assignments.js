// ==================== ASSIGNMENT A ====================

// 1. Create / switch to database
use student_management

// 2. Create a collection called students
db.createCollection("students")

// 3. Insert at least five student records
db.students.insertMany([
  {
    "student_id": 101,
    "name": "Alice Johnson",
    "age": 20,
    "department": "Computer Science",
    "courses": ["Algorithms", "Data Structures", "Web Development"],
    "grade": "A"
  },
  {
    "student_id": 102,
    "name": "Marcus Chen",
    "age": 22,
    "department": "Mechanical Engineering",
    "courses": ["Thermodynamics", "Fluid Mechanics", "Robotics"],
    "grade": "B+"
  },
  {
    "student_id": 103,
    "name": "Sarah Gumede",
    "age": 21,
    "department": "Biology",
    "courses": ["Genetics", "Microbiology", "Organic Chemistry"],
    "grade": "B"
  },
  {
    "student_id": 104,
    "name": "Leo Martinez",
    "age": 19,
    "department": "Economics",
    "courses": ["Microeconomics", "Statistics", "Calculus"],
    "grade": "B"
  },
  {
    "student_id": 105,
    "name": "Elena Volkov",
    "age": 23,
    "department": "Physics",
    "courses": ["Quantum Mechanics", "Astrophysics", "Electromagnetism"],
    "grade": "A"
  }
])

// 4a. Retrieve all students who are in the "Computer Science" department
db.students.find({ "department": "Computer Science" })

// 4b. Retrieve students who have an age greater than 21
db.students.find({ "age": { $gt: 21 } })

// 4c. Retrieve students who are taking the "Database Systems" course
db.students.find({ "courses": "Database Systems" })

// 4d. Retrieve students with a grade of "A"
db.students.find({ 'grade': 'A' })

// 5a. Update the age of a student with student_id 101 to 21
db.students.updateOne({ 'student_id': 101 }, { $set: { 'age': 21 } })

// 5b. Add "Machine Learning" to courses for Computer Science students
db.students.updateMany({ "department": "Computer Science" }, { $push: { "courses" : "Machine Learning" } })

// 6a. Delete a student record with student_id 105
db.students.deleteOne({ 'student_id': 105 })

// 6b. Delete all students who have a grade lower than "C"
db.students.deleteMany({ grade: { $in: ["D", "F"] } })


// ==================== ASSIGNMENT B ====================


// 1. Insert multiple student documents
db.students.insertMany([
  { name: 'Alice', age: 20, department: 'Computer Science', grades: { math: 85, english: 92 } },
  { name: 'Bob', age: 21, department: 'Physics', grades: { math: 88, physics: 90 } },
  { name: 'Charlie', age: 22, department: 'Mathematics', grades: { math: 95, statistics: 89 } }
])

// 2. Display all students who are in the Computer Science department
db.students.find({ "department": "Computer Science" })

// 3. Update Alice's grades by adding programming with grade 93
db.students.updateOne({ name: "Alice" }, { $set: { "grades.programming": 93 } })

// 4. Increment the age of all students by 1
db.students.updateMany({}, { $inc: { age: 1 } })

// 5. Delete all students who are 23 years old
db.students.deleteMany({ age: 23 })

// 6. Create an index on the name field — Topic not covered

// 7. Group students by department and calculate average age
db.students.aggregate([
  { $group: { _id: "$department", avgAge: { $avg: "$age" } } }
])

// 8. Find all students who scored more than 90 in any subject
db.students.find({
  $or: [
    { "grades.math": { $gt: 90 } },
    { "grades.english": { $gt: 90 } },
    { "grades.physics": { $gt: 90 } },
    { "grades.statistics": { $gt: 90 } }
  ]
})

// 9. Add "graduated: false" for all Mathematics department students
db.students.updateMany({ department: "Mathematics" }, { $set: { graduated: false } })

// 10. Retrieve only name and department fields, excluding _id
db.students.find({}, { name: 1, department: 1, _id: 0 })


// ==================== ASSIGNMENT C ====================

// use students
// Insert Documents
db.students.insertMany([
  { student_id: 1, name: "Amit", age: 20, marks: 85, department: "CSE", subjects: ["DBMS", "OS", "CN"], email: "amit@gmail.com" },
  { student_id: 2, name: "Neha", age: 22, marks: 72, department: "ECE", subjects: ["Signals", "VLSI"], email: null },
  { student_id: 3, name: "Rahul", age: 19, marks: 90, department: "CSE", subjects: ["DBMS", "AI", "ML"] },
  { student_id: 4, name: "Sneha", age: 21, marks: 65, department: "IT", subjects: ["Web", "DBMS"], email: "sneha@gmail.com" },
  { student_id: 5, name: "Karan", age: 23, marks: 78, department: "CSE", subjects: ["CN", "OS"], email: "karan@gmail.com" }
])

// Q1. Find students with marks greater than 80
db.students.find({ marks: { $gt: 80 } })

// Q2. Find students aged less than or equal to 20
db.students.find({ age: { $lte: 20 } })

// Q3. Find students with marks between 70 and 85
db.students.find({ marks: { $gte: 70, $lte: 85 } })

// Q4. Find students not belonging to CSE department
db.students.find({ department: { $ne: "CSE" } })

// Q5. Find students whose age is exactly 21
db.students.find({ age: 21 })

// Q6. Find students with marks less than 75
db.students.find({ marks: { $lt: 75 } })

// Q7. Find students whose department is either CSE or IT
db.students.find({ department: { $in: ["CSE", "IT"] } })

// Q8. Find CSE students with marks above 80
db.students.find({ department: "CSE", marks: { $gt: 80 } })

// Q9. Find students who are in CSE or have marks above 85
db.students.find({ $or: [{ department: "CSE" }, { marks: { $gt: 85 } }] })

// Q10. Find students who are NOT in IT department
db.students.find({ department: { $ne: "IT" } })

// Q11. Find students with marks not between 70 and 85
db.students.find({ marks:{$not:{$gte:70,$lte:85}}})

// Q12. Find students aged above 20 and not in ECE
db.students.find({ age: { $gt: 20 }, department: { $ne: "ECE" } })

// Q13. Find students who are either IT students or have marks less than 70
db.students.find({ $or: [{ department: "IT" }, { marks: { $lt: 70 } }] })

// Q14. Find students who are not CSE and not IT
db.students.find({ department: { $nin: ["CSE", "IT"] } })

// Q15. Find students who have an email field
db.students.find({ email: { $exists: true } })

// Q16. Find students who do not have an email field
db.students.find({ email: { $exists: false } })

// Q17. Find students whose email value is null
db.students.find({ email: null })

// Q18. Find students whose marks field is of type integer
db.students.find({ marks: { $type: "int" } })

// Q19. Find students who have a subjects field
db.students.find({ subjects: { $exists: true } })

// Q20. Find students whose age field is missing
db.students.find({ age: { $exists: false } })

// Q21. Find students where marks modulo 5 equals 0
db.students.find({ marks: { $mod: [5, 0] } })

// Q22. Find students whose name starts with letter "A"
db.students.find({ name:{$regex:/^A/ }})

// Q23. Find students whose email ends with gmail.com
db.students.find({ email: {$regex: /gmail\.com$/ }})

// Q24. Find students who have more than 2 subjects
db.students.find({ $expr: { $gt: [{ $size: "$subjects" }, 2] } })

// Q25. Find students whose marks are greater than their age × 3
db.students.find({ $expr: { $gt: ["$marks", { $multiply: ["$age", 3] }] } })


// ==================== ASSIGNMENT D ====================

// Insert Documents
use companyDB

db.employees.insertMany([
  {
    emp_id: 101, name: "Amit", department: "IT",
    skills: ["Python", "MongoDB", "Docker"],
    projects: [
      { name: "HRMS", duration: 6, technologies: ["Python", "MongoDB"] },
      { name: "Ecommerce", duration: 8, technologies: ["NodeJS", "MongoDB"] }
    ],
    salaries: [45000, 48000, 52000],
    certifications: ["AWS", "Azure"]
  },
  {
    emp_id: 102, name: "Neha", department: "HR",
    skills: ["Communication", "Recruitment"],
    projects: [
      { name: "HiringPortal", duration: 4, technologies: ["PHP", "MySQL"] }
    ],
    salaries: [35000, 38000],
    certifications: ["SHRM"]
  },
  {
    emp_id: 103, name: "Ravi", department: "Finance",
    skills: ["Excel", "Tally", "SQL"],
    projects: [
      { name: "Accounting", duration: 10, technologies: ["SQL", "PowerBI"] }
    ],
    salaries: [40000, 42000, 46000],
    certifications: ["CPA", "CFA"]
  },
  {
    emp_id: 104, name: "Pooja", department: "IT",
    skills: ["Java", "Spring", "MongoDB"],
    projects: [
      { name: "BankingApp", duration: 12, technologies: ["Java", "MongoDB"] },
      { name: "CRM", duration: 7, technologies: ["Spring", "MySQL"] }
    ],
    salaries: [50000, 54000, 60000],
    certifications: ["Oracle", "AWS"]
  }
])

// Q1. Display all employees who have MongoDB skill
db.employees.find({ skills: "MongoDB" })

// Q2. Find employees having both Python and MongoDB skills
db.employees.find({ $and:[{skills:'MongoDB'},{skills:'Python'}]})

// Q3. Display employees with more than 2 skills
db.employees.find({ $expr: { $gt: [{ $size: "$skills" }, 2] } })

// Q4. Add a new skill "Kubernetes" to Amit
db.employees.updateOne({ name: "Amit" }, { $push: { skills: "Kubernetes" } })

// Q5. Add multiple skills to Pooja
db.employees.updateOne({ name: "Pooja" }, { $addToSet: { skills: "React" } })
db.employees.updateOne({ name: "Pooja" }, { $addToSet: { skills: "AWS" } })
db.employees.updateOne({ name: "Pooja" }, { $addToSet: { skills: "cloud managing" } })

// Q6. Add a certification only if not already present
db.employees.updateOne({ name: "Amit" }, { $addToSet: { certifications: "AWS cretified" } })

// Q7. Remove "Docker" skill from Amit
db.employees.updateOne({ name: "Amit" }, { $pull: { skills: "Docker" } })

// Q8. Remove multiple salaries less than 45000
db.employees.updateMany({}, { $pull: { salaries: { $lt: 45000 } } })

// Q9. Find employees who worked on MongoDB projects
db.employees.find({ "projects.technologies": "MongoDB" })

// Q10. Use $elemMatch to find project duration > 6 using MongoDB — Topic not covered

// Q11. Count number of projects for each employee
db.employees.aggregate([{ $project: { name: 1, project_count: { $size: "$projects" } } }])

// Q12. Unwind skills array — Topic not covered

// Q13. List unique skills across company — Topic not covered

// Q14. Find employees with salary greater than 50000
db.employees.find({ salaries: { $gt: 50000 } })

// Q15. Find employees with exactly 2 certifications
db.employees.find({ certifications: { $size: 2 } })

// Q16. Add new project to Ravi
db.employees.updateOne({ name: "Ravi" }, { $push: { projects: { title: "E-commerce Platform", duration: 4, tech_stack: ["Node.js","MongoDB"] } } })

// Q17. Increase all salaries by 10%
db.employees.updateMany({}, { $mul: { "salaries.$[]": 1.1 } })

// Q18. Find highest salary of each employee
db.employees.aggregate([{ $project: { name: 1, highest_Salary: { $max: "$salaries" } } }])

// Q19. Find average salary of employees
db.employees.aggregate([{ $group: { _id: null, avgSalary: { $avg: { $avg: "$salaries" } } } }])

// Q20. Filter projects longer than 6 months — Topic not covered

// Q21. Find employees who have any of these skills: Java or Python
db.employees.find({ skills: { $in: ["Java", "Python"] } })

// Q22. Remove last salary entry
db.employees.updateMany({}, { $pop: { salaries: 1 } })

// Q23. Remove first salary entry
db.employees.updateMany({}, { $pop: { salaries: -1 } })

// Q24. Sort salaries array — Topic not covered

// Q25. Limit salaries array to last 2 entries — Topic not covered

// Q26. Find total salary paid to each employee
db.employees.aggregate([{ $project: { name: 1, totalpaid: { $sum: "$salaries" } } }])

// Q27. Convert skills to uppercase — Topic not covered

// Q28. Find employees with more than one project
db.employees.find({ $expr: { $gt: [{ $size: "$projects" }, 1] } })

// Q29. Count employees per skill — Topic not covered

// Q30. Find employees whose all projects use MongoDB — Topic not covered
