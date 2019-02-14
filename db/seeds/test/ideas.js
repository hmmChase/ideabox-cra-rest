exports.seed = function(knex, Promise) {
  return knex('ideas')
    .del()
    .then(() => {
      return Promise.all([
        knex('ideas')
          .insert([
            {
              idea: 'If you dig it, do it. If you dig it a lot, do it twice.'
            }
          ])
          .then(() => console.log('Done seeding'))
          .catch(error => console.log('Seeding error: ', error))
      ]);
    })
    .catch(error => console.log('Seeding error: ', error));
};
