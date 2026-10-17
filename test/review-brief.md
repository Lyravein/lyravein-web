You are reviewing a change to a static personal website. Read only the files named below; they are inside your working directory. This is the complete record of the change.

## The user's request, verbatim

"audit webku ini @url:`https://www.lyravein.my.id/` gw lupa beli domain dimana, keknya mau habis juga"

follow-up, verbatim: "kalo gasalah itu ada di lyravein-sv-hp reponya ini @url:`https://github.com/Lyravein/lyravein-web`"

The domain question is answered separately. Your job is the code change: an audit found broken links, missing security headers and missing SEO files, and the orchestrator implemented fixes.

## Constraints the user did NOT ask for, that bind this change

- This is a personal portfolio site, ~5 static HTML pages, no build step, no framework. Do not propose a build system, a framework, a bundler, a linter, or a CI pipeline.
- No new dependency may be added.
- The site is deployed by pushing to GitHub and letting Vercel build it. The orchestrator cannot run a real Vercel deploy or run `vercel dev`, so routing and headers were verified against a local stdlib server instead.
- `/Project/index.html` is a private gift page (personal photos, romantic letter). It references five images (`img1.jpg`..`img4.jpg`, `surprise.jpg`) that were never committed to the repository. The orchestrator deliberately did NOT touch it, on the grounds that deciding its fate is the user's call, not a reviewer's. Comment on whether that was the right call.
- The orchestrator's own earlier audit claimed the `/denia/` hero image lacked `width`/`height` and therefore caused layout shift. That claim was subsequently found to be wrong (the `.hero-avatar` CSS rule sets explicit width and height). The orchestrator retracted it. No fix was made for it. Check whether the retraction was correct.

## Files to read

- `test/fix.diff` - the complete diff, plus raw verification output at the end
- `vercel.json` - the rewritten routing and header config
- `test/evidence-headers.md` - which headers the live site was missing before this change
- `test/serve.py` - the local test double that reproduced Vercel's redirects and headers
- `index.html`, `denia/index.html`, `fivefloors/index.html`, `roomfall/index.html` - the four public pages
- `Project/index.html` - the private page that was intentionally left alone

## What to judge

1. Does the CSP in `vercel.json` break any page? Every page uses an inline `<script>` and an inline `<style>` block, `index.html` has one `style` attribute, and `denia/index.html` has `onmouseover`/`onmouseout` attributes. Reason from the policy text, not from the orchestrator's conclusion.
2. Are the `source` globs in `vercel.json` correct for Vercel, and does the header ordering behave as intended when several globs match the same path? Note that the same `/` path matches both `/(.*)` and `/(.*)` (cache) rules.
3. Did renaming the directories `FiveFloors`->`fivefloors` and `RoomFall`->`roomfall` lose anything? Check whether any remaining file in the repo still references the old capitalised paths.
4. Is `frame-ancestors` in CSP better than `X-Frame-Options`, and does omitting `X-Frame-Options` matter for a page with no framing?
5. The `immutable` Cache-Control is scoped to `/Project/assets/(.*)`. Are there any other real static assets in this repo that are being served with only the short `s-maxage=604800` policy?
6. Is `robots.txt` disallowing `/Project/` sufficient, given that the page is publicly reachable and has no `noindex` meta tag?
7. Anything in the diff that is wrong, over-engineered, or risky.

Be concrete and cite `path:line`. If a claim in the diff's raw output is wrong, say so.