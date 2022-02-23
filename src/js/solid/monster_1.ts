interface Tasks {
    handle: () => void
}

class GoToTheShop implements Tasks {
    public handle() {
        console.log("GoToTheShop");
    }
}
class FeedTheCat implements Tasks {
    public handle() {
        console.log("FeedTheCat");
    }
}

class LearnTS implements Tasks {
    public handle() {
        console.log("LearnTS");
    }
}

class TestClass implements Tasks {
    public handle() {
        console.log("test class");
    }
}

interface ComponentClass {
    new(): Tasks
}


class App {
    constructor(private tasks: ComponentClass[]) {
        this.tasks = tasks
    }
    public handler(): void {
        this.tasks.forEach(task => (new task()).handle())
    }
}

/*  client code */
const store: ComponentClass[] = [GoToTheShop, FeedTheCat, LearnTS, TestClass]
let app = new App(store)
app.handler();