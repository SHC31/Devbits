

 # **Fin Tracker - Personal Finance Management Application**  

## **1. Project Title & Problem Statement**  

**Project Title:** Fin Tracker  

**Problem Statement:**  
Many individuals struggle to manage their personal finances due to the lack of accessible and user-friendly tools. *Fin Tracker* is a web-based personal finance management application designed to help users track their income, expenses, and transactions. The platform provides budgeting tools, financial analytics, and intuitive visualizations, empowering users to make informed financial decisions.  

---

## **2. Features Implemented**  

### **✔️ Core Features:**  

✅ **Dashboard:**  
- Displays total balance, total income, and total expenses.  
- Shows recent transactions.  
- Visualizes financial data using pie charts and bar graphs.  
- Provides a tabular view of expenses with an option to view all expenses.  

✅ **Income Tracking:**  
- Users can add, edit, and categorize income sources.  
- Provides an overview of income trends over time with a line graph.  
- Lists individual income sources with amount and date.  
- Had a feature to download the income csv file

✅ **Expense Tracking:**  
- Users can record, categorize, and edit expenses.  
- Offers an overview of spending habits with visual breakdowns (pie charts, bar charts).  
- Had a feature to download the expense csv file


✅ **Transaction History:**  
- Displays all transactions (income and expenses) in one place.  
- Includes search functionality to filter transactions by date range and type.  
- Shows transaction details: type, amount, and date.  

✅ **User Authentication:**  
- Secure login and logout functionality.  

---

## **3. Hosted Links**  

🚀 **Live Demo:** http://localhost:5173/

🔗 **GitHub Repository:** https://github.com/SHC31/Devbits.git


---

## **4. Screenshots**  

### **Dashboard**  
![Dashboard_page](https://github.com/user-attachments/assets/f75af79d-fa7d-4a28-9a7e-0dc34a0c2b15)
![Dashboard_page](https://github.com/user-attachments/assets/b5d965fd-5586-4d89-811d-73da473776b9)


### **Income**  
![Income_page](https://github.com/user-attachments/assets/1259cb40-315e-400e-9c5e-0469d6cf50e0)


### **Expenses**
![Expensepage](https://github.com/user-attachments/assets/e7c9ba02-1fa5-4ac2-8f26-5822dca3dc48)


### **Transactions**  
![Transactions_page](https://github.com/user-attachments/assets/39353591-6d21-40b6-9a85-cbbae9ccd511)


---

## **5. Technologies Used**  

### **Frontend:**  
- React.js  
- Material UI / Tailwind CSS (if used)  
- Chart.js (for data visualization)  

### **Backend:**  
- Node.js & Express.js  
- MongoDB (Database)  
- Mongoose (ODM for MongoDB)  
- JWT (for user authentication)  

### **Other Tools & Libraries:**  
- Axios (API calls)  
- bcrypt.js (Password hashing)  
- dotenv (Environment variable management)  

---

## **6. API Endpoints (Optional)**  

| Method | Endpoint | Description |  
|--------|----------|-------------|  
| **POST** | `/api/users/register` | Registers a new user |  
| **POST** | `/api/users/login` | Logs in an existing user |  
| **GET** | `/api/transactions` | Retrieves all transactions |  
| **POST** | `/api/transactions` | Creates a new transaction |  
| **GET** | `/api/income` | Retrieves all income records |  
| **POST** | `/api/income` | Adds a new income record |  
| **GET** | `/api/expenses` | Retrieves all expense records |  
| **POST** | `/api/expenses` | Adds a new expense record |  

---

## **7. Installation & Setup**  

### **🔧 Prerequisites:**  
- Node.js installed  
- MongoDB setup (local or cloud e.g., MongoDB Atlas)  

### **📌 Steps to Run the Project:**  

1. **Clone the Repository:**  
```bash
git clone https://github.com/your-username/fin-tracker.git
cd fin-tracker

```
2. **Install Dependencies:**

```bash
npm install
```
3. **Set Up Environment Variables:**

  Create a .env file in the root and add the following:

  ```plaintext
  MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
4. **Run the Backend Server:**
```bash
npm start
```
5. **Navigate to client Folder and Install Frontend Dependencies:**
```bash
cd client
npm install
```
6. **Run the Frontend**
```bash 
npm start
```
7. **Open in Browser:**

Visit http://localhost:8000 to access the application.

## **8. Possible Future Enhancements**  

These features were considered but were **not implemented** within the hackathon timeframe. They could be potential future improvements:  

✔ **Smart Budgeting & Savings Goals** – Feature to set financial goals and track savings.  
✔ **Automated Bill Reminders** – Notifications for upcoming payments.  
✔ **CSV Import** – Upload bank statements and  reports.  
✔ **Bank Account Integration** – Real-time syncing with financial institutions via APIs.  

## **9. Contributors**  

👤 **Your Name** - [CH VISHAL REDDY](https://github.com/CHINTHIREDDYVISHALREDDY)  

👤 **Your Name** - [P GOWTHAM](https://github.com/Gowtham-Palli)  

👤 **Your Name** - [S HEMACHANDRA](https://github.com/SHC31)  


💡 Open to contributions! Feel free to submit a pull request.  

## **10. License**  

📜 This project is licensed under the **MIT License** – free for personal and commercial use.  




