/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as THREE from 'three';
import Chroma from 'chroma-js';
import {
    TweenMax, TimelineMax,
    Elastic, RoughEase, Back, Power0, Power2, Power3, Power4,
} from 'gsap';

import personaStore from './store/persona';

import {
    MOODS,
} from './moods';

TweenMax.ticker.useRAF(true);

const Reactions = {
    init() {

        for (let i = 0; i < this.rings.length; i++) {
            this.rings[i].theta = 3 * this.rings[i].seed.z;
            const startScale = 1 - (i + 2) * 0.1;

            TweenMax.fromTo(this.rings[i].scale, 2.3, {
                x: startScale,
                y: startScale,
            }, {
                x: 1,
                y: 1,
                ease: Elastic.easeOut.config(1, 0.3),
                delay: (i / this.rings.length) / 2,
            });
            TweenMax.fromTo(this.rings[i], 0.2, {
                opacity: 0,
            }, {
                opacity: 1,
                delay: (i / this.rings.length) / 2,
            });
            TweenMax.fromTo(this.rings[i], 2, {
                theta: this.rings[i].theta,
            }, {
                theta: i * 0.01,
                delay: 0.8,
                ease: Elastic.easeOut.config(1, 0.6),
            });
            TweenMax.fromTo(this.rings[i], 2, {
                gaussIt: this.rings[i].gaussIt,
                weightIn: this.rings[i].weightIn,
                intensity: this.rings[i].intensity,
                osc: this.rings[i].osc,
            }, {
                gaussIt: 0.98,
                weightIn: 1,
                intensity: 0.21,
                osc: 0.06,
                delay: 0.8,
                ease: Power4.easeOut,
            });

            const tl = new TimelineMax({
                onComplete: () => { personaStore.mood = MOODS.IDLE; },
            });
            tl.to(this.rings[i].hsl, 0.1, {
                x: this.rings[i].originalColor.x,
                y: this.rings[i].originalColor.y,
                z: this.rings[i].originalColor.z,
                delay: 2,
                ease: Power3.easeOut,
            });
        }
    },

    idle() {
        const moods = {
            JOY: 0,
            HAPPY: 0,
            // surprise: 0,
            // terror: 0,
            SAD: 0,
            ANGER: 0,
            // sleepy: 0,
            // calm: 0,
        };
        const globalMods = {};
        const globalModifiers = {
            JOY: {
                timeInc: 0.15,
            },
            HAPPY: {
                timeInc: 0.15,
                modifierTimestep: 0.003,
            },
            // surprise: {
            //   timeInc: 0.05
            // },
            ANGER: {
                timeInc: 0.1,
                modifierTimestep: 0.03,
            },
            SAD: {
                timeStep: -0.004,
            },
        };

        for (const mood in moods) {
            if (globalModifiers[mood]) {
                for (const modifier in globalModifiers[mood]) {
                    if (!globalMods[modifier]) globalMods[modifier] = 0;
                    globalMods[modifier] += globalModifiers[mood][modifier] * moods[mood];
                }
            }
        }

        for (let i = 0; i < this.rings.length; i++) {
            const ringMods = {};

            const n = this.simplex.noise2D(i / 8 * 10, this.modifierTime);
            const n2 = this.simplex.noise2D(this.modifierTime, i / 8 * 10);

            const ringModifiers = {
                JOY: {
                    gaussIt: -0.98,
                    weightIn: -0.9,
                    theta: i / 8,
                    intensity: 2,
                    osc: 0.04,
                },
                HAPPY: {
                    gaussIt: -0.98,
                    weightIn: -0.9,
                    theta: i / 8,
                    intensity: 1,
                    osc: 0.04,
                    scaleInc: 0,
                    positionX: 0.2 + 0.01 * i * Math.sin(Math.PI * 2 * this.modifierTime),
                    positionY: 0.2 + 0.01 * i * Math.cos(Math.PI * 2 * this.modifierTime),
                },
                // surprise: {
                //   gaussIt: -0.98,
                //   weightIn: -0.3,
                //   intensity: 2,
                //   theta: i / 8,
                //   osc: 0.03,
                //   scaleInc: 0.15 * ((8 - i) / 8)
                // },
                ANGER: {
                    gaussIt: -0.98,
                    weightIn: -0.9,
                    rotation: i / 8,
                    intensity: 0.8,
                    osc: 0.1,
                    scaleInc: 0.1 * ((8 - i) / 16),
                    positionX: n * 0.1,
                    positionY: n2 * 0.1,
                },
                SAD: {
                    gaussIt: -0.8,
                    weightIn: -0.2,
                    osc: 0.04,
                },
            };

            for (const mood in moods) {
                if (ringModifiers[mood]) {
                    for (const modifier in ringModifiers[mood]) {
                        if (!ringMods[modifier]) ringMods[modifier] = 0;
                        ringMods[modifier] += ringModifiers[mood][modifier] * moods[mood];
                    }
                }
            }

            this.rings[i].gaussIt = 0.98 + ringMods.gaussIt;
            this.rings[i].weightIn = 1 + ringMods.weightIn;
            this.rings[i].intensity = 0.21 + ringMods.intensity;
            this.rings[i].theta = i * 0.01 + ringMods.theta;
            this.rings[i].osc = 0.06 + ringMods.osc;
            this.rings[i].scaleInc = new THREE.Vector3(
                ringMods.scaleInc,
                ringMods.scaleInc,
                0,
            );
            this.rings[i].position.x = ringMods.positionX;
            this.rings[i].position.y = ringMods.positionY;
        }

        this.timeInc = 0.005 + globalMods.timeInc;
        this.modifierTimestep = globalMods.modifierTimestep;
    },

    hey() {
        for (let i = 0; i < this.rings.length; i++) {
            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], 0.5, {
                gaussIt: 0.83,
                weightIn: 0.03,
                intensity: 0.45,
                osc: 0.34,
                theta: Math.random() / 2,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], 0.6, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    intensity: 0.21,
                    osc: 0.06,
                    theta: i * 0.01,
                    ease: Power3.easeOut,
                });
        }

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, 1, {
            timeInc: 0.1,
            ease: Power3.easeOut,
        })
            .to(this, 1, {
                timeInc: 0.01,
                delay: 0.5,
                ease: Power3.easeOut,
            });
    },

    anxiety() {
        const colors = [null, null, null, Chroma.hsv(58, 0.48, 1), Chroma.hsv(43, 0.61, 1), Chroma.hsv(350, 0.64, 0.98), Chroma.hsv(289, 0.45, 0.38), Chroma.hsv(277, 0.46, 0.32)];

        for (let i = 0; i < this.rings.length; i++) {
            if (colors[i]) {
                const color = colors[i].hsl();

                const tl0 = new TimelineMax();
                tl0.to(this.rings[i].hsl, 0.6, {
                    x: color[0],
                    y: color[1],
                    z: color[2],
                    ease: Power3.easeOut,
                })
                    .to(this.rings[i].hsl, 0.3, {
                        x: this.rings[i].originalColor.x,
                        y: this.rings[i].originalColor.y,
                        z: this.rings[i].originalColor.z,
                        delay: 0.3,
                        ease: Power3.easeOut,
                    });
            }

            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], 0.6, {
                gaussIt: 0,
                weightIn: 0.1,
                intensity: 3,
                osc: 0.1,
                theta: Math.random() / 2,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], 0.3, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    intensity: 0.05,
                    osc: 0.06,
                    theta: i * 0.01,
                    delay: 0.3,
                    ease: Power3.easeOut,
                });
        }

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, 1, {
            timeInc: 0.5,
            ease: Power3.easeOut,
        })
            .to(this, 1, {
                timeInc: 0.01,
                delay: 0,
                ease: Power3.easeOut,
            });
    },

    joy() {
        const expandTimeOn = 0.5;
        const expandTimeOff = 0.5;
        const expandSpread = 0.2;
        const expandScale = 0.9;
        const returnDelay = 0.4;

        for (let i = 0; i < this.rings.length; i++) {
            const ring = this.rings[i];
            const theta = (Math.sign(this.rings[i].seed.z) > 0) ? (2 + i * 0.01) : (-2 + i * 0.01);

            const tl = new TimelineMax();
            tl.to(this.rings[i].position, expandTimeOn, {
                x: expandSpread,
                y: expandSpread,
                ease: Power2.easeOut,
            })
                .to(this.rings[i].position, expandTimeOff, {
                    x: 0,
                    y: 0,
                    delay: returnDelay + ((this.rings.length - i) / this.rings.length) / 2,
                    ease: Power2.easeOut,
                });

            const tl2 = new TimelineMax();
            tl2.fromTo(this.rings[i].scale, expandTimeOn, {
                x: this.rings[i].scale.x,
                y: this.rings[i].scale.y,
            }, {
                x: expandScale,
                y: expandScale,
                ease: Back.easeOut.config(1.7),
            })
                .to(this.rings[i].scale, expandTimeOff, {
                    x: 1,
                    y: 1,
                    delay: returnDelay + ((this.rings.length - i) / this.rings.length) / 2,
                    ease: Back.easeOut.config(1.7),
                });

            const tl3 = new TimelineMax();
            tl3.to(this.rings[i], 2, {
                theta,
                ease: Power4.easeOut,
                delay: ((this.rings.length - i) / this.rings.length) / 2,
            })
                .to(this.rings[i], 0, {
                    theta: i * 0.01,
                });

            const tl4 = new TimelineMax().eventCallback('onComplete', () => {
                personaStore.mood = MOODS.RESET;
            });
            tl4.to(this.rings[i], 0.6, {
                gaussIt: 0.5,
                weightIn: 0.2,
                intensity: 0.6,
                osc: 0.36,
                ease: Power4.easeOut,
            })
                .to(this.rings[i], 0.6, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    intensity: 0.21,
                    osc: 0.06,
                    ease: Power4.easeOut,
                });
        }
    },

    surprise() {
        for (let i = 0; i < this.rings.length; i++) {
            const tl0 = new TimelineMax();
            tl0.to(this.rings[i], 2, {
                gaussIt: 0,
                weightIn: 0.3,
                osc: 0.2,
                ease: RoughEase.ease.config({
                    template: Power0.easeNone,
                    strength: 0.3,
                    points: 3,
                    taper: 'none',
                    randomize: true,
                    clamp: false,
                }),
            })
                .to(this.rings[i], 2, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    osc: 0.06,
                    ease: Power4.easeOut,
                });

            const tl2 = new TimelineMax();
            tl2.to(this.rings[i].scale, 0.3, {
                x: 1.1 + (this.rings.length - i) / 500,
                y: 1.1 + (this.rings.length - i) / 500,
                delay: ((i) / this.rings.length) / 2 / 2,
                ease: Back.easeOut.config(1.7),
            })
                .to(this.rings[i].scale, 0.3, {
                    x: 1,
                    y: 1,
                    delay: 1.6 + ((this.rings.length - i) / this.rings.length) / 2 / 2,
                    ease: Back.easeOut.config(1.7),
                });
        }

        const tl1 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl1.fromTo(this, 0.3, {
            timeInc: this.timeInc,
        }, {
            timeInc: 0.3,
            ease: Power3.easeOut,
        })
            .to(this, 0.2, {
                timeInc: 0.01,
                delay: 1.65,
                ease: Power3.easeIn,
            });
    },

    anger() {
        const colors = [null, null, null, Chroma.hsv(3, 0.76, 0.94), Chroma.hsv(352, 0.80, 0.79), Chroma.hsv(337, 0.98, 0.51), Chroma.hsv(325, 1, 0.33), Chroma.hsv(302, 0.62, 0.18)];

        for (let i = 0; i < this.rings.length; i++) {
            if (colors[i]) {
                const color = colors[i].hsl();
                const tl0 = new TimelineMax();
                tl0.to(this.rings[i].hsl, 0.3, {
                    x: color[0],
                    y: color[1],
                    z: color[2],
                    ease: Power3.easeOut,
                })
                    .to(this.rings[i].hsl, 0.2, {
                        x: this.rings[i].originalColor.x,
                        y: this.rings[i].originalColor.y,
                        z: this.rings[i].originalColor.z,
                        delay: 2,
                        ease: Power3.easeOut,
                    });
            }

            const tl0 = new TimelineMax();
            tl0.to(this.rings[i], 2, {
                gaussIt: 0,
                weightIn: 0.3,
                osc: 0.2,
                ease: RoughEase.ease.config({
                    template: Power0.easeNone,
                    strength: 0.3,
                    points: 3,
                    taper: 'none',
                    randomize: true,
                    clamp: false,
                }),
            })
                .to(this.rings[i], 2, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    osc: 0.06,
                    ease: Power4.easeOut,
                });

            const tl2 = new TimelineMax();
            tl2.to(this.rings[i].scale, 0.3, {
                x: 1.1 + (this.rings.length - i) / 500,
                y: 1.1 + (this.rings.length - i) / 500,
                delay: ((i) / this.rings.length) / 2 / 2,
                ease: Back.easeOut.config(1.7),
            })
                .to(this.rings[i].scale, 0.3, {
                    x: 1,
                    y: 1,
                    delay: 1.6 + ((this.rings.length - i) / this.rings.length) / 2 / 2,
                    ease: Back.easeOut.config(1.7),
                });
        }

        const tl1 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl1.fromTo(this, 0.3, {
            timeInc: this.timeInc,
        }, {
            timeInc: 0.3,
            ease: Power3.easeOut,
        })
            .to(this, 0.2, {
                timeInc: 0.01,
                delay: 1.65,
                ease: Power3.easeIn,
            });
    },

    reset() {
        this.setOriginalRingChroma();

        for (let i = 0; i < this.rings.length; i++) {
            const tl0 = new TimelineMax();
            tl0.to(this.rings[i].hsl, 0.3, {
                x: this.rings[i].originalColor.x,
                y: this.rings[i].originalColor.y,
                z: this.rings[i].originalColor.z,
                ease: Power3.easeOut,
            });
        }
    },

    snooze() {
        const colors = [
            null,
            null,
            null,
            Chroma.hsv(165, 0.98, 1.00),
            Chroma.hsv(179, 0.95, 0.91),
            Chroma.hsv(192, 1.00, 1.00),
            Chroma.hsv(205, 0.95, 0.91),
            Chroma.hsv(218, 0.95, 1.00),
        ];

        for (let i = 0; i < this.rings.length; i++) {
            if (colors[i]) {
                const color = colors[i].hsl();
                const tl0 = new TimelineMax();
                tl0.to(this.rings[i].hsl, 0.4, {
                    x: color[0],
                    y: color[1],
                    z: color[2],
                    ease: Power3.easeOut,
                });
            }

            const tl1 = new TimelineMax({
                repeat: 3,
            });
            tl1.to(this.rings[i], 2, {
                gaussIt: 0,
                weightIn: 0.3,
                osc: 0.2,
                ease: RoughEase.ease.config({
                    template: Power0.easeNone,
                    strength: 0.3,
                    points: 3,
                    taper: 'none',
                    randomize: true,
                    clamp: false,
                }),
            })
                .to(this.rings[i], 2, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    osc: 0.06,
                    ease: Power4.easeOut,
                });

            const tl2 = new TimelineMax();
            tl2.to(this.rings[i].scale, 0.3, {
                x: 1.1 + (this.rings.length - i) / 500,
                y: 1.1 + (this.rings.length - i) / 500,
                delay: ((i) / this.rings.length) / 2 / 2,
                ease: Back.easeOut.config(1.7),
            })
                .to(this.rings[i].scale, 0.3, {
                    x: 1,
                    y: 1,
                    delay: 1.6 + ((this.rings.length - i) / this.rings.length) / 2 / 2,
                    ease: Back.easeOut.config(1.7),
                });
        }

        const tl3 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        }).repeat(3);
        tl3.fromTo(this, 0.3, {
            timeInc: this.timeInc,
        }, {
            timeInc: 0.3,
            ease: Power3.easeOut,
        })
            .to(this, 0.2, {
                timeInc: 0.01,
                delay: 1.65,
                ease: Power3.easeIn,
            });
    },

    sadness() {
        const timeIn = 1.5;
        const timeOut = 1;
        const delayInOut = 1;

        for (let i = 0; i < this.rings.length; i++) {
            let tl0 = new TimelineMax();
            const originalColor = Chroma.hsl(this.rings[i].originalColor.x, this.rings[i].originalColor.y, this.rings[i].originalColor.z).desaturate(1).hsl();
            tl0.to(this.rings[i].hsl, 0.3, {
                x: originalColor[0],
                y: originalColor[1],
                z: originalColor[2],
                ease: Power3.easeOut,
            })
                .to(this.rings[i].hsl, 0.2, {
                    x: this.rings[i].originalColor.x,
                    y: this.rings[i].originalColor.y,
                    z: this.rings[i].originalColor.z,
                    delay: 2.5,
                    ease: Power3.easeOut,
                });

            tl0 = new TimelineMax();
            tl0.to(this.rings[i].scale, timeIn, {
                x: 0.8 + (-i) * 0.03,
                y: 0.8 + (-i) * 0.03,
                ease: Elastic.easeOut.config(1, 0.3),
                delay: (1 - (i / this.rings.length)) / 2,
            })
                .to(this.rings[i].scale, timeOut, {
                    x: 1,
                    y: 1,
                    delay: delayInOut,
                    ease: Power4.easeOut,
                });

            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], timeIn, {
                gaussIt: 0.2,
                theta: 0,
                ease: Elastic.easeOut.config(1, 0.3),
            })
                .to(this.rings[i], timeOut, {
                    gaussIt: 0.98,
                    theta: i * 0.01,
                    delay: delayInOut,
                    ease: Elastic.easeOut.config(1, 0.3),
                });
        }

        const tl3 = new TimelineMax({
            onComplete: function () {
                this.stateRotation = 0;
            }.bind(this),
        });
        tl3.to(this, timeIn, {
            stateRotation: 1.5 + Math.random(),
            ease: Power3.easeOut,
        })
            .to(this, timeOut, {
                stateRotation: 3,
                delay: delayInOut,
                ease: Power3.easeOut,
            });

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, timeIn, {
            timeInc: 0.002,
            ease: Power3.easeOut,
        })
            .to(this, timeOut, {
                timeInc: 0.01,
                ease: Power3.easeOut,
            });
    },

    love() {
        for (let i = 0; i < this.rings.length; i++) {
            const tl0 = new TimelineMax();
            tl0.to(this.rings[i].scale, 0.2, {
                x: 1.1,
                y: 1.1,
                ease: Power3.easeOut,
            })
                .to(this.rings[i].scale, 1.2, {
                    x: 1,
                    y: 1,
                    delay: 1.57,
                    ease: Elastic.easeOut.config(1, 0.4),
                });

            const tl5 = new TimelineMax();
            tl5.to(this.rings[i].position, 0.2, {
                x: 0.05 * Math.cos(Math.random() * 2 * Math.PI),
                y: 0.05 * Math.sin(Math.random() * 2 * Math.PI),
                ease: Power3.easeOut,
            })
                .to(this.rings[i].position, 1.2, {
                    x: 0,
                    y: 0,
                    delay: 1.57,
                    ease: Elastic.easeOut.config(1, 0.4),
                });

            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], 0.1, {
                gaussIt: 0.1,
                weightIn: 0.5,
                intensity: 1,
                osc: 0.1,
                theta: Math.random() * this.rings[i].seed.z,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], 1.2, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    intensity: 0.21,
                    osc: 0.06,
                    theta: i * 0.01,
                    ease: Power3.easeOut,
                    delay: 1.55,
                });
        }

        const tl3 = new TimelineMax({
            onComplete: function () {
                this.stateRotation = 0;
            }.bind(this),
        });
        tl3.to(this, 1.2, {
            stateRotation: -1,
            ease: Power3.easeOut,
        });
        tl3.to(this, 2.0, {
            stateRotation: 0,
            ease: Power3.easeInOut,
        });

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, 0.2, {
            timeInc: 0.1,
            ease: Power3.easeOut,
        })
            .to(this, 1, {
                timeInc: 0.01,
                delay: 3,
                ease: Power3.easeOut,
            });
    },

    content() {
        const colors = [
            null,
            null,
            null,
            Chroma.hsv(165, 0.98, 1.00),
            Chroma.hsv(179, 0.95, 0.91),
            Chroma.hsv(192, 1.00, 1.00),
            Chroma.hsv(205, 0.95, 0.91),
            Chroma.hsv(218, 0.95, 1.00),
        ];

        for (let i = 0; i < this.rings.length; i++) {
            if (colors[i]) {
                const color = colors[i].hsl();
                const tl01 = new TimelineMax();
                tl01.to(this.rings[i].hsl, 0.4, {
                    x: color[0],
                    y: color[1],
                    z: color[2],
                    ease: Power3.easeOut,
                })
                    .to(this.rings[i].hsl, 0.4, {
                        x: this.rings[i].originalColor.x,
                        y: this.rings[i].originalColor.y,
                        z: this.rings[i].originalColor.z,
                        delay: 2.5,
                        ease: Power3.easeOut,
                    });
            }

            const tl0 = new TimelineMax();
            tl0.to(this.rings[i].scale, 0.2, {
                x: 1.1,
                y: 1.1,
                ease: Power3.easeOut,
            })
                .to(this.rings[i].scale, 1.2, {
                    x: 1,
                    y: 1,
                    delay: 1.57,
                    ease: Elastic.easeOut.config(1, 0.4),
                });

            const tl5 = new TimelineMax();
            tl5.to(this.rings[i].position, 0.2, {
                x: 0.05 * Math.cos(Math.random() * 2 * Math.PI),
                y: 0.05 * Math.sin(Math.random() * 2 * Math.PI),
                ease: Power3.easeOut,
            })
                .to(this.rings[i].position, 1.2, {
                    x: 0,
                    y: 0,
                    delay: 1.57,
                    ease: Elastic.easeOut.config(1, 0.4),
                });

            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], 0.1, {
                gaussIt: 0.1,
                weightIn: 0.5,
                intensity: 1,
                osc: 0.1,
                theta: Math.random() * this.rings[i].seed.z,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], 1.2, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    intensity: 0.21,
                    osc: 0.06,
                    theta: i * 0.01,
                    ease: Power3.easeOut,
                    delay: 1.55,
                });
        }

        const tl3 = new TimelineMax({
            onComplete: function () {
                this.stateRotation = 0;
            }.bind(this),
        });
        tl3.to(this, 2.4, {
            stateRotation: -1,
            ease: Power3.easeOut,
        });
        tl3.to(this, 0.8, {
            stateRotation: 0,
            ease: Power3.easeOut,
        });

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, 0.2, {
            timeInc: 0.1,
            ease: Power3.easeOut,
        })
            .to(this, 1, {
                timeInc: 0.01,
                delay: 3,
                ease: Power3.easeOut,
            });
    },

    apathy() {
        for (let i = 0; i < this.rings.length; i++) {

            const tl0 = new TimelineMax();
            const originalColor = Chroma.hsl(this.rings[i].originalColor.x, this.rings[i].originalColor.y, this.rings[i].originalColor.z).desaturate(3).hsl();
            tl0.to(this.rings[i].hsl, 0.3, {
                x: originalColor[0],
                y: originalColor[1],
                z: originalColor[2],
                ease: Power3.easeOut,
            })
                .to(this.rings[i].hsl, 0.2, {
                    x: this.rings[i].originalColor.x,
                    y: this.rings[i].originalColor.y,
                    z: this.rings[i].originalColor.z,
                    delay: 3,
                    ease: Power3.easeOut,
                });

            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], 2, {
                gaussIt: 0.1,
                weightIn: 0.8,
                shadowSpread: 0.03,
                theta: Math.random() * this.rings[i].seed.z,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], 2, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    shadowSpread: 0.01,
                    theta: i * 0.01,
                    ease: Power3.easeOut,
                    delay: 1,
                });
        }

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, 0.5, {
            timeInc: 0,
            ease: Power3.easeOut,
        })
            .to(this, 2, {
                timeInc: 0.01,
                delay: 1.5,
                ease: Power3.easeOut,
            });
    },

    tap() {
        for (let i = 0; i < this.rings.length; i++) {
            const tl1 = new TimelineMax().eventCallback('onComplete', () => {
                personaStore.mood = MOODS.RESET;
            });

            tl1.to(this.rings[i].scale, 0.1, {
                x: 0.9,
                y: 0.9,
                ease: Elastic.easeOut.config(1, 0.3),
                delay: ((this.rings.length - i) / this.rings.length) / 20,
            })
                .to(this.rings[i].scale, 0.1, {
                    x: 0.8,
                    y: 0.8,
                    ease: Elastic.easeOut.config(1, 0.3),
                    delay: ((this.rings.length - i) / this.rings.length) / 20,
                })
                .to(this.rings[i].scale, 0.15, {
                    x: 0.75,
                    y: 0.75,
                })
                .to(this.rings[i].scale, 1.1, {
                    x: 1,
                    y: 1,
                    ease: Elastic.easeOut.config(1, 0.3),
                    delay: (i / this.rings.length) / 5,
                });
        }
    },

    pinch() {
        TweenMax.to(this.scale, 1.9, {
            x: 1,
            y: 1,
            ease: Elastic.easeOut.config(1, 0.4),
        });
    },

    listening() {
        personaStore.isListening = true;
        personaStore.listenTls = [];

        for (let i = 0; i < this.rings.length; i++) {
            const ring = this.rings[i];
            const theta = -Math.PI / 12 - i * 0.001;

            personaStore.listenTls[i] = new TimelineMax();
            personaStore.listenTls[i].to(this.rings[i], 1, {
                theta,
                gaussIt: 0.8,
                weightIn: 0.6,
                intensity: 0.3,
                osc: 0.14,
                ease: Power4.easeOut,
                delay: ((this.rings.length - i) / this.rings.length) / 2,
            });
        }

        personaStore.listenTl2 = new TimelineMax({
            onComplete: () => { personaStore.isListening = false; },
        });
        personaStore.listenTl2.to(this, 1, {
            timeInc: 0.05,
            ease: Power3.easeOut,
        });
    },

    listeningEnd() {
        if (personaStore.isListening) {
            for (let i = 0; i < this.rings.length; i++) this.listenTls[i].stop();
            personaStore.listenTl2.stop();
            personaStore.isListening = false;
        }

        for (let i = 0; i < this.rings.length; i++) {
            const tl = new TimelineMax().eventCallback('onComplete', () => {
                personaStore.mood = MOODS.RESET;
            });
            tl.to(this.rings[i], 0.4, {
                gaussIt: 0.98,
                weightIn: 1,
                intensity: 0.21,
                osc: 0.06,
                delay: ((this.rings.length - i) / this.rings.length) / 20,
            });

            const tl2 = new TimelineMax();
            tl2.to(this.rings[i], 1, {
                theta: i * 0.01,
                delay: ((this.rings.length - i) / this.rings.length) / 20,
                ease: Elastic.easeOut.config(1, 0.8),
            });
        }

        const tl2 = new TimelineMax();
        tl2.to(this, 0.4, {
            timeInc: 0.01,
            ease: Power3.easeOut,
        });
    },

    question() {
        const timeIn = 0.4;
        const delay = 0.4;
        const timeOut = 0.6;

        for (let i = 0; i < this.rings.length; i++) {
            const tl = new TimelineMax({
                onComplete: () => { personaStore.mood = MOODS.RESET; },
            });
            tl.to(this.rings[i].scale, timeIn, {
                x: 1 + (i - this.rings.length) * 0.01,
                y: 1 + (i - this.rings.length) * 0.01,
                ease: Power3.easeOut,
            })
                .to(this.rings[i].scale, timeOut, {
                    x: 1,
                    y: 1,
                    delay,
                    ease: Elastic.easeOut.config(1, 0.4),
                });

            const tl2 = new TimelineMax();
            tl2.to(this.rings[i].position, timeIn, {
                x: 0 * Math.cos(Math.random() * 2 * Math.PI),
                y: 0.1 * Math.sin(Math.random() * 2 * Math.PI),
                ease: Power3.easeOut,
            })
                .to(this.rings[i].position, timeOut, {
                    x: 0,
                    y: 0,
                    delay,
                    ease: Elastic.easeOut.config(1, 0.4),
                });


            const tl3 = new TimelineMax();
            tl3.to(this.rings[i], timeIn, {
                gaussIt: 0.1,
                weightIn: 0.5,
                intensity: 1,
                osc: 0.1,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], timeOut, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    intensity: 0.21,
                    osc: 0.06,
                    ease: Power3.easeOut,
                    delay,
                });

            const tl4 = new TimelineMax();
            tl4.to(this.rings[i], timeIn, {
                theta: Math.random(),
                ease: Power3.easeOut,
            })
                .to(this.rings[i], timeOut, {
                    theta: i * 0.01,
                    delay,
                    ease: Power3.easeOut,
                });
        }

        const tl5 = new TimelineMax();
        tl5.to(this, timeIn, {
            timeInc: 0.1,
            ease: Power3.easeOut,
        })
            .to(this, timeOut, {
                timeInc: 0.01,
                delay,
                ease: Power3.easeOut,
            });
    },

    shake() {
        for (let i = 0; i < this.rings.length; i++) {
            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], 0.6, {
                gaussIt: 0,
                weightIn: 0.1,
                intensity: 3,
                osc: 0.1,
                theta: Math.random() / 2,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], 0.3, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    intensity: 0.05,
                    osc: 0.06,
                    theta: i * 0.01,
                    delay: 0.3,
                    ease: Power3.easeOut,
                });
        }

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, 1, {
            timeInc: 0.5,
            ease: Power3.easeOut,
        })
            .to(this, 1, {
                timeInc: 0.01,
                delay: 0,
                ease: Power3.easeOut,
            });
    },

    upset() {
        const timeIn = 1.5;
        const timeOut = 1;
        const delayInOut = 1;

        for (let i = 0; i < this.rings.length; i++) {
            const tl0 = new TimelineMax();
            tl0.to(this.rings[i].scale, timeIn, {
                x: 0.8 + (-i) * 0.03,
                y: 0.8 + (-i) * 0.03,
                ease: Elastic.easeOut.config(1, 0.3),
                delay: (1 - (i / this.rings.length)) / 2,
            })
                .to(this.rings[i].scale, timeOut, {
                    x: 1,
                    y: 1,
                    delay: delayInOut,
                    ease: Power4.easeOut,
                });

            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], timeIn, {
                gaussIt: 0.2,
                theta: 0,
                ease: Elastic.easeOut.config(1, 0.3),
            })
                .to(this.rings[i], timeOut, {
                    gaussIt: 0.98,
                    theta: i * 0.01,
                    delay: delayInOut,
                    ease: Elastic.easeOut.config(1, 0.3),
                });

            const tl2 = new TimelineMax();
            tl2.to(this.rings[i].hsl, 0.3, {
                y: 0.2,
                ease: Power3.easeOut,
            })
                .to(this.rings[i].hsl, 0.2, {
                    y: this.rings[i].originalColor.y,
                    delay: 2,
                    ease: Power3.easeOut,
                });
        }

        // let tl2 = new TimelineMax();
        // tl2.to(this.hsl, timeIn, { y: 0.2, ease: Power3.easeOut })
        //    .to(this.hsl, timeOut, { y: 0.73, delay: delayInOut, ease: Power3.easeOut });

        const tl3 = new TimelineMax();
        tl3.to(this, timeIn, {
            rotation: 1.5 + Math.random(),
            ease: Power3.easeOut,
        })
            .to(this, timeOut, {
                rotation: 3,
                delay: delayInOut,
                ease: Power3.easeOut,
            });

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, timeIn, {
            timeInc: 0.002,
            ease: Power3.easeOut,
        })
            .to(this, timeOut, {
                timeInc: 0.01,
                ease: Power3.easeOut,
            });
    },

    no() {
        for (let i = 0; i < this.rings.length; i++) {
            const tl1 = new TimelineMax();
            tl1.to(this.rings[i], 2, {
                gaussIt: 0.1,
                weightIn: 0.8,
                shadowSpread: 0.03,
                theta: Math.random() * this.rings[i].seed.z,
                ease: Power3.easeOut,
            })
                .to(this.rings[i], 2, {
                    gaussIt: 0.98,
                    weightIn: 1,
                    shadowSpread: 0.01,
                    theta: i * 0.01,
                    ease: Power3.easeOut,
                    delay: 1,
                });

            const tl2 = new TimelineMax();
            tl2.to(this.rings[i].hsl, 0.3, {
                y: 0.2,
                ease: Power3.easeOut,
            })
                .to(this.rings[i].hsl, 0.2, {
                    y: this.rings[i].originalColor.y,
                    delay: 2,
                    ease: Power3.easeOut,
                });
        }

        // let tl2 = new TimelineMax();
        // tl2.to(this.hsl, 2, { z: .2, ease: Power3.easeOut })
        //    .to(this.hsl, 2, { z: 0.47, delay: 1, ease: Power3.easeOut });

        const tl4 = new TimelineMax().eventCallback('onComplete', () => {
            personaStore.mood = MOODS.RESET;
        });
        tl4.to(this, 0.5, {
            timeInc: 0,
            ease: Power3.easeOut,
        })
            .to(this, 2, {
                timeInc: 0.01,
                delay: 1.5,
                ease: Power3.easeOut,
            });
    },
};

export default Reactions;
