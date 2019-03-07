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
        const {
            track, buttons,
            device, swipe,
        } = this.config;
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
                        position += (direction === "left") ? +1 : -1;
                        this.animateSlide(position);
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
            position, button, items,
        } = this.config;
        const STOP = (slide >= 0 && slide <= items);
        if (active && STOP) {
            const SIZE = itemSize * slide;
            const TRANSFORM = `transform: translate3d(-${SIZE}px, 0px, 0px);`;
            const TRANSITION = "transition:transform 500ms ease 0s";
            track.setAttribute("style", `${TRANSFORM} ${TRANSITION}`);
            button[position].classList.remove("FooterTA__PavilionDot-Active");
            button[position].classList.add("FooterTA__PavilionDot");
            button[slide].classList.add("FooterTA__PavilionDot-Active");
            this.config.position = slide;
        }
    }
}
