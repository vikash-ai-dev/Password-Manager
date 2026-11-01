# 🔐 PassOP — Password Manager

PassOP is a full-stack password manager built with React, Express.js, and MongoDB. It allows users to save, view, update, copy, and delete their account credentials through a simple web interface.

The project uses AES-256-GCM encryption to encrypt passwords before storing them in the database.

## ✨ Features

- **Add Passwords:** Save website names, usernames, and passwords.
- **View Passwords:** Display saved credentials.
- **Show/Hide Passwords:** Reveal or mask passwords when needed.
- **Copy to Clipboard:** Copy passwords easily.
- **Edit Passwords:** Update existing credentials.
- **Delete Passwords:** Remove saved credentials.
- **Encrypted Storage:** Encrypt passwords before saving them to MongoDB.
- **Toast Notifications:** Receive feedback when performing actions.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development and build tool |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| React Toastify | Notifications |
| Node.js | JavaScript runtime |
| Express.js | Backend API |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| AES-256-GCM | Password encryption |

## 📁 Project Structure

```text
Password-Manager/
├── public/                 # Static assets
├── src/                    # React frontend
├── server/
│   ├── models/             # Mongoose database models
│   ├── utils/
│   │   └── encryption.js   # Encryption and decryption
│   ├── server.js           # Express API server
│   ├── package.json        # Backend dependencies
│   └── .env                # Secret configuration (create locally)
├── .gitignore
├── package.json            # Frontend dependencies
├── vite.config.js
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/vikash-ai-dev/Password-Manager.git
cd Password-Manager
```

### 2. Set Up the Frontend

Install the frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Vite will display the local URL in your terminal, usually `http://localhost:5173`.

### 3. Set Up the Backend

Open a second terminal from the project root:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder and add an encryption key:

```env
ENCRYPTION_KEY=your_64_character_hex_key
```

Generate a suitable 32-byte key using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated value into `ENCRYPTION_KEY`. Do not use the example placeholder as your actual key.

Start the backend:

```bash
npm start
```

The backend runs on `http://localhost:5000`.

### 4. Start MongoDB

Make sure your local MongoDB server is running. The backend connects to:

```text
mongodb://localhost:27017/passop
```

The database is named `passop`. Mongoose manages the password records.

### 5. Use PassOP

Once the frontend, backend, and MongoDB are running, open the frontend URL shown by Vite.

You can then add, view, copy, edit, and delete saved credentials.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/passwords` | Retrieve saved credentials |
| POST | `/api/passwords` | Add a new credential |
| PATCH | `/api/passwords/:id` | Update a credential |
| DELETE | `/api/passwords/:id` | Delete a credential |

The API runs locally on port `5000`.

## 🔒 Security Notes

- Passwords are encrypted using AES-256-GCM before being stored in MongoDB.
- Keep the encryption key private and never commit your `.env` file to GitHub.
- Back up the encryption key securely. Losing it may make encrypted passwords impossible to decrypt.
- Do not use real or sensitive credentials in this learning project.
- Encryption alone does not provide a complete security system. Authentication, authorization, HTTPS, and additional security controls are needed before a password manager can be considered production-ready.

**Important:** This is a learning project, not a production-ready password manager.

## 🎯 Project Purpose

PassOP was created to practice full-stack web development, REST API integration, database operations, React state management, and basic encryption concepts.

## 👨‍💻 Author

**Vikash Patel**

- GitHub: [@vikash-ai-dev](https://github.com/vikash-ai-dev)
- Project Repository: [Password-Manager](https://github.com/vikash-ai-dev/Password-Manager)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.

