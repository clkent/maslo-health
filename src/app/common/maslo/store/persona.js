import { observable } from 'mobx';

class PersonaStore {
  @observable mood = null;

  @observable isListening = false;

  @observable listenTls = [];

  @observable listenTl2 = null;

  @observable willReward = null;
}

const personaStore = new PersonaStore();
export default personaStore;
