# Lambda Deploy (Alternative to Docker)

Render compositions on AWS Lambda instead of (or alongside) the Docker pipeline. Use Lambda when you need parallel renders, want to skip managing Docker hosts, or are integrating with an existing AWS-based stack.

## When to use Lambda vs Docker

| Concern | Docker (this template's default) | Lambda |
|---|---|---|
| Setup complexity | Low — `docker compose up` | Medium — IAM, function deploy, site upload |
| Cost at scale | Pay for the host machine | Pay per render minute |
| Cold start | None (container stays warm) | ~10s on first invoke after idle |
| Parallelism | Capped by host CPUs | Auto-scales |
| Debugging | Local logs | CloudWatch |

For a single small project, Docker is simpler. For an SaaS that renders user-uploaded content concurrently, Lambda wins.

## Prerequisites

- AWS account with permission to create IAM users, roles, policies, and Lambda functions
- Node 22+ locally
- Repository deps installed (`npm install`) — `@remotion/lambda` is already a devDependency

## IAM setup (one-time)

Remotion Lambda needs a function role and a deployer user.

```bash
# Print the role policy JSON
npx remotion lambda policies role
```

Create an IAM **role** named `remotion-lambda-role` with the AWS Lambda use case and attach the printed policy.

```bash
# Print the user policy JSON
npx remotion lambda policies user
```

Create an IAM **user** named `remotion-user` with programmatic access. Attach the printed policy as an inline policy on the user. Generate access keys.

Verify the IAM setup:

```bash
npx remotion lambda policies validate
```

## Configure credentials

Create a `.env` at the repo root (already gitignored):

```
REMOTION_AWS_ACCESS_KEY_ID=AKIA...
REMOTION_AWS_SECRET_ACCESS_KEY=...
REMOTION_AWS_REGION=us-east-1
```

The Remotion CLI reads these automatically.

## Deploy and render

The convenience script handles deploy + render in one command:

```bash
# Render the default composition (HelloWorld)
npm run lambda:deploy

# Render a specific composition
npm run lambda:deploy TransitionsDemo
npm run lambda:deploy CaptionsDemo
```

Internally it:
1. Validates IAM (`policies validate`)
2. Deploys/updates the Lambda function (`functions deploy`)
3. Uploads the site bundle to S3 (`sites create`)
4. Renders the requested composition

The render command prints an S3 URL for the resulting MP4. You can pipe it locally with:

```bash
npx remotion lambda render <serve-url> <composition-id> --download-name=out.mp4
```

## Cleanup

When you're done experimenting:

```bash
# Remove all deployed Lambda functions in your account
npx remotion lambda functions rmall

# Remove all uploaded sites in your S3 bucket
npx remotion lambda sites rmall
```

## Notes

- Lambda's default memory is 2048MB. Bump with `--memory-size-in-mb=3008` on `functions deploy` if your composition uses heavy assets.
- The `public/` folder is bundled with the site, so SRT files and other static assets travel with the deploy.
- Lambda timeout default is 120s — increase via `--timeout-in-seconds` on the deploy command if your composition is long.

For full configuration options see https://www.remotion.dev/docs/lambda.
