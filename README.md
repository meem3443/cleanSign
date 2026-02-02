# Clean Sign 📄🔍

**Clean Sign** is a web service designed to analyze legal contracts. It detects potential "toxic clauses" or risky terms and visualizes the contract flow to help users understand their rights and risks more clearly.

## 🛠 Tech Stack

### Frontend
* **React** - UI Library for building the user interface.
* **Tailwind CSS** - Utility-first CSS framework for styling.

### Backend & Database
* **Python** - Handles contract analysis logic and data processing.
* **PostgreSQL** - Relational database for storing user data and analysis results.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Python](https://www.python.org/) (v3.9 or higher)
* [PostgreSQL](https://www.postgresql.org/)

### 1. Database Setup
Ensure your local PostgreSQL server is running and create a database for the project.

```bash
# Example: Create a database named 'cleansign_db'
createdb cleansign_db
