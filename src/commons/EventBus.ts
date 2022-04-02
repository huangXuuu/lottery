import mitt, { Emitter, EventType } from 'mitt';

/**
 * イベントバス
 *
 * @class
 */
class EventBus {
  /**
   * エミッターのインスタンス
   *
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static emitter: Emitter<Record<EventType, any>> = mitt();

  /**
   * イベントバスのインスタンスを取得する。
   *
   * @returns {Emitter<Record<EventType, any>>} イベントバスのインスタンス
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getInstance(): Emitter<Record<EventType, any>> {
    return this.emitter;
  }
}

// export as singleton
export default EventBus.getInstance();
