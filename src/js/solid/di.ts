{
  interface PaymentMethod {
    process: () => void
  }

  class TransferPaymentMethod implements PaymentMethod {
    public process() {
      console.log("do transfer");
    }
  }

  class BitcointPaymentMethod implements PaymentMethod {
    public process() {
      console.log("do bitcoin");
    }
  }

  class Transaction {
    constructor(private paymentMethod: PaymentMethod) {
      this.paymentMethod = paymentMethod
    }
    public pay() {
      this.paymentMethod.process();
    }
  }

  let transferMethod: PaymentMethod = new TransferPaymentMethod();
  let bitcoinMethod: PaymentMethod = new BitcointPaymentMethod();

  let transaction = new Transaction(transferMethod);
  let transaction1 = new Transaction(bitcoinMethod);

  transaction.pay()
  transaction1.pay()
}

{
  interface DbConnection {
    connect: () => void
  }

  class MySQLConnection implements DbConnection {
    public connect() {
      console.log("Connect to MySQL");

    }
  }

  class PostgreSQLConnection implements DbConnection {
    public connect() {
      console.log("Connect to PostgreSQL");

    }
  }

  class PasswordReminder {
    constructor(private dbConnection: DbConnection) {
      this.dbConnection = dbConnection
      this.dbConnection.connect();
    }
  }

  let mySql = new MySQLConnection();
  let pgSql = new PostgreSQLConnection();

  new PasswordReminder(mySql)
  new PasswordReminder(pgSql)
}