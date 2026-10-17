#!/usr/bin/env python3
"""Serve the repo the way vercel.json declares, so the fix can be tested before deploy.

Reimplements only what Vercel does that matters here: static file serving,
directory index, and the redirects + headers from vercel.json.
ponytail: a test double for Vercel routing. If the site ever needs real
middleware, re-check the source globs against Vercel docs instead of trusting this.
"""
import json, re, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONF = json.loads((ROOT / "vercel.json").read_text())

RULES = []
for r in CONF.get("redirects", []):
    RULES.append(("redirect", re.sub(r":path\*", "(.*)", r["source"]) + "/?$", r["destination"], r.get("permanent", False)))
for h in CONF.get("headers", []):
    RULES.append(("headers", re.sub(r":path\*", "(.*)", h["source"]) + "$", {k["key"]: k["value"] for k in h["headers"]}, False))

MIME = {".html": "text/html", ".css": "text/css", ".js": "text/javascript",
        ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml",
        ".txt": "text/plain", ".xml": "application/xml", ".json": "application/json",
        ".ico": "image/x-icon", ".mp3": "audio/mpeg"}


class H(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = super().translate_path(path)
        q = Path(p)
        if q.is_dir():
            return str(q / "index.html")
        return p

    def send_response(self, code, message=None):
        path = self.path.split("?")[0]
        for kind, pattern, payload, permanent in RULES:
            if kind == "redirect" and re.match(pattern, path):
                super().send_response(308 if permanent else 307)
                self.send_header("Location", payload)
                # SimpleHTTPRequestHandler already emits Content-Length in send_response();
                # sending it again makes clients reject the response with "Invalid Content-Length".
                self.close_connection = True
                self._redirected = True
                return
        self._redirected = False
        super().send_response(code, message)

    def end_headers(self):
        if getattr(self, "_redirected", False):
            self._headers_buffer.append(b"\r\n")
            self.flush_headers()
            return
        path = self.path.split("?")[0]
        for kind, pattern, payload, permanent in RULES:
            if kind == "headers" and re.match(pattern, path):
                for k, v in payload.items():
                    self.send_header(k, v)
        super().end_headers()

    def guess_type(self, path):
        return MIME.get(Path(path).suffix, super().guess_type(path))

    def log_message(self, format, *a):
        pass


if __name__ == "__main__":
    os_chdir = ROOT
    import os
    os.chdir(os_chdir)
    srv = ThreadingHTTPServer(("127.0.0.1", 8899), H)
    print("serving", ROOT, "on 127.0.0.1:8899", flush=True)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass