# Listing Description — AI Generate

Prototype for the listing description form screen, exploring AI-assisted content generation.

## What this shows

A single-field form screen where owners write a description of their home for sitters.
The key feature being tested is an "AI Generate" button that fills the textarea with
mock-generated content, showing all four states of the generation flow.

## States to test

| State | How to trigger |
|-------|---------------|
| Idle | Default on load |
| Loading | Click "Generate with AI" |
| Generated | Wait 2.5s after clicking generate |
| Error | Add `?error=true` to the URL, then click generate |

## URL

`#/prototypes/listing-description-ai`

Error state: `#/prototypes/listing-description-ai?error=true`
