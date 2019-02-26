import * as THREE from 'three';
import { autorun } from 'mobx';

import SimplexNoise from 'simplex-noise';
import Chroma from 'chroma-js';

import Reactions from './reactions';
import Ring from './ring';

function getGradientValues() {
  const range = 0.5;
  const scale1 = Chroma.scale(['#4000b2', '7d28e7']).mode('lch');
  const scale2 = Chroma.scale(['#ff0000', '#009ade']).mode('lch');

  const cols = [scale1(range), scale2(range)];

  return [`${cols[0]}`, `${cols[1]}`];
}

class Persona {
  constructor(scene, settings, texture) {
    // Mix in Reactions
    Object.assign(this, Reactions);

    this.settings = settings || {};

    this.texture = texture;
    this.ringCount = this.settings.ringCount || 8;
    this.ringRes = this.settings.ringRes || 256;
    this.position = this.settings.position || new THREE.Vector3(0, 0, 0);
    this.rotation = this.settings.rotation || 0;
    this.stateRotation = this.settings.stateRotation || 0;
    this.scale = this.settings.scale || new THREE.Vector3(1, 1, 1);
    this.timeInc = this.settings.timeInc || 0.005;
    this.radius = this.settings.radius || 300;
    this.modifierTime = 0;
    this.modifierTimestep = 0;

    this.colorScheme = 0;

    this.time = 0;
    this.rotationSpeed = 0;
    this.simplex = new SimplexNoise(Math.random);

    this.stateRotationGroup = new THREE.Object3D();
    this.group = new THREE.Object3D();
    this.group.add(this.stateRotationGroup);
    scene.add(this.group);

    /** @type {Ring[]} */
    this.rings = [];
    for (let i = 0; i < this.ringCount; i++) {
      this.rings.push(new Ring(this, i));
    }

    this.autoRunDisposer = autorun(() => {
      this.setOriginalRingChroma();
    });
  }

  componentWillUnmount() {
    this.autoRunDisposer();
  }

  setOriginalRingChroma() {
    const gradient = getGradientValues();
    const colorHSL = Chroma.blend(gradient[0], gradient[1], 'overlay');

    for (let i = 0; i < this.ringCount; i++) {
      const c = colorHSL.darken(i - 3.5);
      this.rings[i].originalColor = new THREE.Vector3(
        c.hsl()[0],
        c.hsl()[1],
        c.hsl()[2]
      );

      this.rings[i].hsl = this.rings[i].originalColor;
    }

    if (this.settings.glow) {
      const colors = [
        '#C3C3C3',
        '#DADADA',
        '#FDFDFD',
        '#9E9EFF',
        '#A9A9FF',
        '#B9B9FF',
        '#DCDCFF',
        '#DCFFFF'
      ];

      for (let i = 0; i < colors.length; i++) {
        const color = Chroma(colors[i]).hsl();

        this.rings[i].originalColor = new THREE.Vector3(
          color[0] || 0,
          color[1],
          color[2]
        );

        this.rings[i].hsl = this.rings[i].originalColor;
      }

      this.rings[0].shadowColor = 1;
      this.rings[0].shadowSpread = 0.1;
      this.rings[0].shadowIntensity = 0.3;
    }
  }

  step(time) {
    this.group.rotation.z = this.rotation * Math.PI * 2;
    this.stateRotationGroup.rotation.z = this.stateRotation * Math.PI * 2;
    this.group.position.set(this.position.x, this.position.y, this.position.z);
    this.group.scale.set(
      this.radius * this.scale.x,
      this.radius * this.scale.y,
      this.scale.z
    );

    this.time += this.timeInc;
    this.modifierTime += this.modifierTimestep;

    for (let i = 0; i < this.rings.length; i++) {
      this.rings[i].step(this.time);
    }
  }
}

export default Persona;
