/**
 * @jest-environment node
 */

// Mock browser globals
global.chrome = {
  storage: {
    sync: {
      get: jest.fn(),
    },
    onChanged: {
      addListener: jest.fn(),
    }
  },
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    }
  },
  i18n: {
    getMessage: jest.fn(),
  }
};

global.document = {
  readyState: 'complete',
  addEventListener: jest.fn(),
  querySelectorAll: jest.fn().mockReturnValue([]),
  body: {
    appendChild: jest.fn(),
  },
  pictureInPictureEnabled: true
};

global.window = {
  location: {
    hostname: ''
  }
};

global.MutationObserver = class {
  observe() {}
  disconnect() {}
};

// Import the actual implementation
const { isDomainBlacklisted, settings } = require('./content.js');

describe('isDomainBlacklisted (Real Implementation)', () => {
  beforeEach(() => {
    // Reset settings before each test
    settings.blacklist = [];
    global.window.location.hostname = '';
  });

  test('returns true for exact domain match', () => {
    global.window.location.hostname = 'example.com';
    settings.blacklist = ['example.com'];
    expect(isDomainBlacklisted()).toBe(true);
  });

  test('returns true for subdomain match', () => {
    global.window.location.hostname = 'www.example.com';
    settings.blacklist = ['example.com'];
    expect(isDomainBlacklisted()).toBe(true);
  });

  test('returns false for non-matching domain', () => {
    global.window.location.hostname = 'google.com';
    settings.blacklist = ['example.com'];
    expect(isDomainBlacklisted()).toBe(false);
  });

  test('returns false for partial match that is not a subdomain', () => {
    // If the blacklist has 'app.com' and we are on 'my-app.com'
    // it should not be blacklisted.
    global.window.location.hostname = 'my-app.com';
    settings.blacklist = ['app.com'];
    expect(isDomainBlacklisted()).toBe(false);
  });

  test('returns false when blacklist is empty', () => {
    global.window.location.hostname = 'example.com';
    settings.blacklist = [];
    expect(isDomainBlacklisted()).toBe(false);
  });

  test('returns false when blacklist contains longer domain than current', () => {
    global.window.location.hostname = 'example.com';
    settings.blacklist = ['sub.example.com'];
    expect(isDomainBlacklisted()).toBe(false);
  });
});
