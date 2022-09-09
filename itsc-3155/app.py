class BankAccount :
   def __init__(self, initialBalance) :
      self._balance = initialBalance
      self._transactionCount = 0
      
   def deposit(self, amount) :
      self._balance = self._balance + amount
      
   def withdraw(self, amount) :
      self._balance = self._balance - amount

   def getTransactionCount(self) :
      self._transactionCount =+ 1
      
   def getBalance(self) :
      return self._balance
      
   def endStatementPeriod(self) :
      self._transactionCount = 0