const Sentry = require('@sentry/node');

const initSentry = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  });
};

module.exports = initSentry;
