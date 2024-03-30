
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
      handlers.forEach(handler => {
        handler(data);
      });
    }
  }

  // 移除事件监听器
  public off(eventName: string, handler: Function): void {
    const handlers = this.handlers[eventName];
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }
}

// 使用示例
const event = new Event();

// 添加事件监听器
event.on('click', (data: string) => {
  console.log(`Clicked: ${data}`);
});

event.on('hover', () => {
  console.log('Hovered');
});

// 触发事件
event.emit('click', 'Button');

event.emit('hover');

// 移除事件监听器
const clickHandler = (data: string) => {
  console.log(`Clicked: ${data}`);
};
event.on('click', clickHandler);

event.off('click', clickHandler);
export{}