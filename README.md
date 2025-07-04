# WhatsApp Chatbot library for SDKWA based on Telegraf

[![npm version](https://badge.fury.io/js/%40sdkwa%2Fwhatsapp-chatbot.svg)](https://badge.fury.io/js/%40sdkwa%2Fwhatsapp-chatbot)
[![Release](https://github.com/sdkwa/whatsapp-chatbot-js/actions/workflows/release.yml/badge.svg)](https://github.com/sdkwa/whatsapp-chatbot-js/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/@sdkwa/whatsapp-chatbot.svg)](https://www.npmjs.com/package/@sdkwa/whatsapp-chatbot)

This project extends Telegraf to support WhatsApp using the SDKWA WhatsApp API. It provides a seamless way to use the familiar Telegraf API with WhatsApp, including support for scenes, sessions, middleware, and all other Telegraf features.

**📦 Available on npm as [`@sdkwa/whatsapp-chatbot`](https://www.npmjs.com/package/@sdkwa/whatsapp-chatbot)**

## Features

✅ **Full Telegraf API Compatibility** - Use your existing Telegraf code with WhatsApp  
✅ **Clean WhatsAppBot Constructor** - Intuitive `new WhatsAppBot(config)` syntax  
✅ **Scenes Support** - Create complex conversation flows  
✅ **Sessions & Middleware** - Maintain state and add custom functionality  
✅ **Command Handling** - Handle `/start`, `/help`, and custom commands  
✅ **Text Messages** - Send and receive text messages seamlessly  
✅ **Auto-Detection** - Automatically detects WhatsApp vs Telegram configuration  

## Installation

```bash
npm install @sdkwa/whatsapp-chatbot
```

That's it! The package includes all necessary dependencies.

## Quick Start

1. **Install the package:**
   ```bash
   npm install @sdkwa/whatsapp-chatbot
   ```

2. **Get SDKWA credentials:**
   - Sign up at [SDKWA](https://sdkwa.pro)
   - Create a new instance
   - Get your `idInstance` and `apiTokenInstance`

3. **Create your bot:**
   ```javascript
   const { WhatsAppBot } = require('@sdkwa/whatsapp-chatbot');
   
   const bot = new WhatsAppBot({
     idInstance: 'your-instance-id',
     apiTokenInstance: 'your-api-token'
   });
   
   bot.start((ctx) => ctx.reply('Hello WhatsApp!'));
   bot.launch();
   ```

## Usage

### Basic WhatsApp Bot

```javascript
const { WhatsAppBot } = require('@sdkwa/whatsapp-chatbot');

// WhatsApp configuration (object format)
const whatsappConfig = {
  idInstance: 'your-instance-id',     // Your SDKWA instance ID
  apiTokenInstance: 'your-whatsapp-token',       // Your SDKWA API token
  apiUrl: 'https://api.sdkwa.pro' // SDKWA API URL (optional)
};

// Create bot - much cleaner syntax!
const bot = new WhatsAppBot(whatsappConfig);

// Use familiar Telegraf API
bot.start((ctx) => {
  ctx.reply('Hello from WhatsApp bot!');
});

bot.on('text', (ctx) => {
  ctx.reply(`You said: ${ctx.message.text}`);
});

bot.launch();
```

### Advanced Example with Scenes

```javascript
const { WhatsAppBot, Scenes, session } = require('@sdkwa/whatsapp-chatbot');

// WhatsApp configuration
const whatsappConfig = {
  idInstance: 'your-instance-id',
  apiTokenInstance: 'your-whatsapp-token',
};

// Create a scene
const greetingScene = new Scenes.BaseScene('greeting');
greetingScene.enter((ctx) => ctx.reply('What\'s your name?'));
greetingScene.on('text', (ctx) => {
  ctx.reply(`Nice to meet you, ${ctx.message.text}!`);
  ctx.scene.leave();
});

// Set up bot with scenes
const stage = new Scenes.Stage([greetingScene]);
const bot = new WhatsAppBot(whatsappConfig);

bot.use(session());
bot.use(stage.middleware());

bot.command('greet', (ctx) => ctx.scene.enter('greeting'));

bot.launch();
```

## Configuration

### WhatsApp Configuration Format

The WhatsApp configuration can be provided as a JavaScript object:

```javascript
const config = {
  idInstance: "your-instance-id",
  apiTokenInstance: "your-api-token", 
  apiUrl: "https://api.sdkwa.pro"  // Optional, defaults to api.sdkwa.pro
};

const bot = new WhatsAppBot(config);
```

**Alternative: Legacy JSON string format (still supported):**
```javascript
const { Telegraf } = require('@sdkwa/whatsapp-chatbot');

const bot = new Telegraf(JSON.stringify({
  idInstance: "your-instance-id",
  apiTokenInstance: "your-api-token"
}));
```

### Getting SDKWA Credentials

1. Sign up at [SDKWA](https://sdkwa.pro)
2. Create a new instance
3. Get your `idInstance` and `token` from the dashboard
4. Use these credentials in your bot configuration

## API Compatibility

| Feature | Telegram | WhatsApp | Notes |
|---------|----------|----------|-------|
| Text Messages | ✅ | ✅ | Full support |
| Commands | ✅ | ✅ | `/start`, `/help`, custom commands |
| Scenes | ✅ | ✅ | Complete scene support |
| Sessions | ✅ | ✅ | Memory and custom stores |
| Middleware | ✅ | ✅ | All middleware types |
| Inline Keyboards | ✅ | ⚠️ | Limited WhatsApp support |
| File Upload | ✅ | ✅ | Planned |
| Groups | ✅ | 🔄 | Planned |

## Examples

See the `examples/` directory for more examples:

- `whatsapp-telegraf-example.js` - Basic usage
- `whatsapp-complete-example.js` - Advanced features with scenes


## Limitations

- WhatsApp has different capabilities than Telegram (inline keyboards, different file handling, etc.)
- Rate limiting may apply based on your SDKWA plan
- Some advanced Telegram features may not have WhatsApp equivalents

## Troubleshooting

### Common Issues

**Bot not detecting WhatsApp config:**
- Ensure the token is a valid JSON string
- Check that `idInstance` and `apiTokenInstance` properties are present

**API errors:**
- Verify your SDKWA credentials are correct
- Check that your instance is active and verified
- Ensure you have sufficient API quota

**Installation errors:**
- Try using `npm install @sdkwa/whatsapp-chatbot --legacy-peer-deps` if there are peer dependency conflicts
- Make sure you're using Node.js version 16 or higher

**Import errors:**
- Make sure you're importing from `@sdkwa/whatsapp-chatbot` not `telegraf`
- Check that the package is properly installed in your `node_modules`

## License

Same as Telegraf - MIT License
