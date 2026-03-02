# Collective Recollections — Social Game

This is a simple, low-friction social activity designed to bring people together and encourage sharing.

Concept
- A host picks a short prompt (e.g., "A small kindness you remember").
- Participants submit short memories or answers.
- The group reveals submissions together, optionally votes on the most touching/funny entry, and can export the session.

Why it works
- Low barrier: short text answers, no special skills.
- Emotional resonance: prompts invite personal, often nostalgic recollections that connect people.
- Social value: fosters empathy, conversation starters, and archived memories.

Implementation notes
- Local-only: the current version stores data in-memory and supports exporting sessions as JSON for sharing.
- Phases: `submit` → `reveal` → `vote`.
- Considerations: for real multi-user sessions, add a lightweight backend or WebSocket layer.

Files
- UI implementation: `app/nostalgia/page.tsx`
