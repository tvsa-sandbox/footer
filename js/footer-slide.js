class FooterSlider {
    constructor(config) {
        const CONFIG = {
            track: "#PavilionTrack",
            buttons: "#PavilionButons",
            active: false,
            device: Utils.device,
            swipe: {
                direction: "",
                endX: 0,
                endY: 0,
                max_x: 20,
                max_y: 80,
                min_x: 20,
                min_y: 80,
                startX: 0,
                startY: 0,
            },
        };
        this.config = Object.assign(CONFIG, config);
        this.buildConfig();
    }

    buildConfig() {
        const { track, buttons, device, swipe } = this.config;
        const $TRACK = (track) ? document.querySelector(track) : null;
        const $BUTTONS = (buttons) ? document.querySelector(buttons) : null;
        if ($TRACK && $BUTTONS && device === "phone") {
            const ITEMS = $TRACK.children;
            const ITEM_SIZE = ITEMS[0].offsetWidth;
            this.config = {
                track: $TRACK,
                button: $BUTTONS.children,
                items: ITEMS.length - 1,
                itemSize: ITEM_SIZE,
                moveto: ITEM_SIZE / 100,
                active: true,
                position: 0,
            };
            const ACTIONS = [...$BUTTONS.children];
            ACTIONS.forEach((btn, index) => {
                btn.addEventListener("click", () => this.animateSlide(index));
            });
            Utils.touchAction = {
                callback: (direction) => {
                    const DIRECTIONS = ["left", "right"];
                    if (DIRECTIONS.includes(direction)) {
                        let { position } = this.config;
                        const { items } = this.config;
                        position = (direction === "left") ? +1 : -1;
                        if (position > 0 && position <= items) {
                            this.animateSlide(position);
                        }
                    }
                },
                track: $TRACK,
                swipe,
            };
        }
    }

    animateSlide(slide = 0) {
        const {
            active, itemSize, track,
            moveto, position, button,
        } = this.config;
        if (active) {
            const SIZE = itemSize * slide;
            const TIMER = setInterval(() => {
                if (slide === position) {
                    clearInterval(TIMER);
                } else {
                    if (slide > position) track.scrollLeft += moveto;
                    else {
                        track.scrollLeft -= moveto;
                        const TRACK = track.scrollLeft;
                        const TOTAL = SIZE - TRACK;
                        track.scrollLeft = (TOTAL === 1) ? SIZE : track.scrollLeft;
                    }

                    if (track.scrollLeft === SIZE) {
                        button[position].classList.remove("FooterTA__PavilionDot-Active");
                        button[position].classList.add("FooterTA__PavilionDot");
                        button[slide].classList.add("FooterTA__PavilionDot-Active");
                        this.config.position = slide;
                        clearInterval(TIMER);
                    }
                }
            }, 1);
        }
    }
}
