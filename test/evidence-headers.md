# evidence: vercel.json vs live (pre-deploy baseline)

live https://www.lyravein.my.id/ currently MISSING: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control

present: Strict-Transport-Security, Cache-Control

## CSP the deploy will send
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https://cdn.donmai.us; media-src 'self' https://www.soundhelix.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; connect-src 'self'

## HSTS
max-age=63072000; includeSubDomains; preload

## Cache-Control
public, max-age=31536000, immutable
