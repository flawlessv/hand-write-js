// 定义事件类
class Event {
  private handlers: { [key: string]: Function[] } = {};

  // 添加事件监听器
  public on(eventName: string, handler: Function): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
  }

  // 触发事件
  public emit(eventName: string, data?: any): void {
    const handlers = this.handlers[eventName];
    if (handlers) {
      handlers.forEach((handler) => {
        handler(data);
      });
    }
  }

  // 移除事件监听器
  public off(eventName: string, cb?: Function): void {
    const handlers = this.handlers[eventName];
    if (handlers) {
        this.handlers[eventName] = handlers.filter(
          (handler) => handler !== cb
        );
    }
  }

  // 添加一次性事件监听器
  public once(eventName: string, handler: Function): void {
    const onceHandler = (data?: any) => {
      handler(data);
      this.off(eventName, onceHandler);
    };
    this.on(eventName, onceHandler);
  }
}

// // 使用示例
// const event = new Event();

// // 添加事件监听器
// event.on("click", (data: string) => {
//   console.log(`Clicked: ${data}`);
// });

// event.on("hover", () => {
//   console.log("Hovered");
// });

// // 触发事件
// event.emit("click", "Button");

// event.emit("hover");

// // 添加一次性事件监听器
// event.once("load", () => {
//   console.log("Loaded");
// });

// event.emit("load");
// event.emit("load"); // 这次不会触发事件，因为 once 监听器已被移除

// // 移除事件监听器
// const clickHandler = (data: string) => {
//   console.log(`Clicked: ${data}`);
// };
// event.on("click", clickHandler);

// event.off("click", clickHandler);
