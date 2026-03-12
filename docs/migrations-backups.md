# Database Migrations & Backups

## Prisma migrations
1) Create migration locally:
```bash
npx prisma migrate dev --name <migration-name>
```
2) Apply migrations in production:
```bash
npx prisma migrate deploy
```
3) Verify status:
```bash
npx prisma migrate status
```

## CI migration check
CI runs `prisma migrate status` when `DATABASE_URL` is available to ensure migrations are applied.

## Neon branching (previews)
- Create a Neon branch for each preview environment (Vercel preview).
- Point the preview `DATABASE_URL` to that branch.
- Merge branch changes back to main after review.

## Backups
- Enable daily automated backups in Neon console.
- Keep at least 7–14 days retention.
- Store encrypted exports in an offsite bucket if required by compliance.

## Seed data
Run:
```bash
npm run db:seed
```
