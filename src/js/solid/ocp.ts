interface PaymentType {
    processPayment: () => void
}


class CashPayment implements PaymentType {
    processPayment() {
        console.log("cash");

    }
}
class CreditCartPayment implements PaymentType {
    processPayment() {
        console.log("credit-cart");

    }
}

const paymentsArr: PaymentType[] = [new CashPayment(), new CreditCartPayment()]

class Payment {
    public processPayment(payments: PaymentType[]) {
        payments.forEach(p => p.processPayment())
    }
}

let p = new Payment();
p.processPayment(paymentsArr)