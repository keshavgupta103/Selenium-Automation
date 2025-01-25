\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{hyperref}

\title{Selenium Automation Script for Saucedemo}
\author{}
\date{\today}

\begin{document}

\maketitle

\section*{Introduction}
This project contains an automation script for end-to-end testing of the Saucedemo website using Selenium WebDriver and Node.js. The script performs tasks such as login, adding items to the cart, removing items, and completing the checkout process.

\section*{Prerequisites}
To run this project, ensure you have the following installed on your system:
\begin{itemize}
    \item Node.js (v16 or above)
    \item npm (Node Package Manager)
    \item Google Chrome browser
    \item ChromeDriver
    \item dotenv package for environment variable management
\end{itemize}

\section*{Setup Instructions}
\begin{enumerate}
    \item Clone this repository to your local machine:
    \begin{verbatim}
    git clone <repository-url>
    \end{verbatim}

    \item Navigate to the project directory:
    \begin{verbatim}
    cd <project-directory>
    \end{verbatim}

    \item Install the required dependencies:
    \begin{verbatim}
    npm install
    \end{verbatim}

    \item Create a \texttt{.env} file in the root directory with the following variables:
    \begin{verbatim}
    USER_NAME=<your-username>
    USER_PWD=<your-password>
    WRONG_USER=<invalid-username>
    WRONG_PWD=<invalid-password>
    PRODUCTS_NAME=["item1", "item2", "item3"]
    FILTER_BY=<filter-option>
    CUS_FNAME=<first-name>
    CUS_SNAME=<last-name>
    CUS_PINCODE=<zip-code>
    SUCCESS_MSG=<success-message>
    \end{verbatim}

    \item Ensure ChromeDriver is installed and added to your system's PATH.

    \item Run the automation script:
    \begin{verbatim}
    node <script-name>.js
    \end{verbatim}
\end{enumerate}

\section*{Features}
\begin{itemize}
    \item Login with valid and invalid credentials
    \item Add items to the cart and validate the count
    \item Remove items from the cart based on price range
    \item Complete the checkout flow
    \item Logout and verify redirection to the login page
\end{itemize}

\section*{File Structure}
\begin{verbatim}
project-directory/
│
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
├── <script-name>.js      # Main automation script
└── README.md             # Documentation (this file)
\end{verbatim}

\section*{Notes}
\begin{itemize}
    \item The automation script uses explicit waits to handle dynamic elements and ensure proper synchronization.
    \item Modify the \texttt{.env} file to customize the input values for different test cases.
    \item Ensure your Chrome browser version matches the installed ChromeDriver version.
\end{itemize}

\section*{License}
This project is licensed under the MIT License. See the LICENSE file for details.

\section*{Acknowledgments}
\begin{itemize}
    \item Saucedemo for providing the test platform
    \item Selenium WebDriver for enabling robust browser automation
\end{itemize}

\end{document}

