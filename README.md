# Apna Ghar 🏡

Apna Ghar is a MERN stack web application that allows users to buy and sell homes/rooms. The app provides a seamless experience for both sellers and buyers with features like property listings, saved properties, and direct contact options.

## Features 🚀

### For Sellers:
- Add new properties for sale.
- Edit and manage added properties.
- View properties listed by all sellers.
- Receive buyer details when they click "Contact with Seller."

### For Buyers:
- Browse available properties.
- Save properties to a personal list for later viewing.
- Contact sellers to inquire about properties.
- Resume video playback from where it was last left off.

## Tech Stack 🛠️
- **Frontend:** React.js, Vite, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Google and Facebook OAuth
- **Package Manager:** Bun

## Installation 💻

### Prerequisites
Make sure you have the following installed:
- Node.js & Bun
- MongoDB
- Git

### Steps to Run Locally
1. **Clone the repository:**
   ```sh
   git clone https://github.com/sandeep1404-praj/Apna_Ghar.git
   cd Apna_Ghar
   ```

2. **Install dependencies:**
   ```sh
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary keys (e.g., MongoDB URI, OAuth credentials, etc.).

4. **Run the backend server:**
   ```sh
   bun run server
   ```

5. **Run the frontend:**
   ```sh
   bun run dev
   ```

6. Open `http://localhost:3000` in your browser.

## API Routes

### Authentication(Coming Soon)
- `POST /auth/google` - Google Sign-In
- `POST /auth/facebook` - Facebook Sign-In

### Properties
- `GET /properties` - Get all properties
- `POST /properties` - Add a new property (Seller only)
- `PUT /properties/:id` - Edit property (Owner only)
- `DELETE /properties/:id` - Delete property (Owner only)

### Buyer-Seller Interaction
- `POST /contact/:propertyId` - Send buyer details to the seller
- `GET /saved-properties` - Get buyer's saved properties
- `POST /save-property/:id` - Save a property to favorites

## Project Structure
```
Apna_Ghar/
├── client/   # Frontend (React)
├── server/   # Backend (Node.js & Express)
├── README.md # Documentation
└── .gitignore
```

## UI Screenshot
![Apna Ghar UI](https://github.com/sandeep1404-praj/Apna_Ghar/blob/main/Screenshot%202025-02-19%20230013.png)

## Contributing
Feel free to contribute! Fork the repo and submit a pull request.

## License
This project is licensed under the MIT License.

---
**Developed by Sandeep Prajapati** 🚀
