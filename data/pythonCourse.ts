import type { CourseSection } from '../types';

export const pythonCourseData: CourseSection[] = [
  {
    id: 'section-1',
    title: 'Introduction to Python',
    duration: '45 Mins',
    youtubeId: 'kqtD5dpn9C8', // Python for Beginners - Full Course
    description: 'Start your journey with the basics of Python. This section covers fundamental concepts like variables, data types, and basic operators. You will also write your very first Python program.',
    practice: {
      code: 'name = "Alice"\nprint(f"Hello, {name}!")',
      output: 'Hello, Alice!'
    },
    quiz: [
      {
        question: 'What is the correct way to declare a variable in Python?',
        options: ['let x = 5', 'var x = 5', 'x = 5', 'const x = 5'],
        correctAnswerIndex: 2,
        explanation: 'Python uses simple assignment (x = 5) to declare variables. The type is inferred automatically.'
      },
      {
        question: 'Which of the following is an immutable data type in Python?',
        options: ['List', 'Dictionary', 'Set', 'Tuple'],
        correctAnswerIndex: 3,
        explanation: 'Tuples are immutable, meaning their contents cannot be changed after creation. Lists, Dictionaries, and Sets are mutable.'
      }
    ]
  },
  {
    id: 'section-2',
    title: 'Python Data Structures',
    duration: '1 Hour',
    youtubeId: 'R-HLU9A50aA', // Python Data Structures
    description: 'Dive into the core data structures that Python offers: Lists, Tuples, Dictionaries, and Sets. Understand their differences, use-cases, and common methods.',
    practice: {
      code: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[1])',
      output: 'banana'
    },
    quiz: [
      {
        question: 'Which method is used to add an element to the end of a list?',
        options: ['.add()', '.push()', '.insert()', '.append()'],
        correctAnswerIndex: 3,
        explanation: 'The .append() method is used to add an element to the end of a list in Python.'
      },
      {
        question: 'How do you access the value associated with the key "name" in a dictionary `d`?',
        options: ['d.name', 'd("name")', 'd["name"]', 'd.get_value("name")'],
        correctAnswerIndex: 2,
        explanation: 'You use square bracket notation `d["key"]` to access values in a dictionary.'
      }
    ]
  },
  {
    id: 'section-3',
    title: 'Functions and Control Flow',
    duration: '35 Mins',
    youtubeId: '9OpiYIeG6HY', // Python Functions
    description: 'Learn how to control the flow of your programs using conditional statements (if, elif, else) and loops (for, while). You will also learn to write your own functions to create reusable and organized code.',
    practice: {
      code: 'def greet(name):\n    return f"Hi, {name}"\n\nprint(greet("Bob"))',
      output: 'Hi, Bob'
    },
    quiz: [
      {
        question: 'What keyword is used to define a function in Python?',
        options: ['function', 'def', 'fun', 'define'],
        correctAnswerIndex: 1,
        explanation: 'The `def` keyword is used to start a function definition in Python.'
      },
      {
        question: 'Which loop is best suited for iterating over a sequence (like a list)?',
        options: ['while loop', 'for loop', 'do-while loop', 'if loop'],
        correctAnswerIndex: 1,
        explanation: 'The `for` loop is designed to iterate directly over the items of any sequence.'
      }
    ]
  },
  {
    id: 'section-4',
    title: 'Introduction to NumPy',
    duration: '30 Mins',
    youtubeId: 'QUT1VHiLmmI', // NumPy Tutorial
    description: 'Enter the world of scientific computing with NumPy. Learn about the powerful N-dimensional array object, and how to perform efficient numerical operations.',
    practice: {
      code: 'import numpy as np\n\narr = np.array([1, 2, 3])\nprint(arr * 2)',
      output: '[2 4 6]'
    },
    quiz: [
      {
        question: 'What is the primary data structure in NumPy?',
        options: ['DataFrame', 'Series', 'ndarray', 'Matrix'],
        correctAnswerIndex: 2,
        explanation: 'The core of NumPy is the `ndarray` (N-dimensional array) object, which is a fast and flexible container for large datasets in Python.'
      },
       {
        question: 'How is NumPy imported by convention?',
        options: ['import numpy', 'import numpy as n', 'import numpy as np', 'import numpy as num'],
        correctAnswerIndex: 2,
        explanation: 'The standard convention for importing NumPy is `import numpy as np`.'
      }
    ]
  },
  {
    id: 'section-5',
    title: 'Data Manipulation with Pandas',
    duration: '1 Hour 15 Mins',
    youtubeId: 'vmEHCJofslg', // Pandas Tutorial
    description: 'Pandas is the most popular library for data analysis in Python. Get introduced to its two main data structures, Series and DataFrame, and learn how to read, write, and manipulate data.',
    practice: {
      code: 'import pandas as pd\n\ndata = {\'age\': [25, 30, 22]}\ns = pd.Series(data[\'age\'])\nprint(s.mean())',
      output: '25.666666666666668'
    },
    quiz: [
      {
        question: 'What is the primary data structure for tabular data in Pandas?',
        options: ['Series', 'Array', 'DataFrame', 'Table'],
        correctAnswerIndex: 2,
        explanation: 'The DataFrame is a 2-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table.'
      },
      {
        question: 'Which function is used to read a CSV file into a Pandas DataFrame?',
        options: ['read_csv()', 'open_csv()', 'load_csv()', 'get_csv()'],
        correctAnswerIndex: 0,
        explanation: 'The `pd.read_csv()` function is the standard way to import data from a CSV file into a DataFrame.'
      }
    ]
  },
  {
    id: 'section-6',
    title: 'Introduction to AI with Scikit-Learn',
    duration: '25 Mins',
    youtubeId: '0B5eIE_1a_M', // Scikit-Learn Course
    description: 'Take your first steps into Artificial Intelligence and Machine Learning with Scikit-Learn. Understand the basic concepts of training a model and make your first prediction.',
    practice: {
      code: 'from sklearn.linear_model import LinearRegression\n\n# Create a model instance\nmodel = LinearRegression()\nprint(model)',
      output: 'LinearRegression()'
    },
    quiz: [
      {
        question: 'In Scikit-learn, what method is used to train a machine learning model?',
        options: ['.train()', '.fit()', '.learn()', '.run()'],
        correctAnswerIndex: 1,
        explanation: 'The `.fit(X, y)` method is used to train a model on the training data (X) and target values (y).'
      },
      {
        question: 'After training a model, what method is used to make predictions on new data?',
        options: ['.predict()', '.guess()', '.forecast()', '.run()'],
        correctAnswerIndex: 0,
        explanation: 'The `.predict(X_new)` method is used to predict target values for new, unseen data.'
      }
    ]
  }
];