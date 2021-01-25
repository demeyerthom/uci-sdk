const {transformDate} = require("./helpers");

test('date string transformation', () => {
    expect(transformDate("/Date(1605049200000)/")).toStrictEqual(new Date(1605049200000));
});