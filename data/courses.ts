import type { Course } from '../types';

export const courses: Course[] = [
  // 1. Web Development (Condensed to 10 Days)
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'An intensive 10-day journey covering HTML, CSS, and JavaScript to build modern, interactive websites from scratch.',
    icon: 'CodeIcon',
    badge: 'WebDevBadge',
    imageUrl: 'https://picsum.photos/seed/webdev/600/400',
    quiz: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correctAnswer: "Hyper Text Markup Language" },
        { question: "Which CSS property is used to change the text color of an element?", options: ["font-color", "text-color", "color", "background-color"], correctAnswer: "color" },
        { question: "Which JavaScript keyword is used to declare a variable that cannot be reassigned?", options: ["var", "let", "const", "static"], correctAnswer: "const" },
        { question: "What is the correct way to apply a style to all `<p>` elements?", options: ['p { ... }', '.p { ... }', '#p { ... }', '<p> { ... }'], correctAnswer: 'p { ... }' },
        { question: "How do you select an element with id 'header' in JavaScript?", options: ['document.select("#header")', 'document.getElement("header")', 'document.getElementById("header")', 'document.querySelector("header")'], correctAnswer: 'document.getElementById("header")' }
    ],
    structure: [
      { 
        day: 1, 
        topic: 'HTML Fundamentals', 
        module: 'HTML & CSS', 
        videoUrl: 'https://www.youtube.com/embed/HcOc7P5BMi4',
        notes: `### What is HTML?
HTML stands for **HyperText Markup Language**. It's the skeleton of every web page, defining its structure. An HTML document is made of elements.

### Basic Document Structure
Every HTML document needs this boilerplate:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>
</html>
\`\`\`

### Core Text Elements
- **Headings:** \`<h1>\` (most important) to \`<h6>\` (least important).
- **Paragraphs:** \`<p>\` for blocks of text.
- **Formatting:** Use \`<strong>\` for bold (important) text and \`<em>\` for emphasized (italic) text.`, 
        challenge: { 
          title: 'Create Your First Web Page', 
          description: 'Create an HTML page about your favorite hobby. It must have a main `<h1>` title, at least two `<h2>` subheadings, and several `<p>` paragraphs. Use `<strong>` to highlight important keywords.' 
        } 
      },
      { 
        day: 2, 
        topic: 'Links, Lists & Media', 
        module: 'HTML & CSS', 
        videoUrl: 'https://www.youtube.com/embed/qFkLcuIol2Y',
        notes: `### Creating Hyperlinks
The \`<a>\` tag defines a hyperlink. The \`href\` attribute specifies the destination URL.
\`\`\`html
<a href="https://www.google.com" target="_blank">Visit Google</a>
\`\`\`
Using \`target="_blank"\` opens the link in a new tab.

### Lists
- **Unordered Lists (\`<ul>\`):** For items where order doesn't matter. Uses bullet points.
- **Ordered Lists (\`<ol\`):** For items where order is important. Uses numbers.
Each item in both lists is defined with an \`<li>\` tag.

### Images
The \`<img>\` tag embeds an image. It's an empty tag with important attributes:
- \`src\`: The path to the image file.
- \`alt\`: Alternative text for accessibility (very important!).
\`\`\`html
<img src="my_photo.jpg" alt="A photo of me on a mountain">
\`\`\``,
        challenge: { 
          title: 'Create a Recipe Page', 
          description: 'Create a recipe page. Use an unordered list (`<ul>`) for ingredients and an ordered list (`<ol>`) for instructions. Include an image of the final dish and a link to the original recipe source.' 
        } 
      },
      { 
        day: 3, 
        topic: 'Tables & Forms', 
        module: 'HTML & CSS', 
        videoUrl: 'https://www.youtube.com/embed/N69xumSjg5s',
        notes: `### HTML Tables
Tables are for displaying tabular data.
- \`<table>\`: The main container.
- \`<tr>\`: A table row.
- \`<th>\`: A table header cell (bold and centered).
- \`<td>\`: A table data cell.

### Collecting User Input with Forms
The \`<form>\` element is a container for various input controls.
- **Text Input:** \`<input type="text">\`
- **Password:** \`<input type="password">\`
- **Email:** \`<input type="email">\`
- **Submit Button:** \`<button type="submit">Submit</button>\`

The \`<label>\` tag is crucial for accessibility. Its \`for\` attribute should match the \`id\` of the input it describes.`,
        challenge: { 
          title: 'Build a Simple Login Form', 
          description: 'Create an HTML page with a login form. The form should have a field for "Email", a field for "Password", and a "Login" button. Use `<label>` elements correctly for each input field.' 
        } 
      },
      { 
        day: 4, 
        topic: 'Semantic HTML', 
        module: 'HTML & CSS', 
        videoUrl: 'https://www.youtube.com/embed/nI-3ROo_9_A',
        notes: `### What is Semantic HTML?
Semantic elements clearly describe their meaning to both the browser and the developer. Using them improves SEO and accessibility. Instead of using \`<div>\` for everything, use tags that describe the content.

### Key Structural Elements
- \`<header>\`: The header of a page or section. Contains navigation, logos, etc.
- \`<nav>\`: Contains navigation links.
- \`<main>\`: The main, unique content of the page.
- \`<section>\`: A thematic grouping of content.
- \`<article>\`: A self-contained piece of content (e.g., a blog post).
- \`<footer>\`: The footer of a page or section. Contains copyright, contact info, etc.`,
        challenge: { 
          title: 'Structure a Blog Post', 
          description: 'Create the structure for a blog post using semantic HTML. It should have a `<header>` with the title, a `<main>` area containing an `<article>`, and a `<footer>` with copyright info. Don\'t worry about styling yet.' 
        } 
      },
      { 
        day: 5, 
        topic: 'Intro to CSS & The Box Model', 
        module: 'HTML & CSS', 
        videoUrl: 'https://www.youtube.com/embed/uG8V9de_JqM',
        notes: `### What is CSS?
CSS (Cascading Style Sheets) is the language used to style HTML documents. It controls colors, fonts, layout, and more.

### CSS Syntax
A CSS rule consists of a selector and a declaration block:
\`\`\`css
selector {
  property: value;
}

h1 {
  color: blue;
  font-size: 24px;
}
\`\`\`

### The Box Model
Every HTML element is a rectangular box. The box model describes the layers of this box.
[FLIPCARD front="The CSS Box Model" back="It has four layers: Content is the text/image. Padding is the transparent space around the content. Border is the line around the padding. Margin is the transparent space outside the border that separates elements."]
`,
        challenge: { 
          title: 'Style a Content Box', 
          description: 'Create a `<div>` with some text. In your CSS, give it a background color, `20px` of padding, a `2px` solid border, and a `15px` margin.' 
        } 
      },
      { 
        day: 6, 
        topic: 'CSS Typography & Flexbox', 
        module: 'HTML & CSS', 
        videoUrl: 'https://www.youtube.com/embed/1Rs2ND_4I-s',
        notes: `### Typography
- \`font-family\`: Sets the font (e.g., Arial, sans-serif).
- \`font-size\`: Sets the text size (e.g., \`16px\`).
- \`font-weight\`: Sets the boldness (e.g., \`bold\`).
- \`color\`: Sets the text color.

### Introduction to Flexbox
Flexbox is a powerful one-dimensional layout model for arranging items in rows or columns.

To use it, create a container and set its display property:
\`\`\`css
.container {
  display: flex;
  justify-content: space-between; /* Aligns items along the main axis */
  align-items: center; /* Aligns items along the cross axis */
}
\`\`\`
Flexbox makes creating navigation bars and centering content much easier.`,
        challenge: { 
          title: 'Build a Flexible Navigation Bar', 
          description: 'Create a `<nav>` with a `<ul>` of links inside. Use Flexbox to arrange the links horizontally and space them out evenly.' 
        } 
      },
      { 
        day: 7, 
        topic: 'CSS Grid & Responsive Design', 
        module: 'HTML & CSS', 
        videoUrl: 'https://www.youtube.com/embed/lA4R84p-C8I',
        notes: `### CSS Grid Layout
CSS Grid is a two-dimensional layout system, perfect for creating complex layouts with rows and columns.
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Creates three equal columns */
  gap: 20px; /* Space between grid items */
}
\`\`\`

### Responsive Design with Media Queries
Media queries allow you to apply CSS styles only when certain conditions (like screen size) are met. This is the key to making websites look good on all devices.
\`\`\`css
/* Styles for screens 768px and smaller */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* Stack items in a single column */
  }
}
\`\`\``,
        challenge: { 
          title: 'Create a Responsive Gallery', 
          description: 'Create a gallery of 6 `<div>` items using CSS Grid. On wide screens, it should be a 3-column grid. Use a media query to make it a 1-column grid on screens smaller than 768px.' 
        } 
      },
      { 
        day: 8, 
        topic: 'Introduction to JavaScript', 
        module: 'JavaScript', 
        videoUrl: 'https://www.youtube.com/embed/VlPiVmYuoqw',
        notes: `### What is JavaScript?
JavaScript makes web pages interactive. It's a programming language that runs in the browser.

### Variables & Data Types
- \`let\`: A variable that can be changed.
- \`const\`: A variable that cannot be changed (a constant).
- **Data Types:** String (text), Number, Boolean (true/false).

### Functions
Functions are reusable blocks of code.
\`\`\`javascript
function greet(name) {
  console.log("Hello, " + name);
}
greet("World"); // Calls the function
\`\`\`

### Arrays and Objects
- **Arrays** store lists of items: \`const colors = ["red", "green", "blue"];\`
- **Objects** store collections of related data: \`const user = { name: "Alice", age: 30 };\``,
        challenge: { 
          title: 'Declare and Use Variables', 
          description: 'In a `<script>` tag, declare a `const` for your name and a `let` for your age. Write a function that takes these as arguments and logs a sentence like "My name is [Name] and I am [Age] years old." to the console.' 
        } 
      },
      { 
        day: 9, 
        topic: 'JavaScript & The DOM', 
        module: 'JavaScript', 
        videoUrl: 'https://www.youtube.com/embed/hKB-YGF14SY',
        notes: `### What is the DOM?
The **Document Object Model (DOM)** is a programming interface for your HTML. It represents the page as objects that JavaScript can manipulate.

### Selecting Elements
You can select an HTML element to work with it in JavaScript.
\`\`\`javascript
// Selects the element with id="main-title"
const titleElement = document.getElementById("main-title");

// Selects the first element that matches the CSS selector
const button = document.querySelector(".my-button");
\`\`\`

### Manipulating Elements
Once selected, you can change an element's content, style, or attributes.
\`\`\`javascript
titleElement.textContent = "New Title!";
titleElement.style.color = "red";
\`\`\`

### Event Handling
You can make your page respond to user actions with event listeners.
\`\`\`javascript
button.addEventListener("click", function() {
  alert("Button was clicked!");
});
\`\`\``,
        challenge: { 
          title: 'Create a Clickable Button', 
          description: 'Add a `<button>` to your HTML with an ID. In your JavaScript, select the button and add a "click" event listener that changes the text of an `<h1>` element when the button is clicked.' 
        } 
      },
      { 
        day: 10, 
        topic: 'Project: Interactive Portfolio Page', 
        module: 'JavaScript', 
        isProject: true,
        videoUrl: 'https://www.youtube.com/embed/CVClp43Jt-0',
        notes: `### Final Project
Combine all your HTML, CSS, and JavaScript skills to build a simple, interactive one-page portfolio.

### Project Plan
1.  **HTML:** Structure your page with semantic HTML (\`<header>\`, \`<main>\`, etc.). Include sections for "About Me," "Projects," and "Contact."
2.  **CSS:** Style the entire page. Use Flexbox or Grid for layout. Ensure the page is responsive using media queries.
3.  **JavaScript:** Add interactivity. A great feature to add is a light/dark mode theme switcher.

### Theme Switcher Logic
1.  Add a button with an ID like \`theme-switcher\`.
2.  In CSS, create a class like \`.dark-mode\` that you can add to the \`<body>\`. This class will contain your dark theme styles.
3.  In JS, add a click event listener to the button. When clicked, it should toggle the \`.dark-mode\` class on the \`<body>\` element using \`document.body.classList.toggle('dark-mode');\``,
        challenge: { 
          title: 'Build a Light/Dark Theme Switcher', 
          description: `Using the code editor, build a complete, working theme switcher. The page needs a title, a paragraph, and a button. Clicking the button must toggle a 'dark-mode' class on the body, which changes the page's background and text colors.`
        } 
      },
    ],
  },
  // 2. Python Programming
  {
    id: 'python',
    title: 'Python Programming',
    description: 'Master the fundamentals of Python, a versatile language for web development, data science, and more.',
    icon: 'PythonIcon',
    badge: 'PythonBadge',
    imageUrl: 'https://picsum.photos/seed/python/600/400',
    quiz: [
        { question: "What is the correct file extension for Python files?", options: [".pyth", ".pt", ".py", ".python"], correctAnswer: ".py" },
        { question: "How do you create a function in Python?", options: ["function myFunction():", "def myFunction():", "create myFunction():", "func myFunction():"], correctAnswer: "def myFunction():" },
        { question: "Which collection is ordered, changeable, and allows duplicate members?", options: ["List", "Tuple", "Set", "Dictionary"], correctAnswer: "List" }
    ],
    structure: [
      { day: 1, module: 'Python Basics', topic: 'Introduction to Python', videoUrl: 'https://www.youtube.com/embed/vLqTf2b6Gtc', notes: 'Discover Python, its uses, and set up your development environment.', challenge: { title: 'Hello, World!', description: 'Write a Python script that prints "Hello, World!"' } },
      { day: 2, module: 'Python Basics', topic: 'Variables and Data Types', videoUrl: 'https://www.youtube.com/embed/4RxYs924W1M', notes: 'Learn Python\'s basic data types: integers, floats, strings, and booleans.', challenge: { title: 'Store Personal Info', description: 'Create variables for your name, age, and favorite color, then print a sentence using them.' } },
      { day: 3, module: 'Python Basics', topic: 'Basic Operators', videoUrl: 'https://www.youtube.com/embed/v5mrwqfI-FA', notes: 'Explore arithmetic, comparison, and logical operators.', challenge: { title: 'Simple Calculator', description: 'Write a script that takes two numbers and prints their sum, difference, product, and quotient.' } },
      { day: 4, module: 'Python Basics', topic: 'String Manipulation', videoUrl: 'https://www.youtube.com/embed/mo4vTuL-zL4', notes: 'Learn to work with strings: concatenation, slicing, and methods like `.upper()` and `.lower()`.', challenge: { title: 'Format a Name', description: 'Take a user\'s first and last name, format them to be capitalized, and print a full name string.' } },
      { day: 5, module: 'Python Basics', topic: 'User Input', videoUrl: 'https://www.youtube.com/embed/Lde-3v9a-fA', notes: 'Make scripts interactive by accepting user input with the `input()` function.', challenge: { title: 'Personalized Greeting', description: 'Write a script that asks for the user\'s name and prints a personalized greeting.' } },
      { day: 6, module: 'Control Flow', topic: 'If/Elif/Else Statements', videoUrl: 'https://www.youtube.com/embed/n5vsv_kAdP8', notes: 'Learn to make decisions in your code with conditional statements.', challenge: { title: 'Grade Calculator', description: 'Write a program that takes a numerical score and prints the corresponding letter grade (A, B, C, D, F).' } },
      { day: 7, module: 'Data Structures', topic: 'Introduction to Lists', videoUrl: 'https://www.youtube.com/embed/XDaL-Jm_E2g', notes: 'Learn about lists, an ordered and mutable data structure. Cover creating, accessing, and modifying them.', challenge: { title: 'To-Do List', description: 'Create a list for a to-do list. Add tasks, print the second task, and then change the first task.' } },
      { day: 8, module: 'Control Flow', topic: 'For Loops', videoUrl: 'https://www.youtube.com/embed/0-S7b5Dk-M4', notes: 'Master `for` loops to iterate over sequences like lists and strings.', challenge: { title: 'Print List Items', description: 'Create a list of your favorite foods and use a `for` loop to print each item.' } },
      { day: 9, module: 'Control Flow', topic: 'While Loops', videoUrl: 'https://www.youtube.com/embed/JuI-MwEwryU', notes: 'Understand `while` loops for repeating code as long as a condition is true.', challenge: { title: 'Countdown Timer', description: 'Write a script that counts down from 10 to 1 and then prints "Blast off!".' } },
      { day: 10, module: 'Data Structures', topic: 'Dictionaries', videoUrl: 'https://www.youtube.com/embed/B9n_A0O92-A', notes: 'Learn about dictionaries for storing key-value pairs. Cover creating, accessing, and modifying data.', challenge: { title: 'User Profile', description: 'Create a dictionary for a user\'s profile with keys "name", "age", and "email". Print the user\'s age.' } },
      { day: 11, module: 'Data Structures', topic: 'Tuples and Sets', videoUrl: 'https://www.youtube.com/embed/SjN_2j9y-l4', notes: 'Understand tuples (immutable lists) and sets (unordered collections of unique items).', challenge: { title: 'Find Unique Items', description: 'Given a list with duplicate numbers, use a set to find and print only the unique numbers.' } },
      { day: 12, module: 'Data Structures', topic: 'Working with Lists', videoUrl: 'https://www.youtube.com/embed/XDaL-Jm_E2g', notes: 'Dive deeper into list methods like `.append()`, `.pop()`, `.sort()`, and list comprehensions.', challenge: { title: 'Shopping List Manager', description: 'Create a script for a user to add items to a shopping list, remove items, and view the sorted list.' } },
      { day: 13, module: 'Data Structures', topic: 'Nesting Data Structures', videoUrl: 'https://www.youtube.com/embed/s0dM00nAFnI', notes: 'Learn to create complex data structures like a list of dictionaries.', challenge: { title: 'Class Roster', description: 'Create a list of dictionaries, where each dictionary represents a student with a name and a grade.' } },
      { day: 14, module: 'Project', topic: 'Simple Text-Based Game', videoUrl: 'https://www.youtube.com/embed/4KDo-dd0-yA', notes: 'Combine your knowledge of loops, conditionals, and data structures.', challenge: { title: 'Build a Number Guessing Game', description: 'Create a game where the computer picks a random number and the user has to guess it.' } },
      { day: 15, module: 'Functions & Modules', topic: 'Introduction to Functions', videoUrl: 'https://www.youtube.com/embed/yL00-w3-qus', notes: 'Learn to define and call your own functions for reusable code.', challenge: { title: 'Greeting Function', description: 'Write a function that takes a name as an argument and prints a personalized greeting.' } },
      { day: 16, module: 'Functions & Modules', topic: 'Function Arguments & Return Values', videoUrl: 'https://www.youtube.com/embed/hrk0H8P7f8c', notes: 'Understand passing data into functions with arguments and getting data back with `return`.', challenge: { title: 'Area Calculator Function', description: 'Write a function that calculates the area of a rectangle and returns the result.' } },
      { day: 17, module: 'Functions & Modules', topic: 'Scope: Local vs. Global', videoUrl: 'https://www.youtube.com/embed/waJ35wY1i1Y', notes: 'Learn the difference between local variables (inside functions) and global variables.', challenge: { title: 'Experiment with Scope', description: 'Define a global variable and a function that tries to modify it. Observe the behavior.' } },
      { day: 18, module: 'Functions & Modules', topic: 'Introduction to Modules', videoUrl: 'https://www.youtube.com/embed/1QX-G22y-JA', notes: 'Discover how to use built-in modules like `math` and `random` to extend functionality.', challenge: { title: 'Random Number Generator', description: 'Use the `random` module to generate and print a random integer between 1 and 100.' } },
      { day: 19, module: 'Functions & Modules', topic: 'Creating Your Own Modules', videoUrl: 'https://www.youtube.com/embed/1QX-G22y-JA', notes: 'Learn to organize functions into separate `.py` files and import them.', challenge: { title: 'Create a `calculations` Module', description: 'Create a module with functions for addition, subtraction, etc. Import and use it in another script.' } },
      { day: 20, module: 'Functions & Modules', topic: 'Working with PIP', videoUrl: 'https://www.youtube.com/embed/FcrDk-Ak36M', notes: 'Learn to use `pip` to install third-party libraries from the Python Package Index (PyPI).', challenge: { title: 'Install and Use a Package', description: 'Install the `requests` package and write a script to make a GET request to a URL.' } },
      { day: 21, module: 'Project', topic: 'Command-Line To-Do List App', videoUrl: 'https://www.youtube.com/embed/j_113sTFY2s', notes: 'Build an advanced application using functions and modules.', challenge: { title: 'Build the To-Do App', description: 'Create a command-line app to add, view, and delete tasks. Organize code into functions.' } },
      { day: 22, module: 'Intermediate Python', topic: 'File I/O: Reading Files', videoUrl: 'https://www.youtube.com/embed/aZyVeT9j-cE', notes: 'Learn how to open and read data from text files.', challenge: { title: 'Read a Story', description: 'Create a text file with a short story. Write a script to read and print its contents.' } },
      { day: 23, module: 'Intermediate Python', topic: 'File I/O: Writing and Appending', videoUrl: 'https://www.youtube.com/embed/aZyVeT9j-cE', notes: 'Learn how to write new content or append to an existing file.', challenge: { title: 'Log User Input', description: 'Write a script that asks for a user\'s name and appends it to a `log.txt` file.' } },
      { day: 24, module: 'Intermediate Python', topic: 'Error Handling with Try/Except', videoUrl: 'https://www.youtube.com/embed/g02TFjN-tM0', notes: 'Learn to handle errors gracefully using `try` and `except` blocks.', challenge: { title: 'Safe Division Calculator', description: 'Create a calculator that handles division by zero errors.' } },
      { day: 25, module: 'Intermediate Python', topic: 'Intro to Object-Oriented Programming (OOP)', videoUrl: 'https://www.youtube.com/embed/Oa2d2402ij0', notes: 'Understand classes and objects. [FLIPCARD front="What is a Class?" back="A class is a blueprint for creating objects. It defines a set of attributes (data) and methods (functions) that the created objects will have."]', challenge: { title: 'Create a `Dog` Class', description: 'Create a `Dog` class with attributes for `name` and `breed`. Create two different dog objects from this class.' } },
      { day: 26, module: 'Intermediate Python', topic: 'Classes: Methods', videoUrl: 'https://www.youtube.com/embed/Oa2d2402ij0', notes: 'Learn to define methods (functions inside a class) that define an object\'s behavior.', challenge: { title: 'Add a `bark` Method', description: 'Add a `bark` method to your `Dog` class that prints "Woof!". Call this method on your dog objects.' } },
      { day: 27, module: 'Intermediate Python', topic: 'Classes: The __init__ Method', videoUrl: 'https://www.youtube.com/embed/Oa2d2402ij0', notes: 'Learn about the `__init__` constructor method to initialize an object\'s attributes.', challenge: { title: 'Refactor the `Dog` Class', description: 'Modify your `Dog` class to use `__init__` to set the name and breed when an object is created.' } },
      { day: 28, module: 'Intermediate Python', topic: 'Classes: Inheritance', videoUrl: 'https://www.youtube.com/embed/H5w2n_P2k9k', notes: 'Learn how a new class can inherit attributes and methods from an existing class.', challenge: { title: 'Create a `Cat` Class', description: 'Create an `Animal` parent class, and have `Dog` and a new `Cat` class inherit from it.' } },
      { day: 29, module: 'Project', topic: 'Contact Book Application', videoUrl: 'https://www.youtube.com/embed/ASopA7hKT-U', notes: 'Build a complete application using OOP.', challenge: { title: 'Build the Contact Book', description: 'Create a `Contact` class and a `ContactBook` class. The app should allow adding, viewing, and searching for contacts.' } },
      { day: 30, module: 'Final Project', topic: 'Putting It All Together', videoUrl: 'https://www.youtube.com/embed/ASopA7hKT-U', notes: 'Review all concepts and build a final project.', challenge: { title: 'Build a Final Project', description: 'Choose a project: an advanced text game, a simple weather app using an API, or a file organizer tool.' } },
    ],
  },
  // 3. Artificial Intelligence
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    description: 'Explore the exciting world of AI, from machine learning fundamentals to the basics of neural networks.',
    icon: 'AiIcon',
    badge: 'AiBadge',
    imageUrl: 'https://picsum.photos/seed/ai/600/400',
    quiz: [
        { question: "What is the primary goal of Supervised Learning?", options: ["To find hidden patterns in unlabeled data", "To learn from labeled data to make predictions", "To learn through trial and error", "To group similar data points together"], correctAnswer: "To learn from labeled data to make predictions" },
        { question: "Which of these is a popular Python library for Machine Learning?", options: ["React", "Scikit-learn", "jQuery", "Laravel"], correctAnswer: "Scikit-learn" },
        { question: "In a neural network, what is the purpose of an activation function?", options: ["To calculate the loss", "To update the weights", "To introduce non-linearity", "To normalize the input data"], correctAnswer: "To introduce non-linearity" }
    ],
    structure: [
        { day: 1, module: 'Foundations', topic: 'What is Artificial Intelligence?', videoUrl: 'https://www.youtube.com/embed/ad79nYk2keg', notes: 'A broad introduction to AI, its history, goals, and subfields like Machine Learning, NLP, and Computer Vision.', challenge: { title: 'Identify AI in Daily Life', description: 'List five examples of AI you interact with daily and explain their function.' } },
        { day: 2, module: 'Foundations', topic: 'Types of AI', videoUrl: 'https://www.youtube.com/embed/UXTpsT45yG8', notes: 'Learn the differences between Narrow AI (ANI), General AI (AGI), and Superintelligent AI (ASI).', challenge: { title: 'Classify AI Examples', description: 'For the five examples from yesterday, classify each as a type of Narrow AI.' } },
        { day: 3, module: 'Foundations', topic: 'Setting Up Your Python Environment', videoUrl: 'https://www.youtube.com/embed/sZ00-K4t-7M', notes: 'Install key libraries for AI: NumPy for numerical operations, Pandas for data manipulation, and Matplotlib for plotting.', challenge: { title: 'Install and Verify Libraries', description: 'Install NumPy, Pandas, and Matplotlib. Write a script to import each and print its version number.' } },
        { day: 4, module: 'Foundations', topic: 'Introduction to NumPy', videoUrl: 'https://www.youtube.com/embed/a9aBqVb-gDs', notes: 'Learn the basics of NumPy arrays, the fundamental package for numerical computing in Python.', challenge: { title: 'Create and Manipulate NumPy Arrays', description: 'Create a 1D NumPy array of numbers from 1 to 10. Calculate and print the mean.' } },
        { day: 5, module: 'Foundations', topic: 'Introduction to Pandas', videoUrl: 'https://www.youtube.com/embed/L-Ci8p646kE', notes: 'Explore Pandas Series and DataFrames. Learn to create a DataFrame and inspect it with `.head()` and `.describe()`.', challenge: { title: 'Create a Student DataFrame', description: 'Create a Pandas DataFrame to store information about three students (name, age, grade). Display the first two rows.' } },
        { day: 6, module: 'ML Concepts', topic: 'Supervised vs. Unsupervised Learning', videoUrl: 'https://www.youtube.com/embed/IZJ20soet80', notes: 'Differentiate between supervised (labeled data), unsupervised (unlabeled data), and reinforcement learning. Understand features and labels.', challenge: { title: 'Categorize ML Problems', description: 'Identify if predicting house prices, grouping customers, and a bot playing chess are supervised, unsupervised, or reinforcement learning.' } },
        { day: 7, module: 'ML Concepts', topic: 'The Machine Learning Workflow', videoUrl: 'https://www.youtube.com/embed/Qc-c-S_iP-4', notes: 'Outline the typical steps in an ML project: data collection, preparation, model selection, training, evaluation, and deployment.', challenge: { title: 'Outline a Project Plan', description: 'Choose a simple problem (e.g., spam detection) and write a one-page outline of the ML workflow steps for it.' } },
        { day: 8, module: 'Supervised Learning', topic: 'Linear Regression', videoUrl: 'https://www.youtube.com/embed/iT31gC5-rEY', notes: 'Understand linear regression for predicting continuous values. Learn about the line of best fit, slope, and intercept.', challenge: { title: 'Manually Calculate a Prediction', description: 'Given a simple linear regression equation (e.g., y = 2x + 3) and an input value for x, calculate the predicted y.' } },
        { day: 9, module: 'Supervised Learning', topic: 'Linear Regression with Scikit-learn', videoUrl: 'https://www.youtube.com/embed/i0E8fLcl-M8', notes: 'Use the Scikit-learn library to train a simple linear regression model on a sample dataset.', challenge: { title: 'Train Your First Model', description: 'Using a sample dataset (experience vs. salary), train a linear regression model and predict the salary for a given experience level.' } },
        { day: 10, module: 'Supervised Learning', topic: 'Classification vs. Regression', videoUrl: 'https://www.youtube.com/embed/Q4zZ22B6i3g', notes: 'Clearly define the difference between regression (predicting a number) and classification (predicting a category).', challenge: { title: 'Classify Problems', description: 'Categorize problems (predicting temperature, identifying a cat, predicting stock price) as regression or classification.' } },
        { day: 11, module: 'Supervised Learning', topic: 'Logistic Regression', videoUrl: 'https://www.youtube.com/embed/vvlK_a-2q4k', notes: 'Learn about logistic regression, a fundamental algorithm for binary classification.', challenge: { title: 'Implement Logistic Regression', description: 'Train a logistic regression model on a simple dataset (e.g., tumor size vs. malignancy) and interpret the output probabilities.' } },
        { day: 12, module: 'Supervised Learning', topic: 'Decision Trees', videoUrl: 'https://www.youtube.com/embed/U2KWyBv3SjE', notes: 'Understand the intuitive, flowchart-like structure of decision trees for classification.', challenge: { title: 'Sketch a Decision Tree', description: 'Draw a simple decision tree to decide whether to play tennis based on weather conditions.' } },
        { day: 13, module: 'Supervised Learning', topic: 'Model Evaluation Metrics', videoUrl: 'https://www.youtube.com/embed/W_3U72c-x3o', notes: 'Learn how to evaluate models: accuracy, precision, and recall for classification; Mean Absolute Error (MAE) for regression.', challenge: { title: 'Calculate Accuracy', description: 'Given a list of true labels and predicted labels, write a function to calculate accuracy.' } },
        { day: 14, module: 'Supervised Learning', topic: 'Overfitting and Underfitting', videoUrl: 'https://www.youtube.com/embed/A-ypNEKi-hQ', notes: 'Understand overfitting (model is too complex) and underfitting (model is too simple).', challenge: { title: 'Identify Overfitting', description: 'Describe a scenario where a model has 100% accuracy on training data but performs poorly on new data. Explain why.' } },
        { day: 15, module: 'Project', topic: 'Titanic Survival Prediction', videoUrl: 'https://www.youtube.com/embed/fC7V5p_Bf0w', notes: 'Apply classification skills to predict passenger survival on the Titanic.', challenge: { title: 'Build the Titanic Predictor', description: 'Download the Titanic dataset, load it into a Pandas DataFrame, and train a classification model to predict survival.' } },
        { day: 16, module: 'Unsupervised Learning', topic: 'Introduction', videoUrl: 'https://www.youtube.com/embed/YyUqg_c-N64', notes: 'Learn the goal of unsupervised learning: to find hidden patterns in unlabeled data.', challenge: { title: 'Brainstorm Unsupervised Problems', description: 'List three real-world problems that could be solved using unsupervised learning (e.g., grouping customers).' } },
        { day: 17, module: 'Unsupervised Learning', topic: 'Clustering with K-Means', videoUrl: 'https://www.youtube.com/embed/LhY07-C3q8A', notes: 'Understand the K-Means algorithm for grouping data points into a predefined number (K) of clusters.', challenge: { title: 'Implement K-Means', description: 'Use Scikit-learn to apply K-Means clustering to a simple, 2D dataset and visualize the results.' } },
        { day: 18, module: 'Unsupervised Learning', topic: 'Dimensionality Reduction', videoUrl: 'https://www.youtube.com/embed/4ecrPoG2A-c', notes: 'Learn about dimensionality reduction for visualizing high-dimensional data.', challenge: { title: 'Explain the "Curse of Dimensionality"', description: 'In your own words, explain why having too many features can be a problem for ML models.' } },
        { day: 19, module: 'Unsupervised Learning', topic: 'Principal Component Analysis (PCA)', videoUrl: 'https://www.youtube.com/embed/S_YyWOUW-IA', notes: 'Explore PCA, a technique for reducing variables while retaining most of the important information.', challenge: { title: 'Apply PCA', description: 'Apply PCA to the Iris dataset to reduce it to two principal components, then plot the results.' } },
        { day: 20, module: 'Project', topic: 'Customer Segmentation', videoUrl: 'https://www.youtube.com/embed/JcI5E2y-8Ag', notes: 'Use unsupervised learning to group customers based on purchasing behavior.', challenge: { title: 'Perform Customer Segmentation', description: 'Using a sample customer dataset, apply K-Means clustering to identify different customer segments.' } },
        { day: 21, module: 'Deep Learning', topic: 'Introduction to Neural Networks', videoUrl: 'https://www.youtube.com/embed/ERMrB5S-D3o', notes: 'Discover the building blocks of deep learning. [FLIPCARD front="What is a Neuron?" back="A neuron in an artificial neural network is a mathematical function that gets one or more inputs, combines them with weights, and passes the result through an activation function to produce an output."]', challenge: { title: 'Draw a Simple Neural Network', description: 'Draw a diagram of a neural network with 2 inputs, one hidden layer of 3 neurons, and 1 output.' } },
        { day: 22, module: 'Deep Learning', topic: 'Activation Functions', videoUrl: 'https://www.youtube.com/embed/1kC3-2y1-5I', notes: 'Learn why activation functions (like Sigmoid, ReLU) are crucial for introducing non-linearity.', challenge: { title: 'Compare Activation Functions', description: 'Research and compare the Sigmoid and ReLU activation functions, noting a key advantage of ReLU.' } },
        { day: 23, module: 'Deep Learning', topic: 'How Neural Networks Learn', videoUrl: 'https://www.youtube.com/embed/AqF-2O_Ie-c', notes: 'Overview of the learning process: forward propagation, calculating loss, and backpropagation to update weights.', challenge: { title: 'Explain Backpropagation', description: 'In simple terms, explain the purpose of the backpropagation algorithm.' } },
        { day: 24, module: 'Deep Learning', topic: 'Intro to TensorFlow and Keras', videoUrl: 'https://www.youtube.com/embed/lx9r-g33-L4', notes: 'Learn about TensorFlow, a leading deep learning framework, and Keras, its user-friendly API.', challenge: { title: 'Install TensorFlow', description: 'Install TensorFlow using pip. Write a script to import it and print the version number.' } },
        { day: 25, module: 'Deep Learning', topic: 'Building a Sequential Model in Keras', videoUrl: 'https://www.youtube.com/embed/VI-2ppM_XkM', notes: 'Learn to build a simple neural network layer by layer using the Keras Sequential API.', challenge: { title: 'Build a Simple Classifier', description: 'Use Keras to build a sequential model for a simple classification task on the Iris dataset.' } },
        { day: 26, module: 'Deep Learning', topic: 'Compiling and Training a Model', videoUrl: 'https://www.youtube.com/embed/VI-2ppM_XkM', notes: 'Understand compiling a Keras model (choosing optimizer and loss) and training it with `.fit()`.', challenge: { title: 'Train Your Keras Model', description: 'Compile and train the model you built yesterday. Observe the training process over several epochs.' } },
        { day: 27, module: 'AI Fields', topic: 'Natural Language Processing (NLP)', videoUrl: 'https://www.youtube.com/embed/c-et-6AI-G8', notes: 'An overview of NLP, the field of AI focused on enabling computers to understand human language.', challenge: { title: 'Use a Pre-trained NLP Model', description: 'Use a library like `transformers` to perform simple sentiment analysis on a few sentences.' } },
        { day: 28, module: 'AI Fields', topic: 'Computer Vision', videoUrl: 'https://www.youtube.com/embed/5dxm82f5k4g', notes: 'An overview of Computer Vision, which enables computers to "see" and interpret visual information.', challenge: { title: 'Describe a CV Application', description: 'Choose a computer vision application (e.g., self-driving car cameras) and explain the tasks it performs.' } },
        { day: 29, module: 'AI Fields', topic: 'AI Ethics and Bias', videoUrl: 'https://www.youtube.com/embed/mGDEh05P6zQ', notes: 'A crucial discussion on the ethical implications of AI, including bias in data, algorithmic fairness, and transparency.', challenge: { title: 'Identify Potential Bias', description: 'Describe how an AI model trained to screen job applications could become biased and what the consequences might be.' } },
        { day: 30, module: 'Final Project', topic: 'Image Classification Project', videoUrl: 'https://www.youtube.com/embed/l-p-gSadyiA', notes: 'Combine your deep learning knowledge to build a complete image classification project.', challenge: { title: 'Build a Fashion MNIST Classifier', description: 'Use the Fashion MNIST dataset. Build, train, and evaluate a neural network to classify the clothing images.' } },
    ],
  },
];