# Multilingual OCR Application

## Overview

This is a multilingual Optical Character Recognition (OCR) application built using React Native for the frontend, Node.js with Express.js for the backend, MongoDB for the database, and Tesseract.js for OCR processing. The app allows users to extract text from images in various languages, edit the extracted text, copy it to the clipboard, convert it to PDF, and share it. Users can also view their scan history and profile details.


## Features

- **User Authentication**: Users sign up with Gmail, verify their email, and log in.
- **Multilingual OCR**: Extract text from images in the selected language ( more then 115 languages ) using Tesseract.js.
- **Multilple regional lagugage support**: Extract text in regional lagugage like Gujarati, Hindi, Bengali and many more.
- **Image Input**: Capture a photo using the camera or select an image from the gallery.
- **Text Editing**: Edit the extracted text before copying or sharing.
- **PDF Conversion**: Convert the extracted text to a PDF.
- **History**: View a history of all scans performed.
- **User Profile**: View username, email, and total scans. Option to log out.


## Tech Stack

- **Frontend**: React Native
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **OCR Library**: Tesseract.js
- **Authentication**: Gmail Signup and Email Verification


## Screenshots

![Login Page](https://res.cloudinary.com/dmubceopz/image/upload/v1715753829/uaaegt0lqefixcxccyjy.jpg)


![Scan Page](https://res.cloudinary.com/dmubceopz/image/upload/v1715754332/ekxlf5gcno7jixo1c46q.jpg)

![Edit text page](https://res.cloudinary.com/dmubceopz/image/upload/v1715754576/zsif73fhlt2ihwf9pjhi.jpg)

![Convert to PDF](https://res.cloudinary.com/dmubceopz/image/upload/v1715753831/jomgj3jtpedjgrtxxjtd.jpg)





## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB
- react native and expo

### Backend Setup

#### Clone the repository:

```bash
git clone https://github.com/yourusername/multilingual-ocr-app.git
cd multilingual-ocr-app/backend
```

#### Installation of dependencies:

```bash
npm install
```

#### Set up environment variables in a .env file:

```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_password
```

### Frontend Setup

#### Navigate to the frontend directory and install dependencies

```bash
cd ../frontend 
npm install
```

#### Start the React Native application:
```bash
npm run start
```



    
### Contact

For any inquiries or feedback, please contact:

- **Name**: Divyesh Pindariya
- **email**: divyeshpindaria09@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/divyeshpindaria/
