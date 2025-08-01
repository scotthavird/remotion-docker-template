# GitHub Actions Setup Guide

This guide explains how to set up and use the automated Docker image building and video rendering workflows in GitHub Actions.

## 🚀 Quick Setup

### 1. Enable GitHub Container Registry

1. Go to your repository: `https://github.com/{username}/{repository}`
2. Navigate to **Settings** → **Packages**
3. Ensure **"Inherit access from source repository"** is enabled
4. This allows GitHub Actions to publish Docker images

### 2. Configure Repository Permissions

The workflows automatically request the necessary permissions:
- `contents: read` - Read repository content
- `packages: write` - Publish Docker images
- `actions: read` - Access workflow run data

### 3. Push to Trigger First Build

```bash
git add .
git commit -m "Add GitHub Actions workflows"
git push origin main
```

## 📋 Available Workflows

### 1. Build and Publish Docker Image

**File**: `.github/workflows/build-and-publish.yml`

**Triggers**:
- Push to `main` branch
- Create tags (e.g., `v1.0.0`)
- Pull requests to `main` (builds but doesn't push)

**Actions**:
- Builds Docker image using your `Dockerfile`
- Publishes to GitHub Container Registry: `ghcr.io/{username}/{repository}`
- Uses semantic versioning for tags
- Enables Docker layer caching for faster builds

**Output**: Docker image available at `ghcr.io/{username}/{repository}:{tag}`

### 2. Render Video

**File**: `.github/workflows/render-video.yml`

**Triggers**:
- Manual workflow dispatch (with customizable parameters)
- Daily schedule at 2 AM UTC (with default parameters)

**Actions**:
- Pulls the latest Docker image
- Runs video rendering with custom parameters
- Stores video files as GitHub artifacts
- Creates GitHub releases with video attachments

**Parameters** (for manual runs):
- `title`: Video title (default: "Hello World")
- `subtitle`: Video subtitle (default: "Welcome to Remotion")
- `content_header`: Content section header (default: "Discover More")
- `outro_message`: Outro message (default: "Thank You!")

### 3. Upload to Releases

**File**: `.github/workflows/upload-to-releases.yml`

**Triggers**:
- Automatically runs after successful video rendering

**Actions**:
- Downloads video artifacts from the render workflow
- Creates GitHub releases with video files
- Adds comments to workflow runs with download links

## 🎬 Using the Video Rendering Workflow

### Manual Rendering

1. **Navigate to Actions**:
   - Go to your repository on GitHub
   - Click the **Actions** tab

2. **Select Workflow**:
   - Click on **"Render Video"** workflow

3. **Run Workflow**:
   - Click **"Run workflow"** button
   - Select branch (usually `main`)
   - Customize video parameters:
     - **Title**: Main video title
     - **Subtitle**: Secondary text
     - **Content Header**: Section header
     - **Outro Message**: Final message
   - Click **"Run workflow"**

4. **Monitor Progress**:
   - Watch the workflow run in real-time
   - Check logs for any errors
   - Download artifacts when complete

### Automated Rendering

The workflow runs daily at 2 AM UTC with default parameters:
- Title: "Hello World"
- Subtitle: "Welcome to Remotion"
- Content Header: "Discover More"
- Outro Message: "Thank You!"

## 📦 Docker Image Management

### Image Tags

The build workflow creates multiple tags:

- **Branch tags**: `ghcr.io/{username}/{repository}:main`
- **PR tags**: `ghcr.io/{username}/{repository}:pr-{number}`
- **Version tags**: `ghcr.io/{username}/{repository}:v1.0.0`
- **SHA tags**: `ghcr.io/{username}/{repository}:main-{sha}`

### Local Testing

Test the Docker image locally:

```bash
# Build and push locally
./scripts/build-and-push.sh v1.0.0

# Test with custom parameters
./scripts/test-local.sh "Custom Title" "Custom Subtitle" "Custom Header" "Custom Outro"
```

## 📁 Video Output Storage

### GitHub Artifacts

- **Location**: Workflow run artifacts
- **Retention**: 30 days
- **Access**: Download from Actions tab
- **Format**: MP4 files

### GitHub Releases

- **Location**: Repository releases
- **Retention**: Permanent
- **Access**: Direct download links
- **Format**: MP4 files attached to releases

### Example Release Structure

```
Video Render #123
├── HelloWorld.mp4 (8.2 MB)
└── Release notes with render details
```

## 🔧 Customization

### Modify Video Parameters

Edit `.github/workflows/render-video.yml`:

```yaml
inputs:
  title:
    description: 'Video title'
    required: false
    default: 'Your Custom Title'
    type: string
```

### Change Schedule

Edit the cron schedule in `.github/workflows/render-video.yml`:

```yaml
schedule:
  # Run every Monday at 9 AM UTC
  - cron: '0 9 * * 1'
```

### Add More Video Formats

Modify `render.mjs` to output multiple formats:

```javascript
// Add WebM output
await renderMedia({
  codec: 'vp8',
  composition,
  serveUrl: bundled,
  outputLocation: path.join(outputDir, `${composition.id}.webm`),
  inputProps,
});
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Permission Denied
**Error**: `Error: write /usr/src/app/out: permission denied`

**Solution**: The Dockerfile already creates the output directory with proper permissions. Ensure the workflow uses the correct volume mount.

#### 2. Docker Image Not Found
**Error**: `Error response from daemon: manifest for ghcr.io/... not found`

**Solution**: 
1. Check that the build workflow completed successfully
2. Verify the image name matches your repository
3. Ensure you're logged into GitHub Container Registry

#### 3. Video Rendering Fails
**Error**: Chrome/Chromium related errors

**Solution**: The Dockerfile includes all necessary Chrome dependencies. Check the workflow logs for specific error messages.

### Debugging Steps

1. **Check Workflow Logs**:
   - Go to Actions tab
   - Click on the failed workflow run
   - Review step-by-step logs

2. **Test Locally**:
   ```bash
   ./scripts/test-local.sh
   ```

3. **Verify Docker Image**:
   ```bash
   docker pull ghcr.io/{username}/{repository}:main
   docker run --rm ghcr.io/{username}/{repository}:main
   ```

## 📊 Monitoring and Notifications

### Workflow Status

- **Green**: Success - video rendered and stored
- **Yellow**: In progress - rendering video
- **Red**: Failed - check logs for errors

### Notifications

Configure repository notifications:
1. Go to repository Settings → Notifications
2. Enable notifications for:
   - Workflow runs
   - Releases
   - Packages

### Metrics

Track usage in GitHub Insights:
- Workflow run frequency
- Artifact storage usage
- Release creation rate

## 🔐 Security Considerations

### Secrets Management

The workflows use `GITHUB_TOKEN` which is automatically provided by GitHub Actions. No additional secrets are required.

### Container Security

- Images are built from official Node.js base
- Non-root user runs the application
- Minimal dependencies installed
- Regular security updates via base image

### Access Control

- Repository permissions control workflow access
- Package permissions control image publishing
- Release permissions control video storage

## 📚 Advanced Usage

### API Integration

Trigger video rendering via GitHub API:

```bash
curl -X POST \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/{owner}/{repo}/actions/workflows/render-video.yml/dispatches \
  -d '{"ref":"main","inputs":{"title":"API Generated","subtitle":"Via GitHub API"}}'
```

### Batch Processing

Create multiple videos with different parameters:

```yaml
# In your workflow
- name: Render multiple videos
  run: |
    for i in {1..5}; do
      docker run --rm \
        -v $(pwd)/output:/usr/src/app/out \
        -e TITLE="Video $i" \
        -e SUBTITLE="Batch $i" \
        ghcr.io/{username}/{repository}:main
    done
```

### Custom Storage

Upload videos to external storage:

```yaml
- name: Upload to S3
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1

- name: Upload video
  run: |
    aws s3 cp ./output/*.mp4 s3://your-bucket/videos/
```

---

**Need help?** Check the [main README](../README.md) or create an issue in the repository. 