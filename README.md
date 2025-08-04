# Medici Credit System

A double-entry accounting system built with Node.js, Express, and MongoDB using the [Medici](https://github.com/flash-oss/medici) library for robust financial transaction management.

## 📋 Overview

This project implements a credit system using double-entry bookkeeping principles. It provides a RESTful API for managing financial transactions with automatic journal entries, ensuring accurate accounting records and financial integrity.

## 🚀 Features

- **Double-Entry Bookkeeping**: Automatic debit/credit entries following accounting principles
- **MongoDB Integration**: Persistent storage for all financial records
- **Express API**: RESTful endpoints for transaction management
- **Journal Entries**: Detailed transaction logging with metadata support
- **Real-time Processing**: Immediate transaction processing and validation

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for transaction storage
- **Mongoose** - MongoDB object modeling
- **Medici** - Double-entry accounting library
- **dotenv** - Environment variable management

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running instance)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medici_credit_system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   PORT=4000
   USE_MEMORY_REPL_SET=false
   MONGODB_URI=mongodb://172.31.5.177:27017/?readPreference=primary&directConnection=true&ssl=false&authMechanism=DEFAULT
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run credit
   
   # Or standard start
   node server.js
   ```

## 🔧 Usage

### Basic Transaction Example

The system automatically creates journal entries when you make requests to the API endpoints.

**GET /** - Create a sample transaction
```bash
curl http://localhost:4000/
```

This endpoint demonstrates a basic transaction:
- **Debit**: Assets:Cash account with $1000
- **Credit**: Income account with $1000
- **Metadata**: Client information (Joe Blow)

### Response Format

```json
{
  "status": "success"
}
```

## 📊 Accounting Structure

### Chart of Accounts

The system supports standard accounting categories:

- **Assets** (Debit increases, Credit decreases)
  - Cash
  - Accounts Receivable
  - Inventory

- **Liabilities** (Credit increases, Debit decreases)
  - Accounts Payable
  - Loans Payable

- **Equity** (Credit increases, Debit decreases)
  - Owner's Equity
  - Retained Earnings

- **Income** (Credit increases, Debit decreases)
  - Sales Revenue
  - Service Income

- **Expenses** (Debit increases, Credit decreases)
  - Operating Expenses
  - Cost of Goods Sold

### Transaction Example

```javascript
const myBook = new Book("MyBook");
const journal = await myBook
  .entry("Received payment")
  .debit("Assets:Cash", 1000)
  .credit("Income", 1000, { client: "Joe Blow" })
  .commit();
```

## 🗄️ Database Schema

The Medici library automatically creates the following collections in MongoDB:

- **medici_transactions** - Individual transaction records
- **medici_journals** - Journal entry headers
- **medici_books** - Book/ledger definitions

## 🔍 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | Create sample transaction and return success status |

*Note: This is a basic implementation. Additional endpoints can be added for full CRUD operations.*

## 🚦 Development

### Scripts

```bash
# Start development server with auto-reload
npm run credit

# Run tests (not implemented yet)
npm test
```

### Adding New Endpoints

To add new transaction endpoints, follow this pattern:

```javascript
app.post('/transaction', async (req, res) => {
  try {
    const { description, debitAccount, creditAccount, amount, metadata } = req.body;
    
    const myBook = new Book("MyBook");
    const journal = await myBook
      .entry(description)
      .debit(debitAccount, amount)
      .credit(creditAccount, amount, metadata)
      .commit();
      
    res.status(200).json({ 
      status: "success", 
      journalId: journal._id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## 🧪 Testing

Currently, no tests are implemented. To add testing:

1. Install testing framework:
   ```bash
   npm install --save-dev jest supertest
   ```

2. Update package.json test script:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```

## 🔒 Security Considerations

- **Database Security**: Ensure MongoDB is properly secured in production
- **Input Validation**: Add validation for all transaction inputs
- **Authentication**: Implement user authentication for production use
- **Environment Variables**: Keep sensitive data in environment variables

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   ```env
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=your-production-mongodb-uri
   ```

2. **Process Management**
   Consider using PM2 for production:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "medici-credit-system"
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the [Medici documentation](https://github.com/flash-oss/medici)
- Review MongoDB connection troubleshooting guides

## 🔗 Related Resources

- [Medici Library Documentation](https://github.com/flash-oss/medici)
- [Double-Entry Bookkeeping Principles](https://en.wikipedia.org/wiki/Double-entry_bookkeeping)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

**Note**: This is a development version. Ensure proper security measures and testing before deploying to production.