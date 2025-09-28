export interface ExternalCourse {
  id: string;
  title: string;
  imageUrl: string;
  languages: string[];
  eligibility: string;
  duration: string;
  description: string;
  url: string;
}

export interface CompanyCourses {
  id: string;
  name: string;
  courses: ExternalCourse[];
}

export const ibmCourses: CompanyCourses = {
  id: 'ibm',
  name: 'IBM',
  courses: [
    {
      id: 'ibm-llm',
      title: 'Introduction to Large Language Models',
      imageUrl: 'https://i.insider.com/60a28128f27b4c0019444d4a?width=700',
      languages: ['English', 'Arabic', 'Brazilian Portuguese', 'Indonesian', 'Japanese', 'Spanish'],
      eligibility: 'Eligible to registered learners',
      duration: '90 minutes total course time',
      description: "In this module, you'll explore the capabilities of large language models and their business applications. You'll learn about the different types of IBM Granite models and the unique features that make them ideal for enterprise use. You'll also discover how to craft effective prompts to guide these models and overcome common challenges in their use.",
      url: 'https://skillsbuild.org/college-students/course-catalog'
    },
    {
      id: 'ibm-ai-labs',
      title: 'Artificial intelligence Labs',
      imageUrl: 'https://i.insider.com/60a28128f27b4c0019444d4a?width=700',
      languages: ['English'],
      eligibility: 'Eligible to registered learners',
      duration: 'Self-paced',
      description: 'Hands-on labs to apply your AI knowledge and build practical skills using industry-standard tools and platforms.',
      url: 'https://skillsbuild.org/college-students/course-catalog'
    },
    {
      id: 'ibm-cybersecurity',
      title: 'Cybersecurity',
      imageUrl: 'https://i.insider.com/60a28128f27b4c0019444d4a?width=700',
      languages: ['English'],
      eligibility: 'Eligible to registered learners',
      duration: 'Self-paced',
      description: 'Learn the fundamentals of cybersecurity, including threat detection, risk management, and defensive strategies to protect digital assets.',
      url: 'https://skillsbuild.org/college-students/course-catalog'
    },
    {
      id: 'ibm-data-science',
      title: 'Data science',
      imageUrl: 'https://i.insider.com/60a28128f27b4c0019444d4a?width=700',
      languages: ['English'],
      eligibility: 'Eligible to registered learners',
      duration: 'Self-paced',
      description: 'Explore the data science lifecycle, from data collection and cleaning to analysis, visualization, and model building.',
      url: 'https://skillsbuild.org/college-students/course-catalog'
    },
    {
      id: 'ibm-cloud',
      title: 'Cloud',
      imageUrl: 'https://i.insider.com/60a28128f27b4c0019444d4a?width=700',
      languages: ['English'],
      eligibility: 'Eligible to registered learners',
      duration: 'Self-paced',
      description: 'Understand the core concepts of cloud computing, including services, deployment models, and infrastructure management.',
      url: 'https://skillsbuild.org/college-students/course-catalog'
    }
  ]
};

const GOOGLE_IMAGE_URL = 'https://imageio.forbes.com/specials-images/imageserve/662b94a5a1aa426c71949af8/Hannover-Messe-Industrial-Trade-Fair-2023/960x0.jpg?format=jpg&width=960';

export const googleCourses: CompanyCourses = {
  id: 'google',
  name: 'Google',
  courses: [
    {
      id: 'google-gen-ai-intro',
      title: 'Introduction to Generative AI',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn the fundamentals of Generative AI, what it is, how it is used, and how it differs from traditional machine learning methods.',
      url: 'https://www.classcentral.com/course/introduction-to-generative-ai-199878'
    },
    {
      id: 'google-responsible-ai-intro',
      title: 'Introduction to Responsible AI',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Understand the importance of ethical considerations and responsible development in artificial intelligence.',
      url: 'https://www.classcentral.com/course/introduction-to-responsible-ai-199879'
    },
    {
      id: 'google-gmail',
      title: 'Gmail',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Master the features of Gmail to improve your productivity and manage your email communications effectively.',
      url: 'https://www.classcentral.com/course/gmail-199880'
    },
    {
      id: 'google-sheets-advanced',
      title: 'Google Sheets – Advanced Topics',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Dive deep into advanced Google Sheets functionalities, including complex formulas, pivot tables, and scripting.',
      url: 'https://www.classcentral.com/course/google-sheets-advanced-topics-199882'
    },
    {
      id: 'google-image-generation-intro',
      title: 'Introduction to Image Generation',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Explore the world of AI-powered image generation, from basic concepts to using advanced models.',
      url: 'https://www.classcentral.com/course/introduction-to-image-generation-199881'
    },
    {
      id: 'google-calendar',
      title: 'Google Calendar',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to organize your schedule, set reminders, and manage events efficiently with Google Calendar.',
      url: 'https://www.classcentral.com/course/google-calendar-199883'
    },
    {
      id: 'google-sheets',
      title: 'Google Sheets',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Get started with Google Sheets, covering everything from basic data entry to creating charts and using simple formulas.',
      url: 'https://www.classcentral.com/course/google-sheets-199884'
    },
    {
      id: 'google-earth-engine',
      title: 'Planetary Scale Earth Observation with Google Earth Engine',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Analyze geospatial data and monitor planetary changes using the powerful Google Earth Engine platform.',
      url: 'https://www.classcentral.com/course/planetary-scale-earth-observation-with-google-earth-engine-199885'
    },
    {
      id: 'google-ads-apps-cert',
      title: 'Google Ads Apps Certification',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Prepare for and earn the Google Ads Apps Certification to validate your expertise in mobile app advertising.',
      url: 'https://skillshop.exceedlms.com/student/path/29305-google-ads-apps-certification'
    },
    {
      id: 'google-ads-measurement-cert',
      title: 'Google Ads – Measurement Certification',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Validate your ability to measure and optimize digital ad performance with the Google Ads Measurement Certification.',
      url: 'https://skillshop.exceedlms.com/student/path/29302-google-ads-measurement-certification'
    },
    {
      id: 'google-ads-shopping-cert',
      title: 'AI-Powered Shopping ads Certification',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Demonstrate your knowledge of creating and optimizing Shopping campaigns, including with AI-powered features.',
      url: 'https://skillshop.exceedlms.com/student/path/29300-google-ads-shopping-certification'
    },
    {
      id: 'google-ads-creative-cert',
      title: 'Google Ads Creative Certification',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Showcase your ability to develop effective ad creatives that drive results on Google platforms.',
      url: 'https://skillshop.exceedlms.com/student/path/29303-google-ads-creative-certification'
    },
    {
      id: 'google-ads-display-cert',
      title: 'Google Ads Display Certification',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Earn your certification by proving your expertise in creating impactful display advertising campaigns.',
      url: 'https://skillshop.exceedlms.com/student/path/29304-google-ads-display-certification'
    },
    {
      id: 'google-ads-search-cert',
      title: 'Google Ads Search Certification',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Become certified in Google Search ads by demonstrating your ability to build and optimize powerful search campaigns.',
      url: 'https://skillshop.exceedlms.com/student/path/29301-google-ads-search-certification'
    },
    {
      id: 'google-firebase-web-app',
      title: 'Build your first web app with Firebase',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'A hands-on codelab that walks you through building a complete web application using the Firebase platform.',
      url: 'https://firebase.google.com/codelabs/firebase-get-to-know-web'
    },
    {
      id: 'google-maps-platform-start',
      title: 'Get started with Google Maps Platform',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to integrate Google Maps into your applications to create rich, location-based experiences.',
      url: 'https://developers.google.com/maps/get-started'
    },
    {
      id: 'google-flutter-apps',
      title: 'Build apps with Flutter',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Follow this codelab to get started with Flutter and build your first cross-platform mobile application.',
      url: 'https://docs.flutter.dev/get-started/codelab'
    },
    {
      id: 'google-sql-intro',
      title: 'Introduction to SQL',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'An Android basics pathway course that introduces the fundamentals of SQL for database management.',
      url: 'https://developer.android.com/courses/pathways/android-basics-kotlin-three'
    },
    {
      id: 'google-get-data-internet',
      title: 'Get data from the internet',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to make network requests to retrieve and process data from APIs in your Android applications.',
      url: 'https://developer.android.com/courses/pathways/android-basics-kotlin-four'
    },
    {
      id: 'google-adapt-screen-sizes',
      title: 'Adapt for different screen sizes',
      imageUrl: GOOGLE_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Master responsive design principles to ensure your Android apps look great on any device, from phones to tablets.',
      url: 'https://developer.android.com/courses/pathways/android-basics-kotlin-five'
    },
  ]
};

const AWS_IMAGE_URL = 'https://www.creativeitinstitute.com/images/course/course_1663655990.jpg';

export const awsCourses: CompanyCourses = {
  id: 'aws',
  name: 'AWS',
  courses: [
    {
      id: 'aws-ml-basics',
      title: 'Machine Learning Basics for Decision Makers',
      imageUrl: AWS_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Understand the fundamentals of Machine Learning and how it can be applied to solve business problems, no technical background required.',
      url: 'https://skillbuilder.aws/category/domain/artificial-intelligence?page=1&accessTier=free'
    },
    {
      id: 'aws-gen-ai-intro',
      title: 'Introduction to Generative AI on AWS',
      imageUrl: AWS_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Explore what Generative AI is and how you can use AWS services like Amazon Bedrock to build innovative applications.',
      url: 'https://skillbuilder.aws/category/domain/artificial-intelligence?page=1&accessTier=free'
    },
    {
      id: 'aws-sagemaker-studio',
      title: 'Amazon SageMaker Studio Basics',
      imageUrl: AWS_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn to navigate Amazon SageMaker Studio, the integrated development environment (IDE) for machine learning.',
      url: 'https://skillbuilder.aws/category/domain/artificial-intelligence?page=1&accessTier=free'
    },
    {
      id: 'aws-building-llms',
      title: 'Building Language Models on AWS',
      imageUrl: AWS_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'A deeper dive into the architecture and training processes for building custom Large Language Models using AWS tools.',
      url: 'https://skillbuilder.aws/category/domain/artificial-intelligence?page=1&accessTier=free'
    },
    {
      id: 'aws-ai-for-business',
      title: 'AI for Business Leaders',
      imageUrl: AWS_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'A high-level overview of AI and ML concepts, designed to help business leaders identify opportunities for AI in their organizations.',
      url: 'https://skillbuilder.aws/category/domain/artificial-intelligence?page=1&accessTier=free'
    },
  ]
};

const MICROSOFT_IMAGE_URL = 'https://copyassignment.com/wp-content/uploads/2022/07/Microsoft-Giving-Free-Python-Course-Enroll-Now.jpg';

export const microsoftCourses: CompanyCourses = {
  id: 'microsoft',
  name: 'Microsoft',
  courses: [
    {
      id: 'ms-power-bi-reports',
      title: 'Create and use analytics reports with Power BI',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to connect to data, build data models, and create compelling reports and dashboards using Microsoft Power BI.',
      url: 'https://www.classcentral.com/course/youtube-create-and-use-analytics-reports-with-power-bi-od328-161603'
    },
    {
      id: 'ms-az-104-vnet',
      title: 'AZ-104: Configure and manage virtual networks for Azure administrators',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Master the skills needed to configure and manage virtual networks in Azure, a key component of the AZ-104 certification.',
      url: 'https://www.classcentral.com/course/youtube-az-104-configure-and-manage-virtual-networks-for-azure-administrators-od328-161609'
    },
    {
      id: 'ms-csharp-intro',
      title: 'Write your first code using C#',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Begin your journey into programming with C#. This course covers the basic syntax and thought processes for writing your first lines of code.',
      url: 'https://www.classcentral.com/course/youtube-write-your-first-code-using-c-get-started-with-c-part-1-od328-161595'
    },
    {
      id: 'ms-data-analytics-intro',
      title: 'Get started with Microsoft data analytics',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'An introductory course on the concepts of data analytics and the tools available within the Microsoft ecosystem.',
      url: 'https://www.classcentral.com/course/youtube-get-started-with-microsoft-data-analytics-od328-161607'
    },
    {
      id: 'ms-azure-fundamentals-cloud',
      title: 'Microsoft Azure Fundamentals: Describe cloud concepts',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn the core concepts of cloud computing and how they are implemented in Microsoft Azure. A foundational course for Azure certifications.',
      url: 'https://www.classcentral.com/course/youtube-microsoft-azure-fundamentals-describe-cloud-concepts-od328-161601'
    },
     {
      id: 'ms-power-bi-intro',
      title: 'Get started with Power BI',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'This course provides a foundational understanding of Power BI, enabling you to create and share insightful data visualizations.',
      url: 'https://www.classcentral.com/course/youtube-get-started-with-power-bi-od328-161600'
    },
    {
      id: 'ms-pl-900',
      title: 'PL-900: Microsoft Power Platform Fundamentals',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Explore the business value and product capabilities of the Power Platform. Create simple Power Apps, connect data with Dataverse, build a Power BI Dashboard, and automate a process with Power Automate.',
      url: 'https://www.classcentral.com/course/youtube-pl-900-microsoft-power-platform-fundamentals-od328-161598'
    },
    {
      id: 'ms-consume-data-power-bi',
      title: 'Consume data with Power BI',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to consume, analyze, and interpret data from various reports and dashboards within the Power BI service.',
      url: 'https://www.classcentral.com/course/youtube-consume-data-with-power-bi-od328-161592'
    },
    {
      id: 'ms-azure-ai-overview',
      title: 'Microsoft Azure AI Fundamentals: AI Overview',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Get a high-level overview of Artificial Intelligence and the services in Microsoft Azure that you can use to create AI solutions.',
      url: 'https://www.classcentral.com/course/youtube-microsoft-azure-ai-fundamentals-ai-overview-od328-161593'
    },
    {
      id: 'ms-azure-data-fundamentals',
      title: 'Microsoft Azure Data Fundamentals: Explore data analytics in Azure',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Explore the roles, tasks, and responsibilities in the world of data analytics, and learn about the different data analytics services in Azure.',
      url: 'https://www.classcentral.com/course/youtube-microsoft-azure-data-fundamentals-explore-data-analytics-in-azure-od328-161590'
    },
    {
      id: 'ms-powershell-automate',
      title: 'Automate administrative tasks by using PowerShell',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Discover how to automate repetitive administrative tasks and manage systems at scale using Windows PowerShell.',
      url: 'https://www.classcentral.com/course/youtube-automate-administrative-tasks-by-using-powershell-od328-161589'
    },
    {
      id: 'ms-python-django',
      title: 'Create data-driven websites by using the Python framework Django',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn the fundamentals of web development with Python and Django to build dynamic, data-driven websites.',
      url: 'https://www.classcentral.com/course/youtube-create-data-driven-websites-by-using-the-python-framework-django-od328-161610'
    },
    {
      id: 'ms-azure-sql-fundamentals',
      title: 'Azure SQL fundamentals',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Explore the fundamentals of database concepts in a cloud environment, and get basic skills in cloud data services within Microsoft Azure.',
      url: 'https://www.classcentral.com/course/youtube-azure-sql-fundamentals-od328-161602'
    },
    {
      id: 'ms-web-dev-beginners',
      title: 'Web Development for Beginners',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'A comprehensive curriculum on JavaScript, HTML, and CSS fundamentals provided by the team at Microsoft.',
      url: 'https://www.classcentral.com/course/youtube-web-development-for-beginners-od328-161588'
    },
    {
      id: 'ms-azure-ai-visual-tools',
      title: 'Microsoft Azure AI Fundamentals: Explore visual tools for machine learning',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to use Azure Machine Learning designer to create and publish machine learning models without writing any code.',
      url: 'https://www.classcentral.com/course/youtube-microsoft-azure-ai-fundamentals-explore-visual-tools-for-machine-learning-od328-161606'
    },
    {
      id: 'ms-dynamics-365-insights',
      title: 'Explore the fundamentals of Microsoft Dynamics 365 Customer Insights',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Discover how Dynamics 365 Customer Insights helps organizations unify customer data to gain a holistic view and drive personalized experiences.',
      url: 'https://www.classcentral.com/course/youtube-explore-the-fundamentals-of-microsoft-dynamics-365-customer-insights-od328-161596'
    },
    {
      id: 'ms-teams-troubleshoot',
      title: 'Troubleshoot Microsoft Teams',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn common troubleshooting methods for Microsoft Teams to resolve issues with connectivity, audio, video, and collaboration features.',
      url: 'https://www.classcentral.com/course/youtube-troubleshoot-microsoft-teams-od328-161608'
    },
    {
      id: 'ms-serverless-apps',
      title: 'Create serverless applications',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to build and deploy serverless applications using Azure Functions, Logic Apps, and Event Grid.',
      url: 'https://www.classcentral.com/course/youtube-create-serverless-applications-od328-161597'
    },
    {
      id: 'ms-powershell-intro',
      title: 'Getting Started with Microsoft PowerShell',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'A beginner-friendly introduction to the PowerShell command-line shell and scripting language.',
      url: 'https://www.classcentral.com/course/youtube-getting-started-with-microsoft-powershell-od328-161604'
    },
    {
      id: 'ms-dynamics-365-supply-chain',
      title: 'Configure and manage procurement and vendors in Dynamics 365 Supply Chain Management',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Deep dive into the procurement and vendor management modules of Dynamics 365 Supply Chain Management.',
      url: 'https://www.classcentral.com/course/youtube-configure-and-manage-procurement-and-vendors-in-dynamics-365-supply-chain-management-od328-161599'
    },
    {
      id: 'ms-windows-server-hybrid',
      title: 'Implement a Windows Server hybrid cloud infrastructure',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn how to integrate on-premises Windows Server environments with Azure cloud services to create a hybrid infrastructure.',
      url: 'https://www.classcentral.com/course/youtube-implement-a-windows-server-hybrid-cloud-infrastructure-od328-161612'
    },
    {
      id: 'ms-dynamics-365-finance',
      title: 'Work with accounts payable in Dynamics 365 Finance',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn the processes for managing vendor invoices, payments, and settlements in Dynamics 365 Finance.',
      url: 'https://www.classcentral.com/course/youtube-work-with-accounts-payable-in-dynamics-365-finance-od328-161605'
    },
    {
      id: 'ms-az-204-cosmos-db',
      title: 'AZ-204: Develop solutions that use Azure Cosmos DB',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: "Prepare for the AZ-204 exam with this module focused on developing applications that use Azure's multi-model database service, Cosmos DB.",
      url: 'https://www.classcentral.com/course/youtube-az-204-develop-solutions-that-use-azure-cosmos-db-od328-161594'
    },
    {
      id: 'ms-ms-101-compliance',
      title: 'MS-101 Manage compliance in Microsoft 365',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn about the compliance features in Microsoft 365, including data governance, information protection, and internal risk management.',
      url: 'https://www.classcentral.com/course/youtube-ms-101-manage-compliance-in-microsoft-365-od328-161611'
    },
    {
      id: 'ms-azure-nlp',
      title: 'Develop natural language processing solutions with Azure AI Services',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Discover how to build NLP solutions using Azure AI services for tasks like sentiment analysis, entity recognition, and language translation.',
      url: 'https://www.classcentral.com/course/youtube-develop-natural-language-processing-solutions-with-azure-ai-services-od328-161613'
    },
    {
      id: 'ms-minecraft-teacher',
      title: 'Minecraft Education: Teacher Academy',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'A professional development program for educators to learn how to effectively use Minecraft Education in their classrooms.',
      url: 'https://www.classcentral.com/course/youtube-minecraft-education-teacher-academy-od328-161614'
    },
    {
      id: 'ms-dynamics-365-migrate',
      title: 'Migrate data and go live with finance and operations apps',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'Learn the strategies and best practices for migrating data to Dynamics 365 finance and operations apps and managing the go-live process.',
      url: 'https://www.classcentral.com/course/youtube-migrate-data-and-go-live-with-finance-and-operations-apps-od328-161615'
    },
    {
      id: 'ms-dynamics-365-manufacturing',
      title: 'Get started with manufacturing in Microsoft Dynamics 365 Business Central',
      imageUrl: MICROSOFT_IMAGE_URL,
      languages: ['English'],
      eligibility: 'Public',
      duration: 'Self-paced',
      description: 'An introduction to the manufacturing capabilities of Dynamics 365 Business Central, covering production orders, bills of materials, and capacity planning.',
      url: 'https://www.classcentral.com/course/youtube-get-started-with-manufacturing-in-microsoft-dynamics-365-business-central-od328-161616'
    },
  ]
};

export const allCompanyCourses: CompanyCourses[] = [ibmCourses, googleCourses, awsCourses, microsoftCourses];