import pgmock from 'pgmock2';
export const pg = new pgmock();

pg.add('SELECT * FROM public.user;', [], {
    rowCount: 1,
    rows: [
        { guid: '5dgs-ggsagsdg-sadgsdg', email: 'test@test.pl', name: 'Test Test', password: 'dfdsfag234fs243efdsf234sdfd'},
    ],
});
