 # Task Terminal

Task Terminal is a simple and clean task management web application built using HTML, CSS, and JavaScript.
The goal of this project is to create a fast, distraction-free space to manage daily tasks with reminders and a minimal interface.

It started as a learning project to strengthen core JavaScript skills such as DOM manipulation, state management, browser storage, and working with web APIs. The focus was on keeping the code readable, structured, and easy to extend while building something genuinely useful.



## About the Project

This application allows users to create tasks, schedule them with a date and time, and receive reminders directly in the browser. Tasks can be edited, marked as completed, pinned to the top, or removed. Everything is stored locally in the browser, so tasks remain available even after refreshing the page.

The interface follows a terminal-inspired layout with a modern glass-style design. The intention was to keep the experience lightweight while still adding small details like animations and live statistics to make it feel polished.



## Features

* Add tasks with optional date and time
* Browser notification reminders
* Pin important tasks
* Mark tasks as completed
* Edit and delete tasks
* Automatic sorting by priority and time
* Live statistics for total, pending, and completed tasks
* Keyboard support for quick task entry
* LocalStorage persistence
* Responsive layout and smooth animations



## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* Browser LocalStorage
* Web Notifications API

No external libraries or frameworks were used. The project is intentionally built with plain JavaScript to demonstrate core frontend fundamentals.



## Project Structure

```
task-terminal/
│
├── index.html      # Main layout
├── style.css       # Styling and UI behavior
├── script.js       # Application logic
└── README.md
```



## How It Works

All tasks are stored in the browser using LocalStorage.
Each task includes its text, completion status, optional date and time, and whether it is pinned.

When the page loads:

* Tasks are retrieved from storage
* Sorted by priority and time
* Rendered to the interface
* Reminders are scheduled if needed

Whenever a task is added, edited, completed, or deleted, the UI updates and the data is saved again.



## Running the Project

Clone the repository and open the project locally:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

Then open `index.html` in your browser.

No installation or build tools are required.



## Why This Project Exists

This project was built as part of a learning journey in frontend development.
The main objectives were:

* Practice writing structured JavaScript
* Understand how browsers store data
* Work with real user interactions
* Build something practical and usable
* Keep the code beginner-friendly but scalable

It can serve as a base for more advanced features such as cloud sync, categories, drag-and-drop sorting, or a mobile version.



## Possible Improvements

Future versions could include:

* Task categories or labels
* Search and filtering
* Dark and light themes
* Cloud storage integration
* Drag-and-drop task ordering
* Progressive Web App support



## Author

Premchand
Computer Science student with an interest in frontend development and building practical web applications.



## Notes

If you find this project helpful or interesting, feel free to fork it, modify it, or build on top of it.
Feedback and improvements are always welcome.
