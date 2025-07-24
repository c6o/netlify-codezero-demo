# Netlify Demo for Codezero Zero Trust Extension

This app is hosted at <https://codezero-demo.netlify.app>.

The app uses the [Codezero Zero Trust Extension](https://app.netlify.com/extensions/codezero)
to allow a [Netlify Function](/netlify/functions/service-a.mjs) to securely connect to a
Codezero Teamspace.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/c6o/netlify-codezero-demo&utm_source=github)

(If you click this button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Netlify)

## Local Development

```sh
npm install -g netlify-cli
npm install
netlify dev
```
