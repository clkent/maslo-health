import Component from 'core/component';
import { TweenLite } from 'gsap';

async function LoadModule() {
    const module = await import(/* webpackChunkName: "persona" */ './index.js');
    return module.default;
}

export default class MasloLoader extends Component {

    constructor(config) {
        super(config);

        // common properties
        this.autoAlpha = 1;
        this.scale = 1;
        this.zIndex = 0;
        this.x = 0;
        this.y = 0;
        // special properties
        this.width = 0;
        this.height = 0;

        this.flush = this.flush.bind(this);
    }

    _setup(config) {
        super._setup(config);

        const { onReady } = config;

        TweenLite.set(this._el, { autoAlpha: 0 });

        LoadModule()
            .then(Maslo => {
                TweenLite.to(this._el, 0.4, { autoAlpha: 1 });
                this._component = new Maslo({ el: this._el });

                this.flush();

                if (onReady) {
                    onReady(this);
                }
            });
    }

    get component() {
        return this._component;
    }

    get element() {
        return this._el;
    }

    flush() {
        TweenLite.set(this.element, {
            autoAlpha: this.autoAlpha,
            scale: this.scale,
            x: this.x,
            y: this.y,
            zIndex: this.zIndex,
        });

        if (this.component) {
            this.updateSize();
            this._setComponentSize();
        }
    }

    updateSize(force = false) {
        if (!this.component) {
            return;
        }

        if (!force && this.width && this.height) {
            return;
        }

        const rect = this.rect;

        this.width = rect.width;
        this.height = rect.height;

        if (force) {
            this._setComponentSize();
        }
    }

    _setComponentSize() {
        this.component.setSize(this.width, this.height);
    }
}
