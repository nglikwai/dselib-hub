// mock before test
jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'error').mockImplementation(() => {});
