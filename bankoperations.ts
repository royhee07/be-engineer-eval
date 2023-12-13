class Account {
    private readonly token: string;
    private readonly name: string;
    private balance: number;
  
    constructor(token: string, name: string) {
      this.token = token;
      this.name = name;
      this.balance = 0;
    }
  
    deposit(amount: number): void {
      if (amount <= 0) {
        throw new Error('Deposit amount should be greater than zero');
      }
      this.balance += amount;
      console.log(`Deposited ${amount} into ${this.name}'s account. New balance: ${this.balance}`);
    }
  
    withdraw(amount: number): void {
      if (amount <= 0) {
        throw new Error('Withdrawal amount should be greater than zero');
      }
      if (amount > this.balance) {
        throw new Error('Insufficient funds');
      }
      this.balance -= amount;
      console.log(`Withdrawn ${amount} from ${this.name}'s account. New balance: ${this.balance}`);
    }
  
    getBalance(): number {
      return this.balance;
    }
  
    getAccountDetails(): string {
      return `Account Name: ${this.name}, Balance: ${this.balance}`;
    }
  }
  
  class Bank {
    private readonly accounts: Map<string, Account>;
  
    constructor() {
      this.accounts = new Map<string, Account>();
    }
  
    createAccount(token: string, name: string): void {
      if (!this.isValidToken(token)) {
        throw new Error('Invalid token. Token must be alphanumeric');
      }
      const newAccount = new Account(token, name);
      this.accounts.set(token, newAccount);
      console.log(`Account created for ${name} with token: ${token}`);
    }
  
    removeAccount(token: string): void {
      if (!this.accounts.has(token)) {
        throw new Error('Account not found');
      }
      this.accounts.delete(token);
      console.log(`Account with token ${token} removed`);
    }
  
    getAccount(token: string): Account {
      const account = this.accounts.get(token);
      if (!account) {
        throw new Error('Account not found');
      }
      return account;
    }
  
    private isValidToken(token: string): boolean {
      return /^[a-zA-Z0-9]+$/.test(token);
    }
  
    getAccountWithHighestBalance(): Account | null {
        let highestBalanceAccount: Account | null = null;
        let maxBalance = -Infinity;
    
        for (const account of this.accounts.values()) {
          if (account.getBalance() > maxBalance) {
            maxBalance = account.getBalance();
            highestBalanceAccount = account;
          }
        }
    
        return highestBalanceAccount;
      }
  }
  
  // Usage
  
  const bank = new Bank();
  
  // Creating 20 accounts
  for (let i = 1; i <= 20; i++) {
    const token = `token${i}`;
    const name = `User${i}`;
    bank.createAccount(token, name);
  }
  
  // Accessing accounts and performing operations
  for (let i = 1; i <= 15; i++) {
    const accountNumber = Math.floor(Math.random() * 20) + 1;
    const token = `token${accountNumber}`;
    const currentAccount = bank.getAccount(token);
  
    const depositAmount = Math.floor(Math.random() * 100) + 1;
    const withdrawAmount = Math.floor(Math.random() * 50) + 1;
  
    currentAccount.deposit(depositAmount);
    currentAccount.withdraw(withdrawAmount);
  }
  
  // Finding and printing the account with the highest balance
  const highestBalanceAccount = bank.getAccountWithHighestBalance();
  if (highestBalanceAccount) {
    console.log('Account with highest balance:');
    console.log(highestBalanceAccount.getAccountDetails());
  } else {
   console.log('No accounts found');
  }