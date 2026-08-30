# Expected End AI Crawler Controls

Status: Repository policy complete; authenticated production configuration and evidence required.

Last policy review: 2026-08-08  
Owner: Expected End  
Scope: `expectedend.co` and its public routes

## Purpose and limits

Expected End does not authorize automated AI search, agent access, crawling, training, fine-tuning, dataset creation, generation, or style replication from its public site. The repository communicates that policy through `public/robots.txt` and `public/ai.txt`.

Those files do not enforce access. Robots directives are voluntary, user agents can be spoofed, and a person or unrecognized client can still request public pages and assets. Cloudflare controls reduce access by automated traffic Cloudflare recognizes, but they cannot make public content secret or guarantee that every scraper is blocked.

Blocking AI Search, Agent, and Training traffic is an intentional discovery tradeoff. AI answer engines may stop citing, summarizing, or referring visitors to Expected End. Conventional search indexing remains enabled through the default public robots group and the site's `index, follow` metadata.

## Repository policy baseline

The crawler inventory was reviewed on 2026-08-08. It includes these identities:

- OpenAI: GPTBot, OAI-SearchBot, ChatGPT-User
- Anthropic: ClaudeBot, Claude-SearchBot, Claude-User, anthropic-ai
- Perplexity: PerplexityBot, Perplexity-User
- Other search, agent, and training identities: CCBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, FacebookBot, Amazonbot, Bytespider, cohere-ai, Diffbot, ImagesiftBot, Omgilibot

The list is a dated baseline, not a claim that all present or future AI crawlers are covered. Reconcile it with Cloudflare's observed crawler directory during production configuration and each quarterly review.

## Production prerequisites

- The production DNS record must be proxied through the authenticated Expected End Cloudflare zone.
- The operator must have owner authorization to change bot and WAF settings.
- Capture evidence without API tokens, session cookies, account IDs, personal data, or full request logs.
- Record the current behavior of ordinary browsers and conventional search before enabling the block.

## Cloudflare configuration

Cloudflare may rename dashboard labels. Preserve the policy intent if the interface changes.

1. Open the production zone's AI Crawl Control or current AI bot-management surface.
2. Block the AI **Search**, **Agent**, and **Training** categories. Do not broaden the rule to ordinary verified search-engine bots.
3. Inspect the resulting WAF rule order. The AI crawler block must run before any custom allow, skip, or bypass rule that could accept the same request.
4. Review Cloudflare's detected crawler directory against the repository baseline. Add a newly verified identity to `robots.txt` and this document through normal review rather than editing policy only in the dashboard.
5. Enable AI Labyrinth when the production zone supports it and it does not conflict with a higher-priority rule. Record whether it was enabled and why. AI Labyrinth is a supplemental trap for noncompliant crawlers, not a replacement for the block.
6. Save the configuration and capture non-secret evidence of the enabled categories, WAF rule order, and AI Labyrinth state.

## Required evidence record

Complete this table after authenticated configuration. Do not enter credentials or sensitive logs.

| Evidence | Value |
|---|---|
| Production zone confirmed proxied | Not yet recorded |
| Configured by | Not yet recorded |
| Configuration date | Not yet recorded |
| Search category | Not yet recorded |
| Agent category | Not yet recorded |
| Training category | Not yet recorded |
| AI block WAF rule order checked | Not yet recorded |
| Earlier allow or skip bypass ruled out | Not yet recorded |
| AI Labyrinth state and rationale | Not yet recorded |
| Repository inventory reconciled with observed crawlers | Not yet recorded |
| Non-secret screenshot or ticket reference | Not yet recorded |

## Verification

After the configuration is active:

1. Request the production homepage with representative identities from each enabled AI category. Record the date, identity, route, response status, and whether Cloudflare classified the request. A manually supplied user agent may not reproduce paid Bot Management classification, so pair probe results with Cloudflare event evidence.
2. Request the same routes with a normal browser identity and confirm the pages remain available.
3. Confirm `https://expectedend.co/robots.txt` and `https://expectedend.co/ai.txt` match the deployed repository files.
4. Confirm the page still publishes `index, follow` for conventional search.
5. Use a normal browser to confirm right-click, text selection, copy, save or print shortcuts, view-source, and developer tools are not intercepted on public pages.
6. Review AI Crawl Control and WAF events for false positives after rollout. Record what was checked without copying visitor request data into this repository.

## Monitoring and quarterly review

Review these controls quarterly and after any Cloudflare bot-category change:

- Compare observed AI identities with the dated repository inventory.
- Confirm Search, Agent, and Training remain blocked.
- Recheck WAF rule order after any custom rule change.
- Review false positives affecting people or conventional search crawlers.
- Confirm the `ai.txt` policy, `robots.txt`, dashboard configuration, and this runbook still agree.
- Record the review date and owner in the approved operational system, not by adding private account evidence to Git.

## Rollback

If the edge rule blocks ordinary visitors or conventional search:

1. Disable the AI-specific WAF or AI Crawl Control block. Do not change the public `User-agent: *` allow group while diagnosing the edge rule.
2. Confirm ordinary browser and conventional-search access is restored.
3. Preserve non-secret event evidence, identify the misclassified category or earlier rule interaction, and correct the narrowest rule possible.
4. Re-enable only after representative AI and ordinary-access checks pass.

Repository rollback is separate. Reverting `robots.txt` or `ai.txt` changes owner policy but does not disable an existing Cloudflare WAF rule.

## Official references

- [Cloudflare AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/)
- [Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/)
- [AI Crawl Control with WAF](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-waf/)
- [Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
- [AI Labyrinth](https://developers.cloudflare.com/bots/additional-configurations/ai-labyrinth/)
- [OpenAI Publishers and Developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
