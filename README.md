# Vokabelheft - Vocabulary Notebook

A modern web application for learning German and English vocabulary with audio transcription and translation capabilities.

## Features

- **Two-Column Design**: Clean German ↔ English layout
- **Audio Input**: Speak words/phrases for automatic transcription
- **Manual Correction**: Fix transcription errors with an easy-to-use interface
- **Translation Services**: Multiple options including:
  - **Local dictionary** - Offline German ↔ English lookup using Ubuntu's installed `translate` package
  - **Vokabelheft A.I.** - AI-powered translation using Mistral
  - **DeepL** - High-quality translation API
  - **Google Translate** - Google's translation service
  - **Bing Translate** - Microsoft's Azure Translator
- **Vocabulary Management**: Add, edit, delete, save, and load vocabulary entries
- **Persistent Storage**: Vocabulary is saved to browser localStorage
- **Export/Import**: Save vocabulary as JSON files
- **Responsive Design**: Works on desktop and mobile devices
- **Keyboard Shortcuts**: Speed up your workflow
- **Dark Mode**: Toggle between light and dark themes
- **Multi-Language UI**: Switch between English and German interface

## Quick Start

### Run with Node.js Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. The inline Search buttons use the system `translate` package and its German-English dictionary. Install it on the same machine as the server if necessary:
   ```bash
   sudo apt install translate
   ```
   Package details: [Ubuntu `translate` source package](https://launchpad.net/ubuntu/resolute/+source/translate).

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. In `.env`, replace the placeholders only for the hosted services you plan to use. See [Translation Services](#translation-services) for each provider's requirements.

5. Start the server:
   ```bash
   npm start
   ```

6. Open `http://localhost:3007` (or the port configured in `.env`).

Opening `index.html` directly does not enable the local dictionary or hosted API routes; the server is required for search and translation.

### Development Mode

For development with auto-restart:

```bash
npm run dev
```

## Usage

### Adding Vocabulary

1. **Manual Entry**: Type German and English words in their respective fields
2. **Single-Word Entry**: You can add just a German word OR just an English word, then edit later to add the translation
3. **Audio Input**: Click the microphone button (🎤) to record your voice
4. **Auto-Translate**: Click the translate button (↔️) to automatically translate
5. **Add to List**: Click "Add to Vocabulary" or press `Ctrl+Enter`

### Audio Transcription

1. Click the microphone button for the language you want to speak
2. Allow microphone access when prompted
3. Speak clearly and the text will be transcribed automatically
4. If the transcription is incorrect, you'll be prompted to correct it

### Translation

1. Enter a word in either language field.
2. Click the adjacent **Search** button to look it up in the local `translate` dictionary, or click **Translate** to check your saved vocabulary first and then query the local dictionary.
3. The result appears in the other field. The dictionary is offline and limited to entries installed with the package.
4. Use a named provider button for hosted translation; it requires that service's credentials below.
5. Click "Add to Vocabulary" to save both words.

Use **⇄ German ↔ English** in the header to switch the language direction. Existing text moves with its language, and search, provider translation, vocabulary entry, and speech recognition follow the switched labels. Local dictionary searches use the `translate` package's whole-word (`-w`) mode for both directions. Speech-recognition final full stops are removed before the transcription is entered.

### Managing Vocabulary

- **Edit**: Click the edit button (✏️) on any entry to edit it. If you added a single word, the app will automatically focus on the missing field
- **Delete**: Click the delete button (🗑️) to remove an entry
- **Save**: Click "Save Vocabulary" to export as JSON file
- **Load**: Click "Load Vocabulary" to import from JSON file
- **Clear**: Click "Clear All" to remove all entries (with confirmation)

### Dark Mode

- **Toggle**: Click the moon/sun button (🌙/☀️) in the header to switch between light and dark themes
- **Persistent**: Your preference is saved and remembered for future visits
- **Comfortable**: Reduces eye strain in low-light conditions

### Language Toggle

- **Toggle**: Click the globe button (🌐) in the top left to switch between English and German interface
- **Full Translation**: All buttons, labels, and messages change to the selected language
- **Persistent**: Your language preference is saved automatically

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Add to Vocabulary |
| `Ctrl + T` | Translate |
| `Ctrl + S` | Save Vocabulary |
| `Escape` | Close modal |

## Translation Services

Hosted provider buttons make requests through the Node server, keeping credentials out of browser JavaScript. Set up only the services you intend to use:

| Service | Required setup |
| --- | --- |
| Local dictionary | The Ubuntu/Debian `translate` package and its `de-en` dictionary must be installed on the server host. No API key is required. |
| DeepL | A DeepL API key in `DEEPL_API_KEY`. The server currently uses the DeepL API Free endpoint. |
| Google | A Google Cloud API key in `GOOGLE_TRANSLATE_API_KEY`, with Cloud Translation API enabled and billing configured. |
| Bing | An Azure Translator key in `BING_API_KEY` and matching Azure region in `BING_REGION`. |
| Mistral / Vokabelheft A.I. | A Mistral API key in `MISTRAL_API_KEY`; the model defaults to `mistral-small-latest` and can be set with `MISTRAL_MODEL`. |

You can enter and save each service key separately in **Settings**. Keys saved there are stored in this browser's local storage and sent to the server only when calling the matching provider. They are not encrypted by the browser; use server-side environment variables instead on shared devices. A key saved in Settings takes precedence over that service's server environment key for requests from that browser.

## API Keys

### DeepL API Key

1. Go to [DeepL API](https://www.deepl.com/pro-api)
2. Sign up for a free account
3. Create a new API key
4. Add it to your `.env` file as `DEEPL_API_KEY`

**Note**: The server currently uses DeepL API Free. For plan limits, see [DeepL Pricing](https://www.deepl.com/pro-api#pricing).

### Google Translate API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Cloud Translation API
4. Create an API key
5. Add it to your `.env` file

**Note**: Google Cloud Translation requires billing and API access to be enabled for the project.

### Bing Translate API Key (Azure Cognitive Services)

1. Go to [Azure Portal](https://portal.azure.com/)
2. Create a new resource
3. Search for "Translator" and create a Translator resource
4. Go to Keys and Endpoint in your resource
5. Copy one of the keys and add it to `.env` as `BING_API_KEY`; set `BING_REGION` to the region shown for that Translator resource.

**Note**: You'll need an Azure account and Translator resource; use that resource's region and credentials.

### Mistral API Key (for Vokabelheft A.I.)

1. Go to [Mistral AI](https://mistral.ai/)
2. Sign up for an account
3. Get your API key from the dashboard
4. Add it to your `.env` file as `MISTRAL_API_KEY`

**Note**: Vokabelheft A.I. uses Mistral's API to provide AI-powered translations with a simple, clean interface.

## Browser Support

- **Chrome**: Full support (recommended)
- **Edge**: Full support
- **Firefox**: Full support
- **Safari**: Limited support (speech recognition may vary)
- **Mobile browsers**: Limited support (desktop recommended)

## Project Structure

```
Vokabelheft/
├── index.html          # Main HTML file
├── app.js             # Frontend JavaScript
├── styles.css         # All styles
├── server.js          # Backend server (optional)
├── package.json       # Node.js dependencies
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express (optional)
- **APIs**: DeepL Translation API, Google Translate API
- **Browser APIs**: Web Speech API, LocalStorage, File API

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4F46E5;
    --success-color: #10B981;
    --danger-color: #EF4444;
    /* ... etc */
}
```

### Adding More Languages

The app is designed for German ↔ English, but you can modify the language settings in `app.js`:

```javascript
// Change recognition language
recognition.lang = language === 'german' ? 'de-DE' : 'en-US';

// For other languages, use appropriate BCP 47 codes
// French: 'fr-FR'
// Spanish: 'es-ES'
// etc.
```

## Troubleshooting

### Speech Recognition Not Working

- Make sure you're using Chrome, Edge, or Firefox
- Allow microphone access when prompted
- Check that your microphone is working properly
- Try refreshing the page

### Translation Not Working

- Start the app with `npm start`; opening the HTML file directly does not provide backend routes.
- For local search, verify `translate -l de-en -n -w Haus` works on the server host and that the dictionary is installed.
- For hosted services, verify the matching environment variable, API access, region, billing, and quota. Provider failures are reported rather than silently substituted.

### Vocabulary Not Saving

- Check browser localStorage settings
- Make sure you're not in private/incognito mode
- Try clearing your browser cache

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - Feel free to use, modify, and distribute.

## Credits

- **Concept**: Vokabelheft (Vocabulary Notebook)
- **Design**: Clean, modern UI with German-English focus
- **Technologies**: Web Speech API, Fetch API, LocalStorage

---

**Vokabelheft** - Improve your vocabulary with ease! 📚✨

*Built with ❤️ for language learners*