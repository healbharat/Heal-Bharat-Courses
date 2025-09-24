
import type { Course } from '../types';

export const courses: Course[] = [
  // 1. Web Development
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'A 30-day journey covering HTML, CSS, and JavaScript to build modern websites from scratch.',
    icon: 'CodeIcon',
    badge: 'WebDevBadge',
    imageUrl: 'https://picsum.photos/seed/webdev/600/400',
    quiz: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], correctAnswer: "Hyper Text Markup Language" },
        { question: "Which CSS property is used to change the text color of an element?", options: ["font-color", "text-color", "color", "background-color"], correctAnswer: "color" },
        { question: "Which JavaScript keyword is used to declare a variable that cannot be reassigned?", options: ["var", "let", "const", "static"], correctAnswer: "const" },
        { question: "What is the correct HTML for referring to an external style sheet?", options: ['<style src="mystyle.css">', '<stylesheet>mystyle.css</stylesheet>', '<link rel="stylesheet" type="text/css" href="mystyle.css">', '<link src="mystyle.css">'], correctAnswer: '<link rel="stylesheet" type="text/css" href="mystyle.css">' },
        { question: "How do you write 'Hello World' in an alert box?", options: ['alertBox("Hello World");', 'msg("Hello World");', 'alert("Hello World");', 'msgBox("Hello World");'], correctAnswer: 'alert("Hello World");' }
    ],
    structure: [
      { 
        day: 1, 
        topic: 'Getting Started with HTML', 
        module: 'HTML Fundamentals', 
        videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE',
        notes: `### What is HTML?
HTML stands for **HyperText Markup Language**. It is the standard markup language for creating Web pages. It describes the structure of a Web page and consists of a series of elements. HTML elements tell the browser how to display the content.

### The Basic HTML Document Structure
Every HTML document must start with a document type declaration: \`<!DOCTYPE html>\`. The document itself begins with \`<html>\` and ends with \`</html>\`. The visible part of the HTML document is between \`<body>\` and \`</body>\`.

Here's the essential boilerplate:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>
</html>
\`\`\`

### The \`<head>\` Element
The \`<head>\` element is a container for metadata (data about data) and is placed between the \`<html>\` tag and the \`<body>\` tag. Metadata is not displayed.
- \`<title>\`: Specifies a title for the page in the browser toolbar.
- \`<meta>\`: Provides metadata such as character set, page description, keywords, author, and viewport settings.

### HTML Comments
You can add comments to your HTML source by using the following syntax:
\`\`\`html
<!-- Write your comments here -->
\`\`\`
Comments are not displayed by the browser, but they can help document your HTML source code.`, 
        challenge: { 
          title: 'Create Your First Web Page', 
          description: 'Create a new file named `index.html`. Add the complete HTML boilerplate. Set the page title to "My First Web Page". Inside the body, add a comment that says "Visible content goes here". Open the file in your browser to see the title.' 
        } 
      },
      { 
        day: 2, 
        topic: 'Core Text Content', 
        module: 'HTML Fundamentals', 
        notes: `### Headings and Paragraphs
HTML headings are defined with the \`<h1>\` to \`<h6>\` tags. \`<h1>\` defines the most important heading. \`<h6>\` defines the least important heading.
Paragraphs are defined with the \`<p>\` tag. Browsers automatically add some white space (a margin) before and after a paragraph.

### Text Formatting
HTML contains several elements for defining text with a special meaning.
- \`<strong>\` or \`<b>\`: Defines bold text, with \`<strong>\` indicating semantic importance.
- \`<em>\` or \`<i>\`: Defines emphasized or italic text, with \`<em>\` indicating semantic importance.
- \`<u>\`: Defines underlined text.
- \`<mark>\`: Defines marked or highlighted text.
- \`<sub>\`: Defines subscript text.
- \`<sup>\`: Defines superscript text.

### Block vs. Inline Elements
This is a crucial concept in HTML.
- **Block-level elements** always start on a new line and take up the full width available. Examples: \`<h1>\`, \`<p>\`, \`<div>\`.
- **Inline elements** do not start on a new line and only take up as much width as necessary. Examples: \`<a>\`, \`<span>\`, \`<strong>\`.`,
        challenge: { 
          title: 'Structure a Simple Article', 
          description: 'Create an HTML page about your favorite hobby. It should have a main `<h1>` title, at least two `<h2>` subheadings, and several `<p>` paragraphs. Use `<strong>` to highlight important keywords and `<em>` for emphasis.' 
        } 
      },
      { 
        day: 3, 
        topic: 'Links & Lists', 
        module: 'HTML Fundamentals', 
        notes: `### Creating Hyperlinks
Hyperlinks allow users to navigate between pages. The HTML \`<a>\` tag defines a hyperlink.
- \`href\` attribute: Specifies the destination address (\`https://www.google.com\`).
- \`target\` attribute: Specifies where to open the linked document. \`_blank\` opens it in a new tab.
- Linking to email: Use \`mailto:someone@example.com\`.

### Unordered Lists
An unordered list starts with the \`<ul>\` tag. Each list item starts with the \`<li>\` tag. The list items will be marked with bullets.

\`\`\`html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
\`\`\`

### Ordered Lists
An ordered list starts with the \`ol\` tag. Each list item starts with the \`<li>\` tag. The list items will be marked with numbers.

### Nesting Lists
You can place one list inside another \`<li>\` element to create nested lists.`,
        challenge: { 
          title: 'Create a Recipe Page', 
          description: 'Create a recipe page for your favorite dish. Use an unordered list (`<ul>`) for the ingredients and an ordered list (`<ol>`) for the instructions. Include a link to the original source of the recipe that opens in a new tab.' 
        } 
      },
      { 
        day: 4, 
        topic: 'Images & Media', 
        module: 'HTML Fundamentals', 
        notes: `### Embedding Images
The \`<img>\` tag is used to embed an image in an HTML page. It is an empty tag, meaning it contains attributes only, and does not have a closing tag.
- \`src\` attribute: Specifies the path to the image.
- \`alt\` attribute: Provides an alternate text for an image, which is crucial for accessibility.
- \`width\` and \`height\` attributes: Specify the size of the image.

### Video and Audio
- \`<video>\`: Embeds a video player. Use the \`controls\` attribute to add play/pause buttons.
- \`<audio>\`: Embeds an audio player. Also uses the \`controls\` attribute.

### Iframes
An HTML \`<iframe>\` is used to display a web page within a web page. This is commonly used for embedding content like YouTube videos or Google Maps.

\`\`\`html
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player"></iframe>
\`\`\`
`,
        challenge: { 
          title: 'Create a Travel Post', 
          description: 'Create a page about a place you have visited. Include a main image of the location. Add a small gallery of three other images. Finally, find the location on Google Maps and use the "Embed a map" feature to add an interactive map to your page using an iframe.' 
        } 
      },
      { 
        day: 5, 
        topic: 'Tables for Data', 
        module: 'HTML Fundamentals', 
        notes: `### Basic Table Structure
HTML tables allow you to arrange data into rows and columns.
- \`<table>\`: The wrapper for the entire table.
- \`<tr>\`: Defines a table row.
- \`<td>\`: Defines a table cell (table data).
- \`<th>\`: Defines a header cell. Text in \`<th>\` elements are bold and centered by default.

### Grouping Table Content
For more complex tables, you can group content for better structure and semantics.
- \`<thead>\`: Groups the header content in a table.
- \`<tbody>\`: Groups the body content in a table.
- \`<tfoot>\`: Groups the footer content in a table.

### Spanning Rows and Columns
You can make a cell span over multiple rows or columns.
- \`colspan="2"\`: Makes a cell span two columns.
- \`rowspan="2"\`: Makes a cell span two rows.`,
        challenge: { 
          title: 'Build a Feature Comparison Table', 
          description: 'Create a table that compares three different products (e.g., smartphones, laptops). The first column should list the features (e.g., "Screen Size", "Price", "Storage"). The next three columns should contain the data for each product. Use `<th>` for the product names and feature labels.' 
        } 
      },
      { 
        day: 6, 
        topic: 'Introduction to Forms', 
        module: 'HTML Forms', 
        notes: `### The \`<form>\` Element
The \`<form>\` element is a container for different types of input elements to collect user data.
- \`action\` attribute: Defines the action to be performed when the form is submitted (usually a URL).
- \`method\` attribute: Specifies the HTTP method to be used when submitting the form data (commonly \`GET\` or \`POST\`).

### Common Input Types
The \`<input>\` element is the most used form element.
- \`<input type="text">\`: A single-line text input field.
- \`<input type="password">\`: A password field where characters are masked.
- \`<input type="email">\`: A field for an email address (with built-in validation).
- \`<input type="number">\`: A field for a number.

### Labels for Accessibility
The \`<label>\` tag defines a label for many form elements. It improves usability for screen reader users, because the screen reader will read out the label when the user focuses on the input element. The \`for\` attribute of the \`<label>\` tag should be equal to the \`id\` attribute of the \`<input>\` element.

### The Submit Button
- \`<input type="submit" value="Submit">\`: Defines a button for submitting the form data.
- \`<button type="submit">Submit</button>\`: A more flexible alternative.`,
        challenge: { 
          title: 'Build a Simple Login Form', 
          description: 'Create an HTML page with a login form. The form should have a field for "Email", a field for "Password", and a "Login" button. Use `<label>` elements for each input field.' 
        } 
      },
      { 
        day: 7, 
        topic: 'Advanced Form Controls', 
        module: 'HTML Forms', 
        notes: `### More Input Types
- \`<input type="checkbox">\`: Defines a checkbox. Checkboxes let a user select ZERO or MORE options of a limited number of choices.
- \`<input type="radio">\`: Defines a radio button. Radio buttons let a user select ONLY ONE of a limited number of choices. All related radio buttons should share the same \`name\` attribute.
- \`<input type="file">\`: Defines a file-select field and a "Browse..." button for file uploads.
- \`<input type="date">\`: Defines a date picker.

### Textarea and Select
- \`<textarea>\`: Defines a multi-line text input control.
- \`<select>\`: Defines a drop-down list.
- \`<option>\`: Defines an option that can be selected inside a \`<select>\` element.

### Form Validation
HTML5 introduced several attributes for form validation, which can be applied to input fields:
- \`required\`: Specifies that an input field must be filled out before submitting.
- \`minlength\` and \`maxlength\`: Specify the minimum and maximum length of text.
- \`min\` and \`max\`: Specify the minimum and maximum values for a numeric input.
- \`pattern\`: Specifies a regular expression that the input's value is checked against.`,
        challenge: { 
          title: 'Create a Detailed Registration Form', 
          description: 'Expand on yesterday\'s form. Create a registration form that includes: a text input for name (required), a dropdown for country, radio buttons for preferred contact method (Email/Phone), checkboxes for interests (e.g., "Technology", "Sports"), and a textarea for "About Me".' 
        } 
      },
      { 
        day: 8, 
        topic: 'Semantic HTML5', 
        module: 'Semantic HTML', 
        notes: `### What is Semantic HTML?
Semantic elements are elements with a meaning. They clearly describe their meaning to both the browser and the developer. This is crucial for Search Engine Optimization (SEO) and accessibility.

### Structural Elements
- \`<header>\`: Defines a header for a document or section.
- \`<nav>\`: Defines a set of navigation links.
- \`<main>\`: Specifies the main content of a document. The content inside should be unique to the document.
- \`<footer>\`: Defines a footer for a document or section.

### Content Sectioning
- \`<section>\`: Defines a thematic grouping of content.
- \`<article>\`: Defines independent, self-contained content (e.g., a blog post).
- \`<aside>\`: Defines content aside from the content it is placed in (like a sidebar).
- \`<figure>\` and \`<figcaption>\`: Used to encapsulate media (like an image) and its caption.

### Div vs. Span
- \`<div>\`: A block-level generic container used to group elements for styling purposes. It has no semantic meaning.
- \`<span>\`: An inline generic container used to group elements for styling, often within a line of text. It has no semantic meaning.`,
        challenge: { 
          title: 'Refactor a Page with Semantic Tags', 
          description: 'Take the article page you built on Day 2 and restructure it using semantic HTML5 elements. Use `<header>` for the title, `<main>` for the content, `<section>` for different parts of the article, and a `<footer>` for author information.' 
        } 
      },
      { 
        day: 9, 
        topic: 'Special Characters & Metadata', 
        module: 'Advanced HTML', 
        notes: `### HTML Entities
Some characters are reserved in HTML. For example, you cannot use the less than (<) or greater than (>) signs within your text, because the browser could mistake them for tags. HTML entities are used to display these reserved characters.
- \`&lt;\` for <
- \`&gt;\` for >
- \`&amp;\` for &
- \`&copy;\` for ©

### The \`<meta>\` Tag
The meta tag provides metadata about the HTML document.
- \`<meta charset="UTF-8">\`: Specifies the character encoding. UTF-8 is standard.
- \`<meta name="description" content="...">\`: A description of your web page, used by search engines.
- \`<meta name="keywords" content="...">\`: Keywords for search engines (less important now).
- \`<meta name="author" content="...">\`: The author of the page.
- \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`: Crucial for responsive design. It sets the width of the page to follow the screen-width of the device.

### Adding a Favicon
A favicon is a small image displayed next to the page title in the browser tab. You can add a favicon to your site using a \`<link>\` tag in the \`<head>\` section.
\`\`\`html
<link rel="icon" type="image/x-icon" href="/images/favicon.ico">
\`\`\``,
        challenge: { 
          title: 'Enhance Your Page\'s Head', 
          description: 'Create a new HTML page. In the `<head>`, add meta tags for description and author. In the `<body>`, write a small paragraph that correctly displays the phrase "The <h1> tag is for headings." using HTML entities.' 
        } 
      },
      { 
        day: 10, 
        topic: 'Project: Build a Simple Portfolio Page', 
        module: 'HTML Project', 
        notes: `### Putting It All Together
Now it's time to combine everything you have learned about HTML into a single, cohesive project. A one-page portfolio is an excellent way to demonstrate your skills.

### Project Plan
1.  **Structure:** Use semantic HTML5 elements (\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<footer>\`) to create a clear and meaningful page structure.
2.  **Content:** Include sections like "About Me," "My Projects," "Skills," and "Contact."
3.  **Elements:** Use a variety of elements: headings, paragraphs, lists (for projects or skills), images (a profile picture), and a complete contact form.
4.  **Links:** The navigation bar should contain links that jump to the different sections of the page (internal links).`,
        challenge: { 
          title: 'Build a Complete HTML Portfolio Page', 
          description: 'Create a single `index.html` file for your personal portfolio. It must include: a header with your name, a navigation menu linking to sections, an "About Me" section with a picture, a "Projects" section using a list, and a "Contact" section with a functional form. Use only HTML for this project.' 
        } 
      },
      { 
        day: 11, 
        topic: 'Introduction to CSS & Syntax', 
        module: 'CSS Fundamentals', 
        videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc',
        notes: `### What is CSS?
CSS stands for **Cascading Style Sheets**. It's the language we use to style an HTML document. CSS describes how HTML elements should be displayed on screen, paper, or in other media.

### Three Ways to Insert CSS
1.  **External CSS:** Styles are defined in an external \`.css\` file. This is the best method. You link it in the HTML \`<head>\` section: \`<link rel="stylesheet" href="styles.css">\`.
2.  **Internal CSS:** Styles are defined within a \`<style>\` element, also inside the \`<head>\` section.
3.  **Inline CSS:** Styles are applied directly to an HTML element using the \`style\` attribute. This is generally avoided.

### Basic CSS Syntax
A CSS rule consists of a selector and a declaration block:
\`\`\`css
selector {
  property: value; /* This is a declaration */
  color: blue;
  font-size: 16px;
}
\`\`\`
- The **selector** points to the HTML element you want to style.
- The **declaration block** contains one or more declarations separated by semicolons.
- Each **declaration** includes a CSS property name and a value, separated by a colon.`, 
        challenge: { 
          title: 'Apply Your First Styles', 
          description: 'Create a new file named `styles.css`. Link this external stylesheet to the portfolio page you built on Day 10. In your CSS file, write a rule that changes the background color of the `<body>` to a dark gray and the color of all `<h1>` text to a light blue.' 
        } 
      },
      { 
        day: 12, 
        topic: 'CSS Selectors', 
        module: 'CSS Fundamentals', 
        notes: `### Targeting Elements
Selectors are how you target the HTML elements you want to style.

- **Element Selector:** Selects elements based on the element name. Example: \`p\` selects all \`<p>\` elements.
- **ID Selector:** Uses the \`id\` attribute of an HTML element to select a specific, unique element. Example: \`#main-header\` selects the element with \`id="main-header"\`.
- **Class Selector:** Selects elements with a specific \`class\` attribute. You can use the same class on multiple elements. Example: \`.project-card\` selects all elements with \`class="project-card"\`.
- **Grouping Selector:** Selects all the HTML elements with the same style definitions. Example: \`h1, h2, h3\` selects all h1, h2, and h3 elements.
- **Descendant Selector:** Selects an element that is a descendant of another specific element. Example: \`nav a\` selects all \`<a>\` elements inside a \`<nav>\`.

### Pseudo-classes
A pseudo-class is used to define a special state of an element.
- \`:hover\`: Selects elements when you mouse over them.
- \`:active\`: Selects the active link.
- \`:focus\`: Selects an element that has focus (like an input field).`, 
        challenge: { 
          title: 'Target Specific Elements', 
          description: 'In your portfolio, give the main header an ID. Give each project section a common class name. In your CSS, use the ID to style the header uniquely. Use the class selector to apply a border to all project sections. Finally, add a `:hover` pseudo-class to your navigation links to make them change color when you mouse over them.' 
        } 
      },
      { 
        day: 13, 
        topic: 'The Box Model', 
        module: 'CSS Fundamentals', 
        notes: `### The CSS Box Model
All HTML elements can be considered as boxes. The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.

- **Content:** The content of the box, where text and images appear.
- **Padding:** Clears an area around the content. The padding is transparent.
- **Border:** A border that goes around the padding and content.
- **Margin:** Clears an area outside the border. The margin is transparent.

### The \`box-sizing\` Property
By default, the \`width\` and \`height\` properties set the width and height of the content area. If you set a border or padding, it will be added on top of the width and height. This can make layout tricky.

The solution is \`box-sizing: border-box;\`. This tells the browser to account for any border and padding in the values you specify for width and height. It makes working with layouts much more intuitive.
\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\``, 
        challenge: { 
          title: 'Style a Content Box', 
          description: 'Apply box model properties to your project sections. Add `20px` of padding inside them. Give them a `2px` solid border. Add a `15px` margin to the bottom of each section to create space between them. Be sure to add `box-sizing: border-box;` to your CSS.' 
        } 
      },
      { 
        day: 14, 
        topic: 'Colors & Backgrounds', 
        module: 'CSS Fundamentals', 
        notes: `### CSS Colors
There are several ways to specify colors in CSS:
- **Color Names:** \`red\`, \`blue\`, \`tomato\`.
- **HEX:** \`#ff0000\`. This is a hexadecimal representation of the color.
- **RGB:** \`rgb(255, 0, 0)\`. This uses the Red, Green, Blue color model.
- **RGBA:** \`rgba(255, 0, 0, 0.5)\`. This is RGB with an Alpha channel for transparency.
- **HSL:** \`hsl(0, 100%, 50%)\`. This uses Hue, Saturation, and Lightness.

### Background Properties
- \`background-color\`: Sets the background color of an element.
- \`background-image\`: Sets an image as the background. Use \`url('path/to/image.jpg')\`.
- \`background-repeat\`: Sets if/how a background image will be repeated. (\`no-repeat\`, \`repeat-x\`, \`repeat-y\`)
- \`background-position\`: Sets the starting position of a background image. (\`center\`, \`top right\`)
- \`background-size\`: Specifies the size of the background images. (\`cover\`, \`contain\`)

### Gradients
CSS gradients let you display smooth transitions between two or more specified colors.
- **Linear Gradient:** \`background-image: linear-gradient(direction, color1, color2);\``, 
        challenge: { 
          title: 'Create a Colorful Hero Section', 
          description: 'Style the main header section of your portfolio. Give it a `linear-gradient` background that fades from a dark blue to a lighter blue. Set the text color to white for contrast.' 
        } 
      },
      { 
        day: 15, 
        topic: 'Typography', 
        module: 'CSS Fundamentals', 
        notes: `### Font Properties
CSS has a lot of properties for styling text and fonts.
- \`font-family\`: Specifies the font for an element. You should provide several font names in a "fallback" system.
- \`font-size\`: Sets the size of the text.
- \`font-weight\`: Sets how thick or thin characters in text should be displayed (\`normal\`, \`bold\`).
- \`font-style\`: Specifies the font style for a text (\`normal\`, \`italic\`).
- \`line-height\`: Specifies the space between lines of text, which is important for readability.

### Text Properties
- \`text-align\`: Specifies the horizontal alignment of text (\`left\`, \`right\`, \`center\`).
- \`text-transform\`: Controls the capitalization of text (\`uppercase\`, \`lowercase\`, \`capitalize\`).
- \`letter-spacing\`: Increases or decreases the space between characters.

### Using Google Fonts
You can use external fonts like Google Fonts to greatly improve your design.
1. Go to fonts.google.com and choose a font.
2. Select the styles you want.
3. Google will provide a \`<link>\` tag to put in your HTML's \`<head>\` or an \`@import\` rule to put at the top of your CSS file.
4. Use the provided \`font-family\` name in your CSS.`, 
        challenge: { 
          title: 'Improve Your Portfolio\'s Typography', 
          description: 'Go to Google Fonts and choose two fonts: one for headings and one for body text. Import them into your project. Apply the heading font to all your `<h1>` and `<h2>` tags and the body font to your `<p>` tags. Adjust the `font-size` and `line-height` for paragraphs to make them easy to read.' 
        } 
      },
      { 
        day: 16, 
        topic: 'Display & Position', 
        module: 'CSS Layouts', 
        notes: `### The \`display\` Property
The \`display\` property is the most important CSS property for controlling layout.
- \`block\`: The element starts on a new line and takes up the full width available.
- \`inline\`: The element does not start on a new line and only takes up as much width as necessary.
- \`inline-block\`: Like \`inline\`, but you can set a width and height on the element.
- \`none\`: The element is completely removed.

### The \`position\` Property
The \`position\` property specifies the type of positioning method used for an element.
- \`static\`: Default value. Elements render in order, as they appear in the document flow.
- \`relative\`: The element is positioned relative to its normal position.
- \`absolute\`: The element is positioned relative to the nearest positioned ancestor.
- \`fixed\`: The element is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled.
- \`sticky\`: The element is positioned based on the user's scroll position. It toggles between \`relative\` and \`fixed\`.`, 
        challenge: { 
          title: 'Create a Sticky Navigation Bar', 
          description: 'Modify your portfolio\'s header/navigation bar. Use `position: sticky` and set `top: 0` to make it stick to the top of the screen when the user scrolls down.' 
        } 
      },
      { 
        day: 17, 
        topic: 'Flexbox Layout', 
        module: 'CSS Layouts', 
        notes: `### Introduction to Flexbox
Flexbox is a one-dimensional layout model that offers an easy and clean way to arrange items in a row or a column.

### The Flex Container
To start using Flexbox, you need a container element and set its display property to \`flex\`.
\`\`\`css
.container {
  display: flex;
}
\`\`\`
- \`flex-direction\`: Defines the direction the main axis runs (\`row\` or \`column\`).
- \`justify-content\`: Aligns flex items along the main axis (\`flex-start\`, \`flex-end\`, \`center\`, \`space-between\`, \`space-around\`).
- \`align-items\`: Aligns flex items along the cross axis (\`flex-start\`, \`flex-end\`, \`center\`, \`stretch\`).
- \`flex-wrap\`: Allows items to wrap onto multiple lines.

### Flex Items
The direct children of the flex container are flex items.
- \`flex-grow\`: Dictates how much an item will grow relative to the other items.
- \`order\`: Changes the visual order of items.`, 
        challenge: { 
          title: 'Build a Flexible Navigation Bar', 
          description: 'Use Flexbox to style your portfolio\'s navigation menu. Make the `<ul>` a flex container. Use `justify-content` to space the links out evenly across the bar.' 
        } 
      },
      { 
        day: 18, 
        topic: 'CSS Grid Layout', 
        module: 'CSS Layouts', 
        notes: `### Introduction to CSS Grid
CSS Grid Layout is a two-dimensional layout system, meaning it can handle both columns and rows.

### The Grid Container
To create a grid, you need a container element with \`display: grid;\`.
\`\`\`css
.grid-container {
  display: grid;
}
\`\`\`
- \`grid-template-columns\`: Defines the number and size of columns. You can use pixels, percentages, or the flexible \`fr\` unit. Example: \`grid-template-columns: 1fr 1fr 1fr;\` creates three equal columns.
- \`grid-template-rows\`: Defines the size of rows.
- \`gap\` (or \`grid-gap\`): Specifies the size of the gap between the rows and columns.

### Placing Items
By default, items will be placed in the grid in the order they appear in the HTML. You can also explicitly place items using properties like \`grid-column-start\`, \`grid-column-end\`, etc.`, 
        challenge: { 
          title: 'Create a Project Gallery Layout', 
          description: 'Use CSS Grid for the section containing your project cards. Set up a grid that has three columns on wider screens. Use the `gap` property to create space between the cards.' 
        } 
      },
      { 
        day: 19, 
        topic: 'Responsive Design & Media Queries', 
        module: 'CSS Layouts', 
        notes: `### What is Responsive Design?
Responsive Web Design is about using HTML and CSS to automatically resize, hide, shrink, or enlarge a website, to make it look good on all devices (desktops, tablets, and phones).

### The Viewport Meta Tag
You must include this \`<meta>\` tag in all your web pages:
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

### Media Queries
Media queries are the key to responsive design. They allow you to apply CSS styles only when certain conditions (like screen size) are met.
A media query is a logical expression that is either true or false. The syntax is:
\`\`\`css
/* For screens 768px and smaller */
@media screen and (max-width: 768px) {
  .some-class {
    /* Styles for smaller screens go here */
    flex-direction: column;
  }
}
\`\`\`
It's common to have several media queries for different breakpoints (e.g., for tablets, then for phones).`, 
        challenge: { 
          title: 'Make Your Portfolio Page Mobile-Friendly', 
          description: 'Add a media query to your CSS file. For screen widths under 768px, change your three-column project grid to a single column so the cards stack vertically. You may also want to increase the body font size for better readability on small screens.' 
        } 
      },
      { 
        day: 20, 
        topic: 'Transitions, Transforms & Project Day', 
        module: 'CSS Project', 
        notes: `### Adding Polish with CSS
You can use CSS to add simple animations and interactivity to your site.

### Transitions
CSS transitions allow you to change property values smoothly, over a given duration. To create a transition effect, you must specify two things: the CSS property you want to add an effect to, and the duration of the effect.
\`\`\`css
.box {
  transition: width 2s;
}

.box:hover {
  width: 300px;
}
\`\`\`

### 2D Transforms
The \`transform\` property lets you move, scale, and rotate elements.
- \`translate(x, y)\`: Moves an element.
- \`rotate(deg)\`: Rotates an element.
- \`scale(x, y)\`: Increases or decreases the size of an element.

Combining \`transform\` with \`transition\` on a \`:hover\` state is a very common and effective way to add interactivity.`, 
        challenge: { 
          title: 'Apply All CSS Skills & Add Polish', 
          description: 'Completely style your portfolio page. Use Flexbox and/or Grid for all layouts. Ensure fonts and colors are consistent. Make sure the page is fully responsive. As a final touch, add a hover effect to your project cards. When a user hovers over a card, it should smoothly scale up slightly using `transform: scale(1.05);` and a `transition`.' 
        } 
      },
      { 
        day: 21, 
        topic: 'Introduction to JavaScript', 
        module: 'JavaScript Fundamentals', 
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
        notes: `### What is JavaScript?
JavaScript is a high-level, dynamic, and interpreted programming language. It is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications.

### How to Add JavaScript to a Page
You can add JavaScript to your HTML in two main ways:
1.  **Internal JavaScript:** You can place JavaScript code inside a \`<script>\` tag within your HTML document, usually just before the closing \`</body>\` tag.
2.  **External JavaScript:** This is the preferred method. You write your JavaScript code in a separate file with a \`.js\` extension and link it to your HTML file like this:
\`\`\`html
<script src="myscripts.js"></script>
\`\`\`

### Your First JavaScript: The Console
The browser's developer console is your best friend when learning JavaScript. You can use the \`console.log()\` function to display output, which is incredibly useful for debugging.
\`\`\`javascript
console.log("Hello, World!");
\`\`\`

### Comments
Just like in HTML and CSS, you can write comments in your JavaScript code to explain what it does.
\`\`\`javascript
// This is a single-line comment

/*
This is a
multi-line comment.
*/
\`\`\``,
        challenge: { 
          title: 'Set Up Your JavaScript File', 
          description: 'Create a new file named `script.js`. Link this external file to your portfolio HTML page. In `script.js`, write a single line of code that logs the message "My portfolio script is running!" to the console. Open your portfolio in the browser and check the developer console to see your message.' 
        } 
      },
      { 
        day: 22, 
        topic: 'Variables and Data Types', 
        module: 'JavaScript Fundamentals', 
        notes: `### Variables
Variables are containers for storing data values. In JavaScript, we use the keywords \`let\`, \`const\`, and the older \`var\` to declare variables.
- \`let\`: Declares a block-scoped, mutable (re-assignable) variable. This is the modern standard for variables that will change.
- \`const\`: Declares a block-scoped, immutable (not re-assignable) variable. The value cannot be changed after it's set. Use this by default.
- \`var\`: The old way of declaring variables. It has some unusual behavior (function-scoped) and is generally avoided in modern JavaScript.

### Data Types
JavaScript has several primitive data types:
- **String:** A sequence of characters, written in single or double quotes. e.g., \`'Hello'\`
- **Number:** Both integers and floating-point numbers. e.g., \`42\`, \`3.14\`
- **Boolean:** Represents logical entities. Can be \`true\` or \`false\`.
- **Undefined:** A variable that has been declared but not yet assigned a value has the value \`undefined\`.
- **Null:** Represents the intentional absence of any object value. It is a special value that means "nothing".

There is also a complex data type:
- **Object:** A collection of key-value pairs, used to store more complex data.`,
        challenge: { 
          title: 'Declare and Use Variables', 
          description: 'In your `script.js` file, declare a `const` variable for your name and a `let` variable for your age. Create a third `const` variable that is a boolean, indicating whether you are a student. Log all three variables to the console in a single, descriptive sentence using string concatenation or template literals.' 
        } 
      },
      { 
        day: 23, 
        topic: 'Functions', 
        module: 'JavaScript Fundamentals', 
        notes: `### What are Functions?
Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code that performs a specific task.

### Declaring a Function
You can define a function using the \`function\` keyword, followed by a name, a list of parameters in parentheses, and a block of code in curly braces.
\`\`\`javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}
\`\`\`

### Calling a Function
To execute the code inside a function, you must "call" or "invoke" it.
\`\`\`javascript
greet("Alice"); // Outputs: "Hello, Alice!"
\`\`\`

### Return Values
Functions often compute a value. The \`return\` statement can be used to return the value from the function.
\`\`\`javascript
function add(num1, num2) {
  return num1 + num2;
}

let sum = add(5, 3); // The 'sum' variable is now 8
console.log(sum);
\`\`\``,
        challenge: { 
          title: 'Write a Reusable Function', 
          description: 'Write a function named `calculateArea` that takes two parameters, `width` and `height`. The function should multiply these two numbers and return the result. Call the function with two different sets of numbers and log the results to the console.' 
        } 
      },
      { 
        day: 24, 
        topic: 'Arrays and Objects', 
        module: 'JavaScript Fundamentals', 
        notes: `### Objects
An object is a collection of related data and/or functionality. These consist of key-value pairs.
\`\`\`javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  isStudent: false
};

// Accessing properties
console.log(person.firstName); // Dot notation
console.log(person['age']);   // Bracket notation
\`\`\`

### Arrays
An array is a single variable that is used to store different elements. It is often used when we want to store a list of elements and access them by a single variable.
\`\`\`javascript
const cars = ["Saab", "Volvo", "BMW"];

// Accessing elements (arrays are zero-indexed)
console.log(cars[0]); // Outputs: "Saab"

// Common array properties/methods
console.log(cars.length); // Get the number of items
cars.push("Ford"); // Add an item to the end
\`\`\``,
        challenge: { 
          title: 'Model a Project', 
          description: 'Create an array called `projects`. Each item in the array should be an object. Each object should represent a project from your portfolio and have properties like `title` (string), `description` (string), and `technologies` (an array of strings). Create at least two project objects. Finally, log the title of your first project to the console.' 
        } 
      },
      { 
        day: 25, 
        topic: 'Conditionals and Loops', 
        module: 'JavaScript Fundamentals', 
        notes: `### Conditional Statements
Conditional statements are used to perform different actions based on different conditions.
- \`if\`: to specify a block of code to be executed, if a specified condition is true
- \`else\`: to specify a block of code to be executed, if the same condition is false
- \`else if\`: to specify a new condition to test, if the first condition is false

### Loops
Loops can execute a block of code a number of times.
- **For Loop:** The \`for\` loop is often the tool you'll use when you want to iterate over an array.
\`\`\`javascript
const colors = ['red', 'green', 'blue'];
for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}
\`\`\`
- **While Loop:** The \`while\` loop loops through a block of code as long as a specified condition is true.\``,
        challenge: { 
          title: 'Loop Through Your Projects', 
          description: 'Using the `projects` array you created yesterday, write a `for` loop that iterates through the array. Inside the loop, use `console.log` to print out the title of each project.' 
        } 
      },
      { 
        day: 26, 
        topic: 'Introduction to the DOM', 
        module: 'JavaScript & The DOM', 
        notes: `### What is the DOM?
The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects. That way, programming languages can connect to the page.

### Selecting Elements
JavaScript needs to be able to find the HTML elements it wants to work with.
- **\`getElementById()\`**: Selects a single element by its unique \`id\`. This is the fastest method.
\`\`\`javascript
const mainHeading = document.getElementById('main-heading');
\`\`\`
- **\`querySelector()\`**: A more versatile method. It returns the *first* element that matches a specified CSS selector.
\`\`\`javascript
const firstProject = document.querySelector('.project-card');
\`\`\`
- **\`querySelectorAll()\`**: Returns a *NodeList* containing all elements that match a specified CSS selector.
\`\`\`javascript
const allProjects = document.querySelectorAll('.project-card');
\`\`\``,
        challenge: { 
          title: 'Select Your Portfolio Elements', 
          description: 'In your portfolio HTML, make sure your main heading has an ID (e.g., `id="name-header"`). In your `script.js` file, use `getElementById` to select that heading and store it in a variable. Then, use `querySelector` to select your "About Me" section. Finally, log both variables to the console to inspect them.' 
        } 
      },
      { 
        day: 27, 
        topic: 'DOM Manipulation', 
        module: 'JavaScript & The DOM', 
        notes: `### Changing Content and Styles
Once you have selected an element, you can manipulate it.
- **Changing Text Content:** Use the \`.textContent\` property to change the text inside an element.
\`\`\`javascript
const heading = document.getElementById('main-heading');
heading.textContent = 'Welcome to My Portfolio!';
\`\`\`
- **Changing HTML Content:** Use \`.innerHTML\` to change the entire HTML content inside an element. Be careful with this, as it can be a security risk if you insert user-provided content.
- **Changing Styles:** You can change the CSS of an element using the \`.style\` property.
\`\`\`javascript
heading.style.color = 'red';
heading.style.fontSize = '48px'; // Note the camelCase for CSS properties
\`\`\`
- **Modifying Attributes:** You can change element attributes like \`src\` or \`href\` directly.
\`\`\`javascript
const profilePic = document.querySelector('#profile-pic');
profilePic.src = 'new-image.jpg';
\`\`\``,
        challenge: { 
          title: 'Dynamically Change Your Page', 
          description: 'Using the heading element you selected yesterday, write a script to change its text content to your name. Then, change its color to a color of your choice.' 
        } 
      },
      { 
        day: 28, 
        topic: 'Event Handling', 
        module: 'JavaScript & The DOM', 
        notes: `### Making Pages Interactive
Events are actions that happen in the system you are programming — the system fires a signal of some kind when an event occurs, and provides a mechanism by which an action can be automatically taken (that is, some code running) when the event occurs.

### The \`addEventListener()\` Method
This is the modern, standard way to handle events. You attach an "event listener" to an element, which waits for a specific event to happen.
\`\`\`javascript
const myButton = document.getElementById('my-button');

myButton.addEventListener('click', function() {
  console.log('Button was clicked!');
  // More code to run on click
});
\`\`\`
- **First argument:** The type of event to listen for (e.g., \`'click'\`, \`'mouseover'\`, \`'keydown'\`).
- **Second argument:** A function to be called when the event occurs. This is often called a "callback function".`,
        challenge: { 
          title: 'Create a Clickable Button', 
          description: 'Add a new `<button>` to your portfolio\'s contact section with the text "Show Contact Info". Give it an ID. In your JavaScript, select this button. Add an event listener so that when the button is clicked, it shows an `alert()` with your email address.' 
        } 
      },
      { 
        day: 29, 
        topic: 'Asynchronous JavaScript & Fetch', 
        module: 'JavaScript & The DOM', 
        notes: `### Synchronous vs. Asynchronous
- **Synchronous** code is executed in sequence – each statement waits for the previous statement to finish before executing.
- **Asynchronous** code allows the program to continue running while it waits for a long-running task (like a network request) to complete.

### The Fetch API
The Fetch API is a modern interface that allows you to make network requests to servers. It's how you get data from an API (Application Programming Interface). Fetch returns a **Promise**.

### Promises and \`async/await\`
A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation. The modern way to work with Promises is using the \`async/await\` syntax.
\`\`\`javascript
async function getQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json(); // Convert the response to JSON
  console.log(data.content);
}

getQuote();
\`\`\`
- \`async\` keyword: Must be placed before a function to use \`await\`.
- \`await\` keyword: Pauses the function execution until the Promise is resolved.`,
        challenge: { 
          title: 'Fetch and Display a Quote', 
          description: 'In your portfolio, create a small section with a `<p>` tag that has an ID like "quote-display". Write an `async` function that fetches a random quote from `https://api.quotable.io/random`. Once you get the quote, update the text content of your paragraph to display the quote.' 
        } 
      },
      { 
        day: 30, 
        topic: 'Project: Add Interactivity to Portfolio', 
        module: 'JavaScript Project', 
        isProject: true,
        notes: `It's time to use all your new JavaScript skills to make your portfolio page dynamic and interactive. A great way to practice DOM manipulation and event handling is to build a light/dark mode theme switcher.

### Instructions
1.  **HTML:** Add a button to your page for toggling the theme. Give it a unique ID, like \`theme-switcher\`.
2.  **CSS:** In the \`<style>\` section, create a class that defines your dark theme styles. For example, a \`.dark-mode\` class on the \`<body>\` could change the background and text colors.
\`\`\`css
/* Add this inside the <style> tag */
body.dark-mode {
  background-color: #1a202c;
  color: #cbd5e0;
}
\`\`\`
3.  **JavaScript:**
    - Select the theme toggle button and the \`<body>\` element using their ID or tag name.
    - Add a 'click' event listener to the button.
    - Inside the event listener function, use the \`.classList.toggle('dark-mode')\` method on the body element. This will add the class if it's not there, and remove it if it is.`,
        challenge: { 
          title: 'Build a Light/Dark Theme Switcher', 
          description: `Using the code editor, build a complete, working theme switcher.

**Requirements Checklist:**
1.  The page should have a title (e.g., \`<h1>\`) and a paragraph (\`<p>\`) of text.
2.  There must be a \`<button>\` with an ID of \`theme-switcher\`.
3.  The necessary CSS for a \`.dark-mode\` class must be included in the \`<style>\` tag.
4.  The JavaScript must correctly select the button and the body.
5.  Clicking the button must toggle the \`.dark-mode\` class on the body, changing the page's appearance.`
        } 
      },
    ],
  },
  // 2. Python Programming
  {
    id: 'python',
    title: 'Python Programming',
    description: 'Master the fundamentals of Python, a versatile language for web development, data science, and more. For a full course, visit: https://www.w3schools.com/python',
    icon: 'PythonIcon',
    badge: 'PythonBadge',
    imageUrl: 'https://picsum.photos/seed/python/600/400',
    quiz: [
        { question: "What is the correct file extension for Python files?", options: [".pyth", ".pt", ".py", ".python"], correctAnswer: ".py" },
        { question: "How do you create a function in Python?", options: ["function myFunction():", "def myFunction():", "create myFunction():", "func myFunction():"], correctAnswer: "def myFunction():" },
        { question: "Which collection is ordered, changeable, and allows duplicate members?", options: ["List", "Tuple", "Set", "Dictionary"], correctAnswer: "List" },
        { question: "How do you start writing an if statement in Python?", options: ["if x > y then:", "if (x > y):", "if x > y:", "if: x > y"], correctAnswer: "if x > y:" },
        { question: "What is the correct way to create a dictionary in Python?", options: ["{ 'name': 'John', 'age': 30 }", "[ 'name': 'John', 'age': 30 ]", "( 'name': 'John', 'age': 30 )", "< 'name': 'John', 'age': 30 >"], correctAnswer: "{ 'name': 'John', 'age': 30 }" }
    ],
    structure: [
      { day: 1, module: 'Python Basics', topic: 'Introduction to Python', videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8', notes: 'Discover Python, its uses, and set up your development environment (install Python and a code editor like VS Code).', challenge: { title: 'Hello, World!', description: 'Write and run your first Python script that prints "Hello, World!" to the console.' } },
      { day: 2, module: 'Python Basics', topic: 'Variables and Data Types', notes: 'Learn about Python\'s basic data types: integers, floats, strings, and booleans. Understand how to store data in variables.', challenge: { title: 'Store Personal Info', description: 'Create variables to store your name, age, and favorite color, then print a sentence using them.' } },
      { day: 3, module: 'Python Basics', topic: 'Basic Operators', notes: 'Explore arithmetic (+, -, *, /), comparison (==, !=, <, >), and logical (and, or, not) operators.', challenge: { title: 'Simple Calculator', description: 'Write a script that takes two numbers and prints their sum, difference, product, and quotient.' } },
      { day: 4, module: 'Python Basics', topic: 'String Manipulation', notes: 'Learn how to work with strings: concatenation, slicing, finding length, and using built-in methods like `.upper()`, `.lower()`, and `.replace()`.', challenge: { title: 'Format a Name', description: 'Take a user\'s first and last name, format them to be capitalized correctly, and print a full name string.' } },
      { day: 5, module: 'Python Basics', topic: 'User Input', notes: 'Learn how to make your scripts interactive by accepting input from the user using the `input()` function.', challenge: { title: 'Personalized Greeting', description: 'Write a script that asks for the user\'s name and then prints a personalized greeting.' } },
      { day: 6, module: 'Python Basics', topic: 'Control Flow: If/Elif/Else', videoUrl: 'https://www.youtube.com/embed/DZwmZ8Usvnk', notes: 'Learn how to make decisions in your code using conditional statements to execute different code blocks based on certain conditions.', challenge: { title: 'Grade Calculator', description: 'Write a program that takes a numerical score and prints the corresponding letter grade (A, B, C, D, F).' } },
      { day: 7, module: 'Python Basics', topic: 'Lists: Introduction', notes: 'Learn about lists, an ordered and mutable data structure in Python. Cover creating lists, accessing elements by index, and modifying them.', challenge: { title: 'To-Do List', description: 'Create a list to represent a to-do list. Add a few tasks, print the second task, and then change the first task to something else.' } },
      { day: 8, module: 'Data Structures & Loops', topic: 'For Loops', videoUrl: 'https://www.youtube.com/embed/OnDr4J2UXSA', notes: 'Master `for` loops to iterate over sequences like lists and strings.', challenge: { title: 'Print List Items', description: 'Create a list of your favorite foods and use a `for` loop to print each food item on a new line.' } },
      { day: 9, module: 'Data Structures & Loops', topic: 'While Loops', notes: 'Understand `while` loops for repeating code as long as a condition is true. Learn about loop control with `break` and `continue`.', challenge: { title: 'Countdown Timer', description: 'Write a script that counts down from 10 to 1 and then prints "Blast off!".' } },
      { day: 10, module: 'Data Structures & Loops', topic: 'Dictionaries', notes: 'Learn about dictionaries for storing key-value pairs. Cover creating, accessing, and modifying dictionary data.', challenge: { title: 'User Profile', description: 'Create a dictionary to store a user\'s profile with keys like "name", "age", and "email". Print out the user\'s age.' } },
      { day: 11, module: 'Data Structures & Loops', topic: 'Tuples and Sets', notes: 'Understand tuples (immutable lists) and sets (unordered collections of unique items) and when to use them.', challenge: { title: 'Find Unique Items', description: 'Given a list with duplicate numbers, use a set to find and print only the unique numbers.' } },
      { day: 12, module: 'Data Structures & Loops', topic: 'Working with Lists', notes: 'Dive deeper into list methods like `.append()`, `.pop()`, `.sort()`, and list comprehensions for concise code.', challenge: { title: 'Shopping List Manager', description: 'Create a script that allows a user to add items to a shopping list, remove items, and view the final sorted list.' } },
      { day: 13, module: 'Data Structures & Loops', topic: 'Nesting Data Structures', notes: 'Learn how to create complex data structures like a list of dictionaries or a dictionary with list values.', challenge: { title: 'Class Roster', description: 'Create a list of dictionaries, where each dictionary represents a student with a name and a grade.' } },
      { day: 14, module: 'Project', topic: 'Simple Text-Based Game', notes: 'Combine your knowledge of loops, conditionals, and data structures.', challenge: { title: 'Build a Number Guessing Game', description: 'Create a game where the computer picks a random number and the user has to guess it. Provide feedback like "Too high" or "Too low".' } },
      { day: 15, module: 'Functions & Modules', topic: 'Introduction to Functions', videoUrl: 'https://www.youtube.com/embed/9Os0o3wzS_I', notes: 'Learn to define and call your own functions to write reusable and organized code.', challenge: { title: 'Greeting Function', description: 'Write a function that takes a name as an argument and prints a personalized greeting.' } },
      { day: 16, module: 'Functions & Modules', topic: 'Function Arguments & Return Values', notes: 'Understand how to pass data into functions using arguments and get data back using the `return` statement.', challenge: { title: 'Area Calculator Function', description: 'Write a function that calculates the area of a rectangle and returns the result.' } },
      { day: 17, module: 'Functions & Modules', topic: 'Scope: Local vs. Global', notes: 'Learn about variable scope and the difference between local variables (inside functions) and global variables.', challenge: { title: 'Experiment with Scope', description: 'Define a global variable and a function that tries to modify it. Observe the behavior and then learn how to modify it correctly using the `global` keyword.' } },
      { day: 18, module: 'Functions & Modules', topic: 'Introduction to Modules', notes: 'Discover how to use built-in Python modules to extend your program\'s functionality. Focus on the `math` and `random` modules.', challenge: { title: 'Random Number Generator', description: 'Write a script that uses the `random` module to generate and print a random integer between 1 and 100.' } },
      { day: 19, module: 'Functions & Modules', topic: 'Creating Your Own Modules', notes: 'Learn how to organize your functions into separate `.py` files and import them into other scripts.', challenge: { title: 'Create a `calculations` Module', description: 'Create a module with functions for addition, subtraction, multiplication, and division. Import and use it in another script.' } },
      { day: 20, module: 'Functions & Modules', topic: 'Working with PIP and External Packages', notes: 'Learn how to use `pip`, Python\'s package installer, to install third-party libraries from the Python Package Index (PyPI).', challenge: { title: 'Install and Use a Package', description: 'Install the `requests` package using pip and write a script to make a simple GET request to a URL and print the status code.' } },
      { day: 21, module: 'Project', topic: 'Command-Line To-Do List App', notes: 'Build a more advanced application using functions and modules.', challenge: { title: 'Build the To-Do App', description: 'Create a command-line application that allows users to add, view, and delete tasks from a to-do list. Organize your code into functions.' } },
      { day: 22, module: 'Intermediate Python', topic: 'File I/O: Reading Files', notes: 'Learn how to open and read data from text files using Python.', challenge: { title: 'Read a Story', description: 'Create a text file with a short story. Write a Python script to read the file and print its contents to the console.' } },
      { day: 23, module: 'Intermediate Python', topic: 'File I/O: Writing and Appending', notes: 'Learn how to write new content to a file or append content to the end of an existing file.', challenge: { title: 'Log User Input', description: 'Write a script that asks the user for their name and then appends their name and the current date to a `log.txt` file.' } },
      { day: 24, module: 'Intermediate Python', topic: 'Error Handling with Try/Except', notes: 'Learn how to handle potential errors in your code gracefully using `try` and `except` blocks to prevent crashes.', challenge: { title: 'Safe Division Calculator', description: 'Create a calculator that asks for two numbers and divides them. Use a `try/except` block to handle the case where the user tries to divide by zero.' } },
      { day: 25, module: 'Intermediate Python', topic: 'Introduction to Object-Oriented Programming (OOP)', videoUrl: 'https://www.youtube.com/embed/Jezng5SSaP0', notes: 'Understand the basic concepts of OOP: classes and objects.', challenge: { title: 'Create a `Dog` Class', description: 'Create a simple `Dog` class with attributes for `name` and `breed`. Create two different dog objects from this class.' } },
      { day: 26, module: 'Intermediate Python', topic: 'Classes: Methods', notes: 'Learn how to define methods (functions inside a class) that define an object\'s behavior.', challenge: { title: 'Add a `bark` Method', description: 'Add a `bark` method to your `Dog` class that prints "Woof!". Call this method on your dog objects.' } },
      { day: 27, module: 'Intermediate Python', topic: 'Classes: The __init__ Method', notes: 'Learn about the `__init__` constructor method to initialize an object\'s attributes when it is created.', challenge: { title: 'Refactor the `Dog` Class', description: 'Modify your `Dog` class to use an `__init__` method to set the name and breed when a new dog object is created.' } },
      { day: 28, module: 'Intermediate Python', topic: 'Classes: Inheritance', notes: 'Learn how to create a new class that inherits attributes and methods from an existing class.', challenge: { title: 'Create a `Cat` Class', description: 'Create an `Animal` parent class, and then have your `Dog` class and a new `Cat` class inherit from it.' } },
      { day: 29, module: 'Project', topic: 'Contact Book Application', notes: 'Build a complete application using OOP.', challenge: { title: 'Build the Contact Book', description: 'Create a `Contact` class and a `ContactBook` class. The application should allow you to add new contacts, view all contacts, and search for a contact by name.' } },
      { day: 30, module: 'Final Project', topic: 'Putting It All Together', notes: 'Review all concepts and build a final project of your choice.', challenge: { title: 'Build a Final Project', description: 'Choose a project that interests you. Ideas: a more advanced text-based game, a simple weather app using an API, or a tool to organize files on your computer. Plan, build, and test your application.' } },
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
        { day: 1, module: 'Foundations of AI', topic: 'What is Artificial Intelligence?', notes: 'A broad introduction to AI, its history, goals, and various subfields like Machine Learning, NLP, and Computer Vision.', challenge: { title: 'Identify AI in Daily Life', description: 'List five examples of AI you interact with in your daily life and briefly explain their function.' } },
        { day: 2, module: 'Foundations of AI', topic: 'Types of AI', notes: 'Learn the differences between Narrow AI (ANI), General AI (AGI), and Superintelligent AI (ASI). Understand the concepts of reactive machines, limited memory, theory of mind, and self-awareness.', challenge: { title: 'Classify AI Examples', description: 'For the five examples from yesterday, classify each as a type of Narrow AI.' } },
        { day: 3, module: 'Foundations of AI', topic: 'Setting Up Your Python Environment for AI', notes: 'Install key libraries for AI development: NumPy for numerical operations, Pandas for data manipulation, and Matplotlib for plotting.', challenge: { title: 'Install and Verify Libraries', description: 'Install NumPy, Pandas, and Matplotlib. Write a script to import each library and print its version number to confirm installation.' } },
        { day: 4, module: 'Foundations of AI', topic: 'Introduction to NumPy', notes: 'Learn the basics of NumPy, the fundamental package for numerical computing in Python. Focus on creating arrays and performing basic mathematical operations.', challenge: { title: 'Create and Manipulate NumPy Arrays', description: 'Create a 1D NumPy array of numbers from 1 to 10. Calculate and print the mean and standard deviation.' } },
        { day: 5, module: 'Foundations of AI', topic: 'Introduction to Pandas', notes: 'Explore Pandas Series and DataFrames. Learn how to create a DataFrame from a dictionary and perform basic data inspection with `.head()` and `.describe()`.', challenge: { title: 'Create a Student DataFrame', description: 'Create a Pandas DataFrame to store information about three students (name, age, grade). Display the first two rows.' } },
        { day: 6, module: 'Foundations of AI', topic: 'Core Concepts in Machine Learning', notes: 'Differentiate between supervised, unsupervised, and reinforcement learning. Understand the concepts of features, labels, training, and testing.', challenge: { title: 'Categorize ML Problems', description: 'For each scenario (e.g., predicting house prices, grouping customers, a bot playing chess), identify if it is supervised, unsupervised, or reinforcement learning.' } },
        { day: 7, module: 'Foundations of AI', topic: 'The Machine Learning Workflow', notes: 'Outline the typical steps in an ML project: data collection, data preparation, model selection, model training, evaluation, and deployment.', challenge: { title: 'Outline a Project Plan', description: 'Choose a simple problem (e.g., spam detection) and write a one-page outline of the steps you would take to build an ML model for it.' } },
        { day: 8, module: 'Supervised Learning', topic: 'Linear Regression', notes: 'Understand the theory behind linear regression for predicting continuous values. Learn about the line of best fit, slope, and intercept.', challenge: { title: 'Manually Calculate a Prediction', description: 'Given a simple linear regression equation (e.g., y = 2x + 3) and an input value for x, calculate the predicted y value.' } },
        { day: 9, module: 'Supervised Learning', topic: 'Implementing Linear Regression with Scikit-learn', notes: 'Use the Scikit-learn library to train a simple linear regression model on a sample dataset.', challenge: { title: 'Train Your First Model', description: 'Using a small, sample dataset (e.g., years of experience vs. salary), train a linear regression model and use it to predict the salary for a given number of years of experience.' } },
        { day: 10, module: 'Supervised Learning', topic: 'Classification vs. Regression', notes: 'Clearly define the difference between regression (predicting a number) and classification (predicting a category).', challenge: { title: 'Classify Problems', description: 'Categorize a list of problems (e.g., predicting temperature, identifying a cat in a photo, predicting stock price, diagnosing a disease) as either regression or classification tasks.' } },
        { day: 11, module: 'Supervised Learning', topic: 'Logistic Regression', notes: 'Learn about logistic regression, a fundamental algorithm for binary classification problems.', challenge: { title: 'Implement Logistic Regression', description: 'Train a logistic regression model on a simple dataset (e.g., tumor size vs. malignancy) and interpret the output probabilities.' } },
        { day: 12, module: 'Supervised Learning', topic: 'Decision Trees', notes: 'Understand the intuitive, flowchart-like structure of decision trees for classification.', challenge: { title: 'Sketch a Decision Tree', description: 'On paper, draw a simple decision tree to decide whether to play tennis based on weather conditions (outlook, humidity, wind).' } },
        { day: 13, module: 'Supervised Learning', topic: 'Model Evaluation Metrics', notes: 'Learn how to evaluate your models. For classification, understand accuracy, precision, and recall. For regression, understand Mean Absolute Error (MAE) and R-squared.', challenge: { title: 'Calculate Accuracy', description: 'Given a list of true labels and a list of predicted labels, write a Python function to calculate the accuracy of the predictions.' } },
        { day: 14, module: 'Supervised Learning', topic: 'Overfitting and Underfitting', notes: 'Understand the crucial concepts of overfitting (model is too complex and memorizes training data) and underfitting (model is too simple to capture patterns).', challenge: { title: 'Identify Overfitting', description: 'Describe a scenario where a model has 100% accuracy on training data but performs poorly on new data. Explain why this is happening.' } },
        { day: 15, module: 'Supervised Learning', topic: 'Project: Titanic Survival Prediction', notes: 'Apply your classification skills to a real dataset. You will clean the data, train a decision tree model, and predict passenger survival on the Titanic.', challenge: { title: 'Build the Titanic Predictor', description: 'Download the Titanic dataset from Kaggle. Load it into a Pandas DataFrame, select relevant features, and train a classification model to predict the "Survived" column.' } },
        { day: 16, module: 'Unsupervised Learning', topic: 'Introduction to Unsupervised Learning', notes: 'Learn about the goal of unsupervised learning: to find hidden patterns and structures in unlabeled data.', challenge: { title: 'Brainstorm Unsupervised Problems', description: 'List three real-world problems that could be solved using unsupervised learning (e.g., grouping customers, identifying anomalous transactions).' } },
        { day: 17, module: 'Unsupervised Learning', topic: 'Clustering with K-Means', notes: 'Understand the K-Means algorithm, one of the most popular clustering methods, for grouping data points into a predefined number (K) of clusters.', challenge: { title: 'Implement K-Means', description: 'Use Scikit-learn to apply K-Means clustering to a simple, 2D dataset and visualize the resulting clusters with Matplotlib.' } },
        { day: 18, module: 'Unsupervised Learning', topic: 'Dimensionality Reduction', notes: 'Learn about the importance of dimensionality reduction for visualizing high-dimensional data and improving model performance.', challenge: { title: 'Explain the "Curse of Dimensionality"', description: 'In your own words, explain why having too many features (dimensions) can be a problem for machine learning models.' } },
        { day: 19, module: 'Unsupervised Learning', topic: 'Principal Component Analysis (PCA)', notes: 'Explore PCA, a common technique for reducing the number of variables in a dataset while retaining most of the important information.', challenge: { title: 'Apply PCA', description: 'Apply PCA to a dataset with many features (like the Iris dataset) to reduce it to two principal components, then plot the results.' } },
        { day: 20, module: 'Project', topic: 'Customer Segmentation', notes: 'Use your unsupervised learning skills to group customers based on their purchasing behavior.', challenge: { title: 'Perform Customer Segmentation', description: 'Using a sample customer dataset (e.g., with features like annual income and spending score), apply K-Means clustering to identify different customer segments.' } },
        { day: 21, module: 'Deep Learning', topic: 'Introduction to Neural Networks', notes: 'Discover the building blocks of deep learning. Understand the concept of neurons, layers (input, hidden, output), weights, and biases.', challenge: { title: 'Draw a Simple Neural Network', description: 'Draw a diagram of a simple neural network with 2 input neurons, one hidden layer of 3 neurons, and 1 output neuron.' } },
        { day: 22, module: 'Deep Learning', topic: 'Activation Functions', notes: 'Learn why activation functions (like Sigmoid, ReLU) are crucial for introducing non-linearity, allowing neural networks to learn complex patterns.', challenge: { title: 'Compare Activation Functions', description: 'Research and write a short paragraph comparing the Sigmoid and ReLU activation functions, noting a key advantage of ReLU.' } },
        { day: 23, module: 'Deep Learning', topic: 'How Neural Networks Learn', notes: 'A high-level overview of the learning process: forward propagation, calculating loss (error), and backpropagation to update weights.', challenge: { title: 'Explain Backpropagation', description: 'In simple terms, explain the purpose of the backpropagation algorithm in training a neural network.' } },
        { day: 24, module: 'Deep Learning', topic: 'Introduction to TensorFlow and Keras', notes: 'Learn about TensorFlow, a leading deep learning framework, and Keras, its user-friendly API for building and training models.', challenge: { title: 'Install TensorFlow', description: 'Install the TensorFlow library using pip. Write a script to import it and print the version number.' } },
        { day: 25, module: 'Deep Learning', topic: 'Building a Sequential Model in Keras', notes: 'Learn how to build a simple neural network layer by layer using the Keras Sequential API.', challenge: { title: 'Build a Simple Classifier', description: 'Use Keras to build a sequential model for a simple classification task (e.g., on the Iris dataset). Define the input, hidden, and output layers.' } },
        { day: 26, module: 'Deep Learning', topic: 'Compiling and Training a Model', notes: 'Understand the key steps of compiling a Keras model (choosing an optimizer and loss function) and training it with the `.fit()` method.', challenge: { title: 'Train Your Keras Model', description: 'Compile and train the model you built yesterday on the training data. Observe the training process over several epochs.' } },
        { day: 27, module: 'AI Fields & Ethics', topic: 'Natural Language Processing (NLP)', notes: 'An overview of NLP, the field of AI focused on enabling computers to understand and process human language. Discuss applications like sentiment analysis and machine translation.', challenge: { title: 'Use a Pre-trained NLP Model', description: 'Use a library like `transformers` to perform a simple sentiment analysis on a few sentences.' } },
        { day: 28, module: 'AI Fields & Ethics', topic: 'Computer Vision', notes: 'An overview of Computer Vision, the field of AI that enables computers to "see" and interpret visual information from the world. Discuss applications like image classification and object detection.', challenge: { title: 'Describe a CV Application', description: 'Choose a computer vision application (e.g., self-driving car cameras) and write a paragraph explaining the tasks it needs to perform.' } },
        { day: 29, module: 'AI Fields & Ethics', topic: 'AI Ethics and Bias', notes: 'A crucial discussion on the ethical implications of AI, including bias in data, algorithmic fairness, transparency, and the societal impact of AI technologies.', challenge: { title: 'Identify Potential Bias', description: 'Describe how an AI model trained to screen job applications could become biased and what the consequences might be.' } },
        { day: 30, module: 'Final Project', topic: 'Image Classification Project', notes: 'Combine your deep learning knowledge to build a complete project.', challenge: { title: 'Build a Fashion MNIST Classifier', description: 'Use the Fashion MNIST dataset (a collection of clothing images) included with Keras. Build, train, and evaluate a neural network to classify the images into 10 categories.' } },
    ],
  },
  // 4. Cyber Security
  {
    id: 'cyber-security',
    title: 'Cyber Security',
    description: 'Learn the principles of digital defense, from identifying threats to securing networks and ethical hacking.',
    icon: 'SecurityIcon',
    badge: 'SecurityBadge',
    imageUrl: 'https://picsum.photos/seed/cyber/600/400',
    quiz: [
        { question: "What does the CIA Triad stand for?", options: ["Confidentiality, Integrity, Availability", "Central Intelligence Agency", "Cyber, Information, Assurance", "Control, Integrity, Access"], correctAnswer: "Confidentiality, Integrity, Availability" },
        { question: "Which of the following is a common social engineering attack?", options: ["DDoS", "SQL Injection", "Phishing", "Cross-Site Scripting"], correctAnswer: "Phishing" },
        { question: "What is the main purpose of a firewall?", options: ["To encrypt data", "To monitor and filter network traffic", "To detect malware", "To back up data"], correctAnswer: "To monitor and filter network traffic" }
    ],
    structure: [
        { day: 1, module: 'Foundations', topic: 'Introduction to Cybersecurity', notes: 'What is cybersecurity? Why is it important? Overview of the threat landscape and career paths.', challenge: { title: 'Analyze a Recent Breach', description: 'Research a major cybersecurity breach from the last year. Write a short summary of what happened and what the impact was.' } },
        { day: 2, module: 'Foundations', topic: 'The CIA Triad', notes: 'Learn the three core principles of information security: Confidentiality, Integrity, and Availability.', challenge: { title: 'Apply the CIA Triad', description: 'For each principle of the CIA Triad, provide a real-world example of a security measure that upholds it (e.g., encryption for confidentiality).' } },
        { day: 3, module: 'Foundations', topic: 'Common Threats and Attacks', notes: 'An overview of common attack vectors: malware (viruses, worms, ransomware), phishing, denial-of-service (DoS), and social engineering.', challenge: { title: 'Deconstruct a Phishing Email', description: 'Find an example of a phishing email online. List at least three red flags that indicate it is a phishing attempt.' } },
        { day: 4, module: 'Foundations', topic: 'Security Policies and Procedures', notes: 'Understand the importance of security policies, acceptable use policies (AUP), and incident response plans in an organization.', challenge: { title: 'Draft a Simple Policy', description: 'Write a short, simple password policy for a small company, including requirements for length, complexity, and expiration.' } },
        { day: 5, module: 'Foundations', topic: 'Authentication and Authorization', notes: 'Learn the difference between authentication (who you are) and authorization (what you can do). Cover password security and multi-factor authentication (MFA).', challenge: { title: 'Set Up MFA', description: 'Enable multi-factor authentication on a personal online account (e.g., email, social media) and describe the process.' } },
        { day: 6, module: 'Networking Fundamentals', topic: 'The TCP/IP Model', notes: 'A high-level overview of the layers of the TCP/IP model (Application, Transport, Internet, Link) and their functions.', challenge: { title: 'Trace a Packet', description: 'Conceptually, describe the journey a piece of data takes from your web browser to a web server and back, mentioning each layer of the TCP/IP model.' } },
        { day: 7, module: 'Networking Fundamentals', topic: 'IP Addresses and Subnetting', notes: 'Understand IPv4 addressing, public vs. private IPs, and the basics of subnetting to divide networks.', challenge: { title: 'Identify Your IP', description: 'Find your computer\'s local IP address and the public IP address of your network. Explain the difference.' } },
        { day: 8, module: 'Networking Security', topic: 'Firewalls', notes: 'Learn how firewalls work to filter network traffic based on a set of rules. Discuss different types like packet-filtering and stateful firewalls.', challenge: { title: 'Configure a Firewall Rule', description: 'Describe a firewall rule (source IP, destination IP, port, action) that would block a specific computer from accessing a web server.' } },
        { day: 9, module: 'Networking Security', topic: 'Virtual Private Networks (VPNs)', notes: 'Understand how VPNs create a secure, encrypted tunnel over a public network to protect data in transit.', challenge: { title: 'Explain VPN Use Cases', description: 'List and explain three situations where using a VPN would be beneficial for security and privacy.' } },
        { day: 10, module: 'Networking Security', topic: 'Intrusion Detection & Prevention Systems (IDS/IPS)', notes: 'Learn the difference between IDS (detects and alerts) and IPS (detects and actively blocks) for identifying malicious network activity.', challenge: { title: 'IDS vs. IPS Scenario', description: 'Given a scenario of a network attack, describe how an IDS would respond versus how an IPS would respond.' } },
        { day: 11, module: 'Cryptography', topic: 'Introduction to Cryptography', notes: 'Understand the basics of cryptography, including encryption, decryption, keys, and the difference between plaintext and ciphertext.', challenge: { title: 'Use a Caesar Cipher', description: 'Manually encrypt a short message using a Caesar cipher with a shift of 3. Then, decrypt a message that was encrypted with the same cipher.' } },
        { day: 12, module: 'Cryptography', topic: 'Symmetric vs. Asymmetric Encryption', notes: 'Learn the difference between symmetric (one shared key) and asymmetric (public/private key pair) encryption and their use cases.', challenge: { title: 'Choose the Right Encryption', description: 'For two scenarios (1. sending an encrypted email to a friend, 2. encrypting your own hard drive), explain whether symmetric or asymmetric encryption is more appropriate and why.' } },
        { day: 13, module: 'Cryptography', topic: 'Hashing', notes: 'Understand how hashing algorithms create a unique, fixed-size fingerprint of data. Learn its use in verifying data integrity and storing passwords.', challenge: { title: 'Generate a Hash', description: 'Use an online tool to generate an SHA-256 hash for your name. Change one letter in your name and generate the hash again. Observe the difference.' } },
        { day: 14, module: 'Cryptography', topic: 'Digital Signatures and Certificates', notes: 'Learn how digital signatures use asymmetric cryptography to provide authenticity, non-repudiation, and integrity. Understand the role of SSL/TLS certificates.', challenge: { title: 'Inspect a Website\'s Certificate', description: 'Go to your favorite HTTPS-enabled website. Click the padlock icon in the address bar and inspect the certificate details. Find out who issued the certificate and when it expires.' } },
        { day: 15, module: 'Web Application Security', topic: 'Introduction to Web Security', notes: 'Understand common web application vulnerabilities and the importance of secure coding practices.', challenge: { title: 'Map a Web Application', description: 'Choose a simple website and list its main components (e.g., login page, user profile, search bar) that could be potential targets for an attacker.' } },
        { day: 16, module: 'Web Application Security', topic: 'The OWASP Top 10', notes: 'An introduction to the OWASP Top 10, a standard awareness document for the most critical web application security risks.', challenge: { title: 'Research an OWASP Category', description: 'Pick one category from the OWASP Top 10 (e.g., Injection) and write a short paragraph explaining what it is in simple terms.' } },
        { day: 17, module: 'Web Application Security', topic: 'Cross-Site Scripting (XSS)', notes: 'Learn how XSS attacks inject malicious scripts into trusted websites, and the difference between stored and reflected XSS.', challenge: { title: 'Identify a Potential XSS Flaw', description: 'Describe how a website\'s search functionality could be vulnerable to a reflected XSS attack.' } },
        { day: 18, module: 'Web Application Security', topic: 'SQL Injection (SQLi)', notes: 'Understand how attackers can manipulate a website\'s database queries to extract or modify data through SQL injection vulnerabilities.', challenge: { title: 'Craft a Simple SQLi Payload', description: `Given a login query \`SELECT * FROM users WHERE username='admin' AND password='USER_INPUT'\`, what could you enter as a password to bypass authentication?` } },
        { day: 19, module: 'Web Application Security', topic: 'Secure Coding Practices', notes: 'Learn fundamental principles for writing more secure code, such as input validation, output encoding, and the principle of least privilege.', challenge: { title: 'Write a Validation Function', description: 'In pseudocode or your preferred language, write a simple function that checks if a user-provided password is at least 8 characters long.' } },
        { day: 20, module: 'Project', topic: 'Vulnerability Assessment', notes: 'Learn to use tools to scan for vulnerabilities.', challenge: { title: 'Use an Online Scanner', description: 'Use a free online tool (like Pentest-Tools.com\'s Website Vulnerability Scanner) to scan a personal or test website and review the report for any discovered issues.' } },
        { day: 21, module: 'Ethical Hacking', topic: 'Introduction to Ethical Hacking', notes: 'Define ethical hacking and penetration testing. Understand the phases: reconnaissance, scanning, gaining access, maintaining access, and covering tracks.', challenge: { title: 'Hacker Hats', description: 'Define and differentiate between White Hat, Black Hat, and Grey Hat hackers.' } },
        { day: 22, module: 'Ethical Hacking', topic: 'Reconnaissance', notes: 'Learn about passive and active reconnaissance for gathering information about a target. Introduce tools like `whois` and `nslookup`.', challenge: { title: 'Perform a WHOIS Lookup', description: 'Use a WHOIS lookup tool online to find information about a well-known domain like `google.com`.' } },
        { day: 23, module: 'Ethical Hacking', topic: 'Scanning with Nmap', notes: 'Learn the basics of using Nmap, a powerful tool for network discovery and security auditing, to find open ports and running services.', challenge: { title: 'Run a Basic Nmap Scan', description: 'Install Nmap (or use an online version) and run a basic scan against a test host (`scanme.nmap.org`). Analyze the results to see which ports are open.' } },
        { day: 24, module: 'Ethical Hacking', topic: 'Introduction to Metasploit', notes: 'A high-level overview of the Metasploit Framework, a popular penetration testing tool used to develop and execute exploit code against a remote target.', challenge: { title: 'Research a Metasploit Module', description: 'Search for a Metasploit module for a well-known vulnerability (e.g., EternalBlue). Describe what the module does.' } },
        { day: 25, module: 'Security Operations', topic: 'Security Operations Center (SOC)', notes: 'Understand the role of a SOC in monitoring, detecting, analyzing, and responding to cybersecurity incidents.', challenge: { title: 'Design a SOC Team', description: 'List three key roles you would want in a small Security Operations Center team and briefly describe their responsibilities.' } },
        { day: 26, module: 'Security Operations', topic: 'Security Information and Event Management (SIEM)', notes: 'Learn how SIEM tools collect, correlate, and analyze log data from various sources to provide real-time analysis of security alerts.', challenge: { title: 'Write a Correlation Rule', description: 'In plain English, write a SIEM correlation rule to detect a potential brute-force attack (e.g., "Alert if there are more than 5 failed login attempts for the same user within 1 minute").' } },
        { day: 27, module: 'Security Operations', topic: 'Incident Response', notes: 'Learn the phases of incident response: preparation, identification, containment, eradication, recovery, and lessons learned.', challenge: { title: 'Contain a Breach', description: 'Imagine a company server has been infected with ransomware. What would be your immediate first step for the "Containment" phase? Explain your reasoning.' } },
        { day: 28, module: 'Security Operations', topic: 'Digital Forensics', notes: 'A brief introduction to digital forensics, the process of recovering and investigating material found in digital devices, often in relation to cybercrime.', challenge: { title: 'Preserve Evidence', description: 'Why is it important to create a forensic image (a bit-for-bit copy) of a hard drive before beginning an investigation, rather than working on the original drive?' } },
        { day: 29, module: 'Career & Future Trends', topic: 'Careers in Cybersecurity', notes: 'Explore various career paths in cybersecurity, such as Security Analyst, Penetration Tester, Security Engineer, and SOC Analyst. Discuss required certifications.', challenge: { title: 'Choose a Career Path', description: 'Research one cybersecurity career path that interests you. List two key responsibilities and one common certification for that role.' } },
        { day: 30, module: 'Final Project', topic: 'Capture The Flag (CTF)', notes: 'CTFs are competitions designed to challenge participants to solve a variety of cybersecurity problems.', challenge: { title: 'Complete a Beginner CTF', description: 'Participate in a beginner-friendly online CTF challenge (e.g., from platforms like PicoCTF or OverTheWire). Try to solve at least one or two challenges and document your process.' } },
    ],
  },
  // 5. Data Analysis
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    description: 'Learn to collect, clean, analyze, and visualize data using Python to uncover insights and tell compelling stories.',
    icon: 'DataIcon',
    badge: 'DataBadge',
    imageUrl: 'https://picsum.photos/seed/data/600/400',
    quiz: [
        { question: "Which Python library is most commonly used for data manipulation and creating DataFrames?", options: ["NumPy", "Matplotlib", "Pandas", "TensorFlow"], correctAnswer: "Pandas" },
        { question: "What is the primary goal of Exploratory Data Analysis (EDA)?", options: ["To build a predictive model", "To summarize the main characteristics of a dataset", "To deploy a model to production", "To collect data"], correctAnswer: "To summarize the main characteristics of a dataset" },
        { question: "A bar chart is best used for which type of data?", options: ["Comparing values across categories", "Showing a trend over time", "Showing the distribution of a single variable", "Showing the relationship between two continuous variables"], correctAnswer: "Comparing values across categories" }
    ],
    structure: [
        { day: 1, module: 'Foundations', topic: 'What is Data Analysis?', notes: 'An introduction to the field of data analysis, the data lifecycle (collection, cleaning, analysis, visualization), and its importance in business.', challenge: { title: 'Find Data in Your Life', description: 'Identify three examples of data that are generated about you or by you daily (e.g., screen time, purchase history, fitness tracker data).' } },
        { day: 2, module: 'Foundations', topic: 'The Data Analyst Toolkit', notes: 'Overview of common tools used by data analysts, with a focus on Python and its key libraries: Pandas, NumPy, Matplotlib, and Seaborn.', challenge: { title: 'Set Up Your Environment', description: 'Install Python and the necessary libraries (Pandas, NumPy, Matplotlib, Seaborn) using pip. Import them in a script and print their versions.' } },
        { day: 3, module: 'Foundations', topic: 'Introduction to Jupyter Notebooks', notes: 'Learn how to use Jupyter Notebooks, an interactive environment perfect for data analysis, allowing you to mix code, text, and visualizations.', challenge: { title: 'Create Your First Notebook', description: 'Create a new Jupyter Notebook. In the first cell, use Markdown to write a title. In the second cell, write Python code to print "Hello, Data Analysis!".' } },
        { day: 4, module: 'Foundations', topic: 'Pandas: Series and DataFrames', notes: 'Dive into Pandas, the most important library for data analysis in Python. Learn about the two main data structures: the 1D Series and the 2D DataFrame.', challenge: { title: 'Create a DataFrame', description: 'Create a Pandas DataFrame from a Python dictionary to store data about three countries (name, population, continent).' } },
        { day: 5, module: 'Foundations', topic: 'Loading and Inspecting Data', notes: 'Learn how to load data from a CSV file into a Pandas DataFrame. Use essential functions like `.head()`, `.tail()`, `.info()`, and `.describe()` to inspect the data.', challenge: { title: 'Load a Real Dataset', description: 'Find a simple CSV dataset online (e.g., from Kaggle or data.gov), load it into a DataFrame, and use inspection functions to find the number of rows/columns and view the first 10 entries.' } },
        { day: 6, module: 'Data Cleaning', topic: 'Handling Missing Values', notes: 'Data is rarely clean. Learn techniques for dealing with missing data, such as identifying null values with `.isnull()`, dropping them with `.dropna()`, or filling them with `.fillna()`.', challenge: { title: 'Clean Missing Data', description: 'Create a small DataFrame with some missing values. Practice using `.dropna()` to remove rows with nulls and `.fillna()` to replace nulls with a specific value (like the mean).' } },
        { day: 7, module: 'Data Cleaning', topic: 'Data Types and Conversions', notes: 'Understand the importance of correct data types (e.g., numbers, strings, dates). Learn how to check data types with `.dtypes` and convert them using `.astype()`.', challenge: { title: 'Fix Data Types', description: 'Create a DataFrame where a numerical column is incorrectly stored as a string (e.g., \'100\'). Convert this column to an integer type.' } },
        { day: 8, module: 'Data Cleaning', topic: 'Removing Duplicates', notes: 'Learn how to find and remove duplicate rows from your dataset using the `.duplicated()` and `.drop_duplicates()` methods.', challenge: { title: 'Deduplicate a List', description: 'Create a DataFrame with several duplicate rows. Use Pandas to identify and remove them, showing the cleaned DataFrame.' } },
        { day: 9, module: 'Data Cleaning', topic: 'String Manipulation in Pandas', notes: 'Learn how to clean and format text data using the `.str` accessor in Pandas, including methods like `.lower()`, `.strip()`, and `.replace()`.', challenge: { title: 'Clean a Text Column', description: 'Create a DataFrame with a column of messy strings (e.g., with extra whitespace and inconsistent capitalization). Clean the column so all text is lowercase and has no leading/trailing spaces.' } },
        { day: 10, module: 'Project', topic: 'Data Cleaning Project', notes: 'Apply all your data cleaning skills to a messy, real-world dataset.', challenge: { title: 'Clean a Dataset', description: 'Find a dataset that needs cleaning. Load it and perform at least three cleaning operations: handle missing values, correct data types, and remove duplicates. Document your steps.' } },
        { day: 11, module: 'Data Analysis & EDA', topic: 'Selecting and Filtering Data', notes: 'Master the techniques for selecting specific data from a DataFrame, including selecting columns, and filtering rows based on conditions using boolean indexing.', challenge: { title: 'Filter a Dataset', description: 'Using a dataset of your choice, select a specific column and then filter the rows to show only the entries that meet a certain condition (e.g., sales greater than 1000).' } },
        { day: 12, module: 'Data Analysis & EDA', topic: 'Sorting and Grouping Data', notes: 'Learn how to sort data with `.sort_values()` and how to perform group-by operations with `.groupby()` to aggregate data (e.g., finding the average sales per region).', challenge: { title: 'Analyze Sales Data', description: 'Create a sample sales DataFrame with columns for "Region", "Product", and "Sales". Group the data by "Region" and calculate the total sales for each region.' } },
        { day: 13, module: 'Data Analysis & EDA', topic: 'Creating New Columns', notes: 'Learn how to create new columns in your DataFrame, often based on calculations from existing columns.', challenge: { title: 'Calculate Profit', description: 'Create a DataFrame with "Revenue" and "Cost" columns. Create a new "Profit" column by subtracting the cost from the revenue.' } },
        { day: 14, module: 'Data Analysis & EDA', topic: 'Merging and Joining DataFrames', notes: 'Learn how to combine multiple DataFrames into one using functions like `pd.merge()` and `pd.concat()`, similar to SQL joins.', challenge: { title: 'Combine Two Datasets', description: 'Create two simple DataFrames (e.g., one with customer IDs and names, another with customer IDs and orders). Merge them into a single DataFrame based on the customer ID.' } },
        { day: 15, module: 'Project', topic: 'Exploratory Data Analysis (EDA)', notes: 'Combine all your data manipulation skills to explore a dataset and uncover initial insights.', challenge: { title: 'Perform an EDA', description: 'Choose a dataset (e.g., a movie dataset) and perform an EDA. Answer at least three questions about the data using filtering, grouping, and sorting (e.g., "Which director made the most movies?", "What is the average movie rating?").' } },
        { day: 16, module: 'Data Visualization', topic: 'Introduction to Data Visualization', notes: 'Understand why data visualization is a powerful tool for communication and analysis. Learn about the basic principles of effective plots.', challenge: { title: 'Critique a Chart', description: 'Find an example of a data visualization online (a good one or a bad one). Write a short paragraph explaining what makes it effective or ineffective.' } },
        { day: 17, module: 'Data Visualization', topic: 'Plotting with Matplotlib', notes: 'Learn the fundamentals of Matplotlib, the foundational plotting library in Python. Create basic plots like line charts and scatter plots.', challenge: { title: 'Create a Simple Line Chart', description: 'Create two lists of numbers representing X and Y coordinates. Use Matplotlib to create a line chart, adding labels for the axes and a title.' } },
        { day: 18, module: 'Data Visualization', topic: 'Introduction to Seaborn', notes: 'Learn about Seaborn, a high-level library built on top of Matplotlib that makes creating beautiful and informative statistical graphics easy.', challenge: { title: 'Matplotlib vs. Seaborn', description: 'Recreate the line chart from yesterday using Seaborn. Note the differences in code and the default appearance.' } },
        { day: 19, module: 'Data Visualization', topic: 'Common Chart Types: Part 1', notes: 'Learn when and how to use fundamental chart types: bar charts (for categorical comparisons), histograms (for distributions), and pie charts (for proportions).', challenge: { title: 'Visualize Categorical Data', description: 'Create a simple DataFrame of student counts in different houses (e.g., Gryffindor: 15, Slytherin: 12). Create a bar chart to visualize this data.' } },
        { day: 20, module: 'Data Visualization', topic: 'Common Chart Types: Part 2', notes: 'Learn when and how to use more advanced charts: scatter plots (for relationships between two variables) and box plots (for distributions and outliers).', challenge: { title: 'Explore a Relationship', description: 'Create a DataFrame with two related numerical columns (e.g., hours studied vs. exam score). Use a scatter plot to visualize the relationship.' } },
        { day: 21, module: 'Data Visualization', topic: 'Customizing Plots', notes: 'Learn how to customize your plots by changing colors, styles, adding annotations, and creating subplots to make your visualizations more effective.', challenge: { title: 'Improve a Plot', description: 'Take a plot you made earlier and customize it. Change the color palette, add a descriptive title, and make the axis labels clearer.' } },
        { day: 22, module: 'Project', topic: 'Data Visualization Project', notes: 'Use your visualization skills to create a small dashboard of plots that tell a story about a dataset.', challenge: { title: 'Create a Visualization Dashboard', description: 'Choose a dataset and create a Jupyter Notebook that contains at least three different types of charts, each answering a specific question about the data. Use Markdown to explain your findings for each chart.' } },
        { day: 23, module: 'Statistics Fundamentals', topic: 'Descriptive Statistics', notes: 'Learn about key measures of descriptive statistics: mean, median, mode (measures of central tendency), and standard deviation, variance (measures of spread).', challenge: { title: 'Calculate Statistics', description: 'Given a list of numbers, manually calculate the mean, median, and mode. Then, verify your answers using Pandas or NumPy.' } },
        { day: 24, module: 'Statistics Fundamentals', topic: 'Correlation', notes: 'Understand correlation as a measure of the relationship between two variables. Learn the difference between positive, negative, and no correlation, and how to calculate a correlation matrix in Pandas.', challenge: { title: 'Find Correlations', description: 'Using a dataset with multiple numerical columns, calculate the correlation matrix and identify the two most strongly correlated variables.' } },
        { day: 25, module: 'Statistics Fundamentals', topic: 'Introduction to Probability', notes: 'A high-level introduction to the basic concepts of probability, including events, outcomes, and the probability scale (0 to 1).', challenge: { title: 'Coin Flip Probability', description: 'What is the probability of getting heads twice in a row when flipping a fair coin? Explain your reasoning.' } },
        { day: 26, module: 'Statistics Fundamentals', topic: 'Introduction to Hypothesis Testing', notes: 'A conceptual overview of hypothesis testing, including the null hypothesis, alternative hypothesis, and the concept of a p-value.', challenge: { title: 'Formulate a Hypothesis', description: 'You want to test if a new website design increases user sign-ups. What would be your null hypothesis and your alternative hypothesis?' } },
        { day: 27, module: 'Advanced Topics', topic: 'Working with Time Series Data', notes: 'An introduction to the specifics of working with time series data in Pandas, including using a DatetimeIndex and resampling.', challenge: { title: 'Analyze Stock Prices', description: 'Find and download daily stock price data for a company. Load it into Pandas, set the date as the index, and plot the closing price over time.' } },
        { day: 28, module: 'Advanced Topics', topic: 'Introduction to Web Scraping', notes: 'Learn the basics of web scraping with Python libraries like `requests` and `BeautifulSoup` to extract data from websites.', challenge: { title: 'Scrape Website Headlines', description: 'Write a script to scrape the main headlines from a news website\'s homepage and print them to the console.' } },
        { day: 29, module: 'Storytelling & Communication', topic: 'Communicating Your Findings', notes: 'Learn the importance of data storytelling. It\'s not just about the numbers, but the narrative you build around them to persuade and inform your audience.', challenge: { title: 'Write a Data Story', description: 'Based on one of your previous projects, write a short, one-paragraph summary of your key findings as if you were presenting it to a non-technical manager.' } },
        { day: 30, module: 'Final Project', topic: 'Putting It All Together', notes: 'Choose a dataset and perform a complete data analysis from start to finish.', challenge: { title: 'Complete a Full Data Analysis', description: 'Select a dataset that interests you from a platform like Kaggle. Go through the entire data analysis process: ask questions, clean the data, perform EDA, create visualizations, and write a summary of your key insights in a Jupyter Notebook.' } },
    ],
  },
];
