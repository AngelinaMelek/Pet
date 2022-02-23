interface PaymentMethodInerface {
  pay(amount: number): void;
}
interface MoneyPaymentInerface {
  switchCurrency(currency: string): void;
}


class CashPaymentMethod implements PaymentMethodInerface, MoneyPaymentInerface {
  public pay(amount: number): void {
    console.log("amount " + amount);
  }
  switchCurrency(currency: string) {
    console.log("switched to " + currency);
  }
}

class GoldBarPaymentMethod implements PaymentMethodInerface {
  public pay(amount: number): void {
    console.log("amount " + amount);
  }
}
