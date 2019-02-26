import React, { Component } from 'react';

// import { createLogger } from 'app/logger';
import * as THREE from 'three';
import { observable, autorun } from 'mobx';

import { TweenLite } from 'gsap';

// import TextureUrl from 'images/common/noise.png';
import Persona from './persona';

import personaStore from './store/persona';
import { MOODS } from './moods';

// const logger = createLogger('[PERSONA]');

class Maslo extends Component {
  @observable oldState = personaStore.mood;

  _setup(config) {
    super._setup(config);

    const radius = config.radius || 200; // Math.min(this._el.clientWidth, this._el.clientHeight);
    const width = 2.5 * radius;
    const height = 2.5 * radius;

    this._scene = new THREE.Scene();
    this._camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      -1,
      1000
    );
    this._camera.position.z = 100;
    this._renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this._renderer.setSize(width, height, false);
    this._el.appendChild(this._renderer.domElement);

    this._persona = new Persona(
      this._scene,
      { ringRes: 80, radius, glow: false },
      null
    );

    //set state mood to this._switchMood.bind(this);

    this.step = this.step.bind(this);
    this.step();

    personaStore.mood = MOODS.INIT;
  }

  setSize(width, height) {
    const min = Math.min(width, height);
    // this._renderer.setSize(min, min, false);

    /** @type {HTMLCanvasElement} */
    const canvas = this._renderer.domElement;
    if (height > min) {
      TweenLite.set(canvas, {
        width: min,
        height: min,
        x: 0,
        y: (height - min) / 2
      });
    } else {
      TweenLite.set(canvas, {
        width: min,
        height: min,
        x: (width - min) / 2,
        y: 0
      });
    }
  }

  step(time) {
    requestAnimationFrame(this.step);

    this._stepPersona(time);

    this._renderer.render(this._scene, this._camera);
  }

  _switchMood() {
    // Listen for change in state
    if (personaStore.mood !== this.oldState) {
      // logger.log(
      //   '_switchMood: state changed',
      //   this.oldState,
      //   ' ===> ',
      //   personaStore.mood
      // );

      this.oldState = personaStore.mood;

      // unqiue function name needs to be called manually
      if (personaStore.mood === MOODS.LISTENING_END) {
        this._persona.listeningEnd();
      } else {
        const nextMood = personaStore.mood.toLowerCase();
        let personaAction = this._persona[nextMood];
        if (!personaAction) {
          personaAction = this._persona[MOODS.IDLE];
        }
        personaAction = personaAction.bind(this._persona);
        personaAction();
      }
    }
  }

  _stepPersona(time) {
    // update persona
    try {
      this._persona.step(time);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let maslo = !this.props.dialogueStep ? 'heyo' : this.props.dialogueStep;

    return <div className="maslo">{maslo}</div>;
  }
}

export default Maslo;
