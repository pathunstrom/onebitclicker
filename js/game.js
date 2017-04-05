function Game() {
    this.currency = 0;
    this.ore = 0;
    this.depth = 0;
    this.density = 0;
    this.logistics = new Drone(this);

    this.advance_currency = (amount) => {
        this.currency += amount;
    };

    this.advance_ore = () => {
        this.ore += 1
    };

    this.advance_depth = () => {
        this.depth += 1
    };

    this.render = () => {
        set_display("ore", this.ore);
        set_display("depth", this.depth);
        set_display("currency", this.currency);
        window.requestAnimationFrame(this.render)
    };

    this.sell_my_shit = () => {
        if (this.logistics.home) {
            let load;
            if (this.ore < this.logistics.capacity) {
                load = this.ore;
            } else {
                load = this.logistics.capacity
            }
            this.ore -= load;
            this.logistics.travel_to_shop(load)
        }
    }
}

function Drone(game) {
    this.capacity = 10;
    this.load = 0;
    this.speed = 1;
    this.home = true;
    this.game = game;

    this.travel_to_shop = (load) => {
        this.home = false;
        this.load = load;
        window.setTimeout(this.arrive_home, (1000 - this.speed) * 2)
    };

    this.arrive_home = () => {
        this.home = true;
        this.game.advance_currency(this.load)
    }
}

function start_game() {
    let game = new Game();
    window.setInterval(game.advance_ore, 1000);
    window.setInterval(game.advance_depth, 10000);
    document.getElementById("sell").addEventListener("click", game.sell_my_shit);
    window.requestAnimationFrame(game.render)
}

function set_display(elementName, value) {
    let span = document.getElementById(elementName).querySelector(".display");
    if ('textContent' in span) {
        span.textContent = value
    } else {
        span.innerText = value
    }
}

window.addEventListener("load", start_game);
