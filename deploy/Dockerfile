# The ai-nd.co site as a container for the office k3s cluster (ai-nd-co/k3s-gpu-cluster pins it by digest).
# Only the published pages and assets/ are copied; README, CNAME and deploy/ stay out.
#
# nginx 1.29.8, unprivileged build (uid 101, port 8080): the same digest the cluster already runs in
# agent-studio, pulled from Docker Hub (built on a GitHub-hosted runner; mirror.gcr.io lacked a layer of it on
# 2026-10-21).
FROM docker.io/nginxinc/nginx-unprivileged:1.29-alpine@sha256:0c79d56aee561a1d81c63f00eee5fb5fe29279560cdc55e91425133104c7fbe6

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY index.html privacy.html terms.html /srv/site/
COPY assets/ /srv/site/assets/

EXPOSE 8080
