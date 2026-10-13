# Client photos

Upload the firm's real photos here (Google Drive links can't be read by the build).
Then run `npm run images` — it creates optimized 4:5 WebP + JPEG versions in
`/public/images/client/` and the site picks them up automatically.

| File name (use exactly)            | Where it appears                                  |
| ---------------------------------- | ------------------------------------------------- |
| `theo-minassian-headshot.jpg`      | Homepage "Meet Theo" strip, About page, Contact page |
| `theo-minassian-office.jpg`        | About page — "Why 1Oak" section (optional)        |
| `office-exterior.jpg`              | Contact page beside the map (optional)            |

Additional photos (the 15–29 supplied by the client) can be added with any descriptive
kebab-case name and wired in later. JPEG or PNG, at least 1600 × 2000 px for portraits.
Until a file exists, a branded placeholder renders with `data-todo="CLIENT-PHOTO:<name>"`
and the photo is listed in PRELAUNCH_CHECKLIST.md.
