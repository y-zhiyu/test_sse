const Koa = require('koa');
const app = new Koa();

// SSE middleware
app.use(async (ctx) => {
  // 设置 SSE 相关的响应头
  ctx.type = 'text/event-stream';
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Connection', 'keep-alive');

  // 发送初始消息
  ctx.body = 'data: Initial message\n\n';

  // 每秒发送更新的消息
  const intervalId = setInterval(() => {
    ctx.body += `data: Updated message ${Date.now()}\n\n`;
  }, 1000);

  // 处理客户端断开连接
  ctx.req.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });

  // 使用 Koa 的 async 机制，保持连接持续打开
  await new Promise(() => {});
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});