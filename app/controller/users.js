'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  // GET /users
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const users = await ctx.model.User.findAll(query);
    ctx.body = users;
  }

  // GET 	/users/:id
  async show() {
    const ctx = this.ctx;
    const user = await ctx.model.User.findByPk(toInt(ctx.params.id));
    if (!user) {
      // ctx.throw(404, 'user not found');
      ctx.status = 404;
      return;
    }
    ctx.body = user;
  }

  // POST /users
  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const user = await ctx.model.User.create({ name, age });
    ctx.status = 201;
    ctx.body = user;
  }

  // PUT /users/:id
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

  // DELETE /posts/:id
  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
