# Netlify Demo for Codezero Zero Trust Extension

This app is hosted at <https://codezero-demo.netlify.app>.

The app uses the [Codezero Zero Trust Extension](https://app.netlify.com/extensions/codezero)
to allow a [Netlify Function](/netlify/functions/service-a.mjs) to securely connect to a
Codezero Teamspace.

## Local Development

```sh
npm install -g netlify-cli
export CZ_ORG_ID=
export CZ_SPACE_ID=
export CZ_ORG_API_KEY=
netlify dev
```
