const { Manager } = require('node-norm');
const inalum = new Manager({
  connections: [
    {
        name: 'default',
        adapter: require('node-norm-mysql'),
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'inalum', // inalum
        schemas: [],
    },
  ],
});
const inalumOctober = new Manager({
  connections: [
    {
        name: 'default',
        adapter: require('node-norm-mysql'),
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'inalum_october', // inalum october
        schemas: [],
    },
  ],
});
// let ganjil = 7;
// let genap = 8;
(async() => {
    inalum.runSession(async (session) => {
        let dataInalium = await session.factory('ecom_articles').all();
        dataInalium.map((val, i) => {
            let publishDate = val.published !== 0 ? val.created : null
            let trimSlug = val.alias.slice(0, 191) 
            let intro = val.intro.slice(0, 65535) // 65535
            let data = {
                // post_id: i + 1,
                // category_id: val.articles_category_id
                // user_id: 1,
                // title: val.title,
                // slug: trimSlug,
                // excerpt: intro,
                // content: val.description,
                // content_html: val.description,
                // published: val.published,
                // created_at: val.created,
                // updated_at: val.last_updt,
                // published_at: publishDate
                // nest_left: ganjil += 2,
                // nest_right: genap += 2
            }
            console.log(data);
            // inalumOctober.runSession(async (session2) => {
            //     await session2.factory('rainlab_blog_posts_categories').insert(data).save()
            // })
        })
    })
})();
