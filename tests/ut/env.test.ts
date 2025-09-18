describe('Environment configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const loadEnv = async () => {
    const envModule = await import('../../src/env.js');
    return envModule.environment;
  };

  it('should load default values when environment variables are not set', async () => {
    delete process.env.PORT;

    expect(await loadEnv()).toEqual({
      port: 8000,
    });
  });

  it('should correctly load values from environment variables', async () => {
    process.env.PORT = '9000';

    expect(await loadEnv()).toEqual({
      port: 9000,
    });
  });

  it('should correctly load port 0 from environment variables', async () => {
    process.env.PORT = '0';

    expect(await loadEnv()).toEqual({
      port: 0,
    });
  });
});
