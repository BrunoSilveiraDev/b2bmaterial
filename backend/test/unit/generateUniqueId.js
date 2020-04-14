const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    const id = generateUniqueId();

    expect(id).toHaveLength(8);
})
