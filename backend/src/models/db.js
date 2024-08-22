const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../../db/sqlite.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      availability TEXT NOT NULL,
      areas_of_expertise TEXT NOT NULL,
      is_premium BOOLEAN NOT NULL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      availability TEXT NOT NULL,
      area_of_interest TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mentor_name TEXT NOT NULL,
      student_name TEXT NOT NULL,
      time TEXT NOT NULL
    )
    `)
});

// run only one time to insert value into database

// const mentors = [
//   ['Alice Johnson', 'Monday-Friday, 9am-5pm', 'JavaScript, React, Node.js', 1],
//   ['Bob Smith', 'Tuesday-Thursday, 10am-4pm', 'Python, Django, Data Science', 0],
//   ['Catherine Lee', 'Wednesday-Saturday, 8am-2pm', 'HTML, CSS, Web Design', 1]
// ];

// mentors.forEach((mentor) => {
//   db.run(`
//     INSERT INTO Mentors (name, availability, areas_of_expertise, is_premium)
//     VALUES (?, ?, ?, ?)
//   `, mentor, (err) => {
//     if (err) {
//       console.error('Error inserting mentor data:', err.message);
//     } else {
//       console.log('Inserted mentor:', mentor[0]);
//     }
//   });
// });

// const students = [
//   ['David Brown', 'Monday-Friday, 1pm-5pm', 'JavaScript'],
//   ['Eva White', 'Tuesday-Thursday, 9am-1pm', 'Python'],
//   ['Frank Green', 'Wednesday-Saturday, 10am-3pm', 'Web Design']
// ];

// students.forEach((student) => {
//   db.run(`
//     INSERT INTO Students (name, availability, area_of_interest)
//     VALUES (?, ?, ?)
//   `, student, (err) => {
//     if (err) {
//       console.error('Error inserting student data:', err.message);
//     } else {
//       console.log('Inserted student:', student[0]);
//     }
//   });
// });

module.exports = db;
