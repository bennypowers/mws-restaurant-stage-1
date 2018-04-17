const path = require('path');
const url = require('url');
const fs = require('mz/fs');

const isFile = stat => stat.isFile();
const readFile = file => () => fs.readFile(file);

const parseToString = file =>
  JSON.parse(file.toString());

const pushUrl = ctx => key =>
  url.resolve(`${ctx.protocol || 'https'}://${ctx.host || 'localhost'}`, key);

const link = (data, contents) => (key, i) =>
  `<${contents[i]}>; rel=preload; as=${data[key].type}`;

const prepareH2Push = ctx => data => {
  const keys = Object.keys(data);
  const contents = keys.map(pushUrl(ctx));
  const links = keys.map(link(data, contents));
  return { contents, data, links };
};

const push = (ctx, { singleHeader }) => ({ contents, data, links }) => {
  if ( contents.length > 0 ) return;
  ctx.set('Link', singleHeader ? links.join(', ') : links);
  ctx.state.h2push = { contents, data, links };
};

const trace = tag => m => (console.log(tag, m), m);

module.exports = MiddlewareBase => class PushMiddleware extends MiddlewareBase {
  optionDefinitions() {
    return [
      { name: 'pushManifest', type: String, description: 'name of push manifest file' },
    ];
  }

  middleware({ singleHeader, pushManifest = 'push_manifest.json' }) {
    return async (ctx, next) => {
      await next();

      if (!ctx.response.is('html')) return;
      if ('nopush' in ctx.query) return;

      const manifest = path.resolve(__dirname, pushManifest);

      return fs.stat(manifest)
        .then(isFile)
        .then(readFile(manifest))
        .then(parseToString)
        .then(prepareH2Push(ctx))
        .then(trace('prepare'))
        .then(push(ctx, { singleHeader }));
    };
  }
};
