import { Hono } from 'hono';
import { validator } from 'hono/validator';

export type Env = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => {
  return c.json({ status: 'Running' });
});

app.get('/posts', async (c) => {
  const posts = await c.env.DB.prepare('select id, title, content from Post where published = 1 limit 20').all();
  return c.json(posts.results);
});

type Post = {
  id: number;
  authorId: number;
  title: string;
  content: string;
  published: number;
  createdAt: string;
};

app.post(
  '/posts',
  validator('json', () => {
    return {
      authorId: 1,
      title: 'Cloudflare Workersを使ってみた',
      content: 'APIがすぐデプロイできてすごい',
    };
  }),
  async (c) => {
    const input = c.req.valid('json');

    const post = await c.env.DB.prepare(
      'insert into Post (authorId, title, content, published, createdAt) values (?, ?, ?, ?, ?) returning *'
    )
      .bind(input.authorId, input.title, input.content, 1, new Date().toISOString())
      .first<Post>();

    return c.json(post);
  }
);

app.delete('/posts/:id', async (c) => {
  const id = c.req.param('id');
  await c.env.DB.prepare('delete from Post where id = ?').bind(id).run();
  return c.json(undefined, 204);
});

app.put('/posts/:id', async (c) => {
  const id = c.req.param('id');
  const post = await c.env.DB.prepare('update Post set title = ? where id = ? returning *').bind('新しいタイトル', id).first<Post | null>();

  console.log(post);

  return c.json(undefined, 204);
});

export default app;
