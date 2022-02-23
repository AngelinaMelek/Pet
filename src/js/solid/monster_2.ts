
class OrderProcess {
    static perfom() {
        return (new OrderProcess).handle();
    }
    private handle() {
        this.checkCard().checkOrder().sendSms();
    }
    private checkCard() {
        console.log("checkCard");
        return this;
    }
    private checkOrder() {
        console.log("checkOrder");
        return this;
    }
    private sendSms() {
        console.log("sendSms");
        return this;
    }
}




class PurchasesController {
    public store() {
        OrderProcess.perfom();
    }
}

let purchases = new PurchasesController();
purchases.store();