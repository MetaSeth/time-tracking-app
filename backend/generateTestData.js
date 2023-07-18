var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();

// Users collection
let users = [
  { id: "admin", name: "Admin", role: "admin" },
  { id: "user1", name: "User One", role: "user" },
  { id: "user2", name: "User Two", role: "user" },
  { id: "user3", name: "User Three", role: "user" },
];

users.forEach((user) => {
  let docRef = db.collection("users").doc(user.id);
  docRef.set(user);
});

// Projects collection
let projects = [
  { id: "project1", name: "Project One" },
  { id: "project2", name: "Project Two" },
  { id: "project3", name: "Project Three" },
];

projects.forEach((project) => {
  let docRef = db.collection("projects").doc(project.id);
  docRef.set(project);
});

// Tasks collection
let tasks = [
  { id: "task1", name: "Task One", projectId: "project1" },
  { id: "task2", name: "Task Two", projectId: "project1" },
  { id: "task3", name: "Task Three", projectId: "project2" },
  { id: "task4", name: "Task Four", projectId: "project3" },
];

tasks.forEach((task) => {
  let docRef = db.collection("tasks").doc(task.id);
  docRef.set(task);
});

// Time entries collection
let timeEntries = [
  {
    id: "entry1",
    date: new Date("2023-07-01"),
    duration: 84, // Convert to minutes
    comment: "Worked on feature X",
    taskId: "task1",
    projectId: "project1",
    userId: "user1",
  },
  {
    id: "entry2",
    date: new Date("2023-07-02"),
    duration: 120, // Convert to minutes
    comment: "Fixed bug Y",
    taskId: "task2",
    projectId: "project1",
    userId: "user1",
  },
  {
    id: "entry3",
    date: new Date("2023-07-03"),
    duration: 225, // Convert to minutes
    comment: "Code review",
    taskId: "task3",
    projectId: "project2",
    userId: "user1",
  },
  {
    id: "entry4",
    date: new Date("2023-07-04"),
    duration: 60, // Convert to minutes
    comment: "Meeting",
    taskId: "task4",
    projectId: "project3",
    userId: "user2",
  },
];

timeEntries.forEach((entry) => {
  let docRef = db.collection("timeEntries").doc(entry.id);
  docRef.set(entry);
});
