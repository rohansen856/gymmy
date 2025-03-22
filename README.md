# Gymmy: Smart Gym Management System

Gymmy is an AI-driven gym management system designed to enhance fitness accessibility, personalized wellness, and community engagement within a campus environment. The platform provides real-time equipment tracking, personalized fitness plans, and advanced analytics using AI models. It integrates IoT devices and OpenCV for real-time monitoring, ensuring a data-driven approach to gym management. Built using Next.js, FastAPI, and PostgreSQL, Gymmy offers a scalable, secure, and user-centric experience for students, faculty, and visitors.

## 📌 Core Solution Features

### 🏋️ Fitness Equipment Accessibility
**Problem:** Difficulty in locating and booking fitness equipment due to the absence of a centralized system.
**Solution:**
* 🌐 Web and mobile platform for real-time equipment availability and booking.
* 📅 Calendar-based reservation system with conflict detection.
* 🛠️ Admin dashboard for equipment tracking and maintenance logs.

### 📊 Personalized Wellness Plans
**Problem:** Generic plans fail to meet individual needs, leading to low adherence.
**Solution:**
* 🤖 AI-powered Nutrition & Fitness Plan Predictor API for customized recommendations.
* 📏 Personalized diet and exercise plans based on user inputs (e.g., gender, age, height, weight, fitness goals).
* 📚 Adaptive fitness plans that consider academic schedules (e.g., exam periods) and adjust workout intensity accordingly.

### 🤝 Community Engagement
**Problem:** Lack of motivation when pursuing fitness alone.
**Solution:**
* 🏆 Gamified fitness challenges and leaderboards to encourage participation.
* 💬 Social interaction through community discussion forums.
* ⚔️ "Versus" feature for comparing fitness stats with other members.

### 📈 Real-time Monitoring and Analytics
**Problem:** Absence of integrated progress tracking and insights.
**Solution:**
* 📟 IoT integration for real-time tracking using gym CCTV feeds and fitness bands.
* 📹 Gym traffic analysis via OpenCV for peak-hour detection and monitoring.
* 📊 Interactive dashboards for tracking workout history and performance trends.

## 🧠 AI Integrations

### 🔥 Powerlifting Model
* Predicts optimal deadlift performance based on user inputs (gender, age, height, weight, best squat, and bench press).
* Uses Gradient Boosting Regressor for accurate strength estimation.
* Achieves 97% prediction accuracy, providing reliable insights for lifters.
* Supports personalized strength prediction and long-term goal planning.

### 🍎 Fast Nutrition and Diet Recommendation
* Provides rapid diet suggestions tailored to individual profiles.
* Considers academic schedules (e.g., exam stress) for balanced diet planning.
* Uses a multi-output Artificial Neural Network (ANN) for generating personalized diet and exercise plans.
* Achieves 96.4% prediction accuracy using TensorFlow and FastAPI.
* Supports BMI calculation, health-aware suggestions (diabetes, hypertension), and goal-oriented planning (weight loss, muscle gain).

### 📆 Fitness and Nutrition Planner
* Dynamic scheduling for workout and diet plans based on academic calendars.
* Adjusts exercise routines based on class days, exam periods, and rest days.
* Uses Groq's LLM (llama3-8b-8192) for advanced contextual understanding and personalized planning.
* Incorporates vector embeddings using HuggingFace for semantic search.
* Outputs structured JSON responses for seamless integration.

### 📹 Exercise Form Detection with OpenCV
* Monitors exercise movements (e.g., dumbbell press, bicep curl) to ensure correct form.
* Provides real-time feedback for posture correction and injury prevention.

### 📊 Gym Traffic Analysis using OpenCV
* Analyzes gym occupancy via CCTV for peak-hour detection.
* Provides hourly and daily usage analytics for resource planning.

## 🔑 Key Features of AI Models
* Powerlifting Model: 97% accuracy using Gradient Boosting Regressor.
* Fast Nutrition and Diet Predictor: 96.4% accuracy using ANN.
* Dynamic Fitness Planner: Uses Groq's LLM and vector embeddings.
* OpenCV: For form detection and gym traffic analysis.

## 🛠️ Tech Stack
* Frontend: Next.js with TypeScript for a fast, scalable user interface.
* Backend: FastAPI for AI model inference and RESTful services.
* Database: PostgreSQL using Prisma ORM for structured data management.

## 🔐 Authentication
* NextAuth.js for secure user access and multi-role support (admin, students, visitors).

## 📦 Deployment
* Docker-based containers for scalability and performance optimization.

## 🏗️ System Architecture
* Input Layer: User data validation (gender, height, weight, fitness goals).
* Processing Layer: AI model inference (diet, exercise, gym traffic).
* Output Layer: JSON response with personalized insights and analytics.

## 🧑‍💻 User Interfaces

### Admin Interface
* Manage equipment, user profiles, and event scheduling.
* Real-time monitoring of gym traffic and resource usage.

### Student/Faculty Interface
* Equipment reservation and personalized wellness plans.
* Access to performance dashboards and community challenges.

### Visitor Interface
* Limited access to equipment booking and community events.

## 📊 Scalability and Security Considerations
* Secure user authentication via NextAuth.js with OAuth2.0.
* Data encryption for user profiles and health metrics.
* Optimized inference for handling 1000+ requests/minute.

## 🚀 Future Enhancements
* Real-time feedback through enhanced exercise form detection.
* Advanced analytics with improved neural network models.
* Mobile application integration for on-the-go accessibility.
* Enhanced health metrics and goal tracking.
* AI model evolution for improved fitness domain personalization.
* Integration with wearable devices for comprehensive health tracking.
* Continuous model improvement via user feedback and updated datasets.

Gymmy redefines campus fitness by offering a smart, data-driven approach that enhances accessibility, personalization, and community engagement while ensuring robust security and scalability.
