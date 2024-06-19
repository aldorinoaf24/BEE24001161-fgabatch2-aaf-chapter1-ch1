class BankAccount {
    static define(startingBalance) {
        this.balance = startingBalance || 0;
        return this.balance;
    }

    static deposit(amount) {
        this.balance = tambahSaldo(this.balance, amount);
        return this.balance;
    }

    static withdraw(amount) {
        this.balance = kurangiSaldo(this.balance, amount);
        return this.balance;
    }
}

function init(startingBalance, typeOperation) {
    let saldo = startingBalance;
    if (isNaN(saldo) || saldo < 0) {
        alert("Please enter a number or a positive number.");
        return init(queries("Enter starting balance", true), typeOperation);
    }

    if (!typeOperation) {
        typeOperation = queries("Enter operation: start deposit (start), deposit, withdraw, or stop");
        if (typeOperation === "start") {
            return init(queries("Enter starting balance", true), "");
        }
    }

    saldo = BankAccount.define(saldo);

    if (typeOperation === "stop" || !typeOperation) {
        alert(`Your final balance is ${saldo}.`);
        return;
    }

    if (typeOperation === "deposit") {
        let deposit = queries("Enter amount to deposit", true);
        if (isNaN(deposit) || deposit < 0) {
            alert("Please enter a number or a positive number.");
            return init(saldo, typeOperation);
        }
        saldo = BankAccount.deposit(deposit);
    } else if (typeOperation === "withdraw") {
        let withdraw = queries("Enter amount to withdraw", true);
        if (isNaN(withdraw) || withdraw < 0 || withdraw > saldo) {
            alert(`Please enter a number, a positive number, or a number less than your balance. Your balance is ${saldo}.`);
            return init(saldo, typeOperation);
        }
        saldo = BankAccount.withdraw(withdraw);
    } else {
        alert("Please enter 'deposit', 'withdraw', or 'stop'.");
        return init(saldo, queries("Enter another operation: deposit, withdraw, or stop"));
    }

    alert(`Your new balance is ${saldo}.`);
    typeOperation = queries("Enter another operation: deposit, withdraw, or stop");
    return init(saldo, typeOperation);
}

init(queries("Enter starting balance", true), "");

function tambahSaldo(balance, deposit) {
    return balance + deposit;
}

function kurangiSaldo(balance, withdraw) {
    return balance - withdraw;
}

function queries(query, typeQuery) {
    let result;
    if (typeQuery) {
        result = +window.prompt(query);
    } else {
        result = window.prompt(query);
    }
    return result;
}
