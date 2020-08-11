import Emittery from "emittery";

// PromiEvent's `resolve and `reject` (and the other static methods -- if you
// need their types too, add them!) return a PromiEvent, but the `Promise` type
// doesn't.
declare var Promise: {
  /**
   * Creates a new rejected promievent for the provided reason.
   * @param reason The reason the promise was rejected.
   * @returns A new rejected PromiEvent.
   */
  reject<T = never>(reason?: any): PromiEvent<T>;

  /**
   * Creates a new resolved promievent for the provided value.
   * @param value A promise.
   * @returns A promievent whose internal state matches the provided promise.
   */
  resolve<T>(value: T | PromiseLike<T>): PromiEvent<T>;

  /**
   * Creates a new resolved promievent.
   * @returns A resolved promievent.
   */
  resolve(): PromiEvent<void>;
} & PromiseConstructor;

class PromiEvent<T> extends Promise<T> {
  constructor (executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    super(executor);
    this.init();
  }

  /**
   * Used to immediately clear all event listeners on the instance and prevent
   * any additional binding or emittion from the Emitter.
   * 
   * Once disposed no listeners can be bound to this emitter.
   * 
   * Note: `dispose` is pre-bound to the `this`, making it possible to pass the
   * method around detached from it's context.
   */
  public dispose = () => {
    this.clearListeners();

    // Ensure that once disposed no listeners can be bound to this emitter.
    this.anyEvent = this.events = this.bindMethods = this.once = this.on = this.onAny = () => {throw new Error("PromiEvent bound after dispose");};
  }
}

interface PromiEvent<T> extends Promise<T>, Emittery {
}

applyMixins(PromiEvent, [Promise, Emittery]);

export default PromiEvent;

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!);
      });
  });
}