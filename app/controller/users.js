'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const users = await ctx.model.User.findAll(query);
    ctx.body = users;
  }

  // 根据ID查询用户
  async show() {
    const ctx = this.ctx;
    const user = ctx.model.User.findByPk(toInt(ctx.params.id));
    if (!user) {
      ctx.status = 404;
    }
    ctx.body = user;
  }

  // 新增用户
  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const user = await ctx.model.User.create({ name, age });
    ctx.status = 201;
    ctx.body = user;
  }

  // 更新用户信息
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  // 删除用户
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
