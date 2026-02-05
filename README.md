# JobJourney MCP

MCP (Model Context Protocol) server for [JobJourney](https://jobjourney.me) - track job applications and network with professionals using AI.

## Features

- **Save Jobs** - Save job applications to track
- **Get Jobs** - List and filter your saved jobs
- **Update Status** - Track application progress (applied → interview → offer)
- **Find Coffee Contacts** - Discover professionals for networking

## Setup

### 1. Get Your API Key

1. Log into [JobJourney](https://jobjourney.me)
2. Go to **Profile → API Keys**
3. Click **Generate New Key**
4. Copy the key (shown only once)

---

### Option A: Claude Code (CLI)

Run this command in your terminal:

```bash
claude mcp add jobjourney \
  -e JOBJOURNEY_API_URL=https://api.jobjourney.me \
  -e JOBJOURNEY_API_KEY=jj_your_api_key_here \
  -- npx -y jobjourney-mcp
```

Or add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "jobjourney": {
      "command": "npx",
      "args": ["-y", "jobjourney-mcp"],
      "env": {
        "JOBJOURNEY_API_URL": "https://api.jobjourney.me",
        "JOBJOURNEY_API_KEY": "jj_your_api_key_here"
      }
    }
  }
}
```

---

### Option B: Claude Desktop (App)

Edit your Claude Desktop config file:

- **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "jobjourney": {
      "command": "npx",
      "args": ["-y", "jobjourney-mcp"],
      "env": {
        "JOBJOURNEY_API_URL": "https://api.jobjourney.me",
        "JOBJOURNEY_API_KEY": "jj_your_api_key_here"
      }
    }
  }
}
```

Then restart Claude Desktop.

---

## Usage Examples

Just talk naturally to Claude:

> "Save a Software Engineer job at Google in San Francisco"

> "Show me all the jobs I've applied to"

> "Update my Netflix application to interview stage"

> "Find someone in tech I can have coffee with"

## Available Tools

| Tool | Description |
|------|-------------|
| `save_job` | Save a new job application |
| `get_jobs` | List jobs with optional filters |
| `update_job_status` | Update application status |
| `find_coffee_contacts` | Find networking contacts |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `JOBJOURNEY_API_URL` | API endpoint (default: https://api.jobjourney.me) |
| `JOBJOURNEY_API_KEY` | Your API key from JobJourney settings |

## Links

- [JobJourney Website](https://jobjourney.me)
- [Setup Guide](https://jobjourney.me/mcp-setup)
- [GitHub Repository](https://github.com/Rorogogogo/jobjourney-mcp)
- [Report Issues](https://github.com/Rorogogogo/jobjourney-mcp/issues)

## License

MIT
