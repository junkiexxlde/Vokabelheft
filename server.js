const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the project root (so files like app.js and styles.css are found)
app.use(express.static(path.join(__dirname)));
// Keep existing public folder support as fallback
app.use(express.static(path.join(__dirname, 'public')));

// ===== API Routes =====

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        version: '1.1.0',
        features: ['deepl', 'google', 'bing', 'mistral']
    });
});

// DeepL Translation
app.post('/api/translate/deepl', async (req, res) => {
    try {
        const { text, source_lang, target_lang } = req.body;
        const apiKey = process.env.DEEPL_API_KEY || req.body.api_key;
        
        if (!apiKey) {
            return res.status(400).json({ 
                error: 'DeepL API key is required' 
            });
        }
        
        if (!text) {
            return res.status(400).json({ 
                error: 'Text to translate is required' 
            });
        }
        
        const url = 'https://api-free.deepl.com/v2/translate';
        const params = new URLSearchParams({
            auth_key: apiKey,
            text: text,
            source_lang: source_lang || 'DE',
            target_lang: target_lang || 'EN'
        });
        
        const response = await axios.get(`${url}?${params}`);
        
        if (response.data.translations && response.data.translations.length > 0) {
            res.json({
                translation: response.data.translations[0].text,
                source: 'deepl',
                success: true
            });
        } else {
            res.status(400).json({
                error: 'Translation failed',
                details: response.data
            });
        }
        
    } catch (error) {
        console.error('DeepL translation error:', error);
        res.status(500).json({
            error: 'Translation failed',
            details: error.message
        });
    }
});

// Google Translate (placeholder - requires proper API setup)
app.post('/api/translate/google', async (req, res) => {
    try {
        const { text, source, target } = req.body;
        const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY || req.body.api_key;
        
        if (!apiKey) {
            return res.status(400).json({ 
                error: 'Google API key is required' 
            });
        }
        
        if (!text) {
            return res.status(400).json({ 
                error: 'Text to translate is required' 
            });
        }
        
        // Note: This is a placeholder. Google Cloud Translation API v2 is deprecated.
        // You would need to implement the proper API call for your setup.
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                q: text,
                source: source || 'de',
                target: target || 'en',
                format: 'text'
            }
        );
        
        if (response.data.data && response.data.data.translations) {
            res.json({
                translation: response.data.data.translations[0].translatedText,
                source: 'google',
                success: true
            });
        } else {
            res.status(400).json({
                error: 'Translation failed',
                details: response.data
            });
        }
        
    } catch (error) {
        console.error('Google translation error:', error);
        res.status(500).json({
            error: 'Translation failed',
            details: error.message
        });
    }
});

// Get supported languages for DeepL
app.get('/api/languages/deepl', async (req, res) => {
    try {
        const apiKey = process.env.DEEPL_API_KEY || req.query.api_key;
        
        if (!apiKey) {
            return res.status(400).json({ 
                error: 'DeepL API key is required' 
            });
        }
        
        const url = 'https://api-free.deepl.com/v2/languages';
        const params = new URLSearchParams({
            auth_key: apiKey,
            type: 'target' // or 'source'
        });
        
        const response = await axios.get(`${url}?${params}`);
        res.json(response.data);
        
    } catch (error) {
        console.error('Error fetching DeepL languages:', error);
        res.status(500).json({
            error: 'Failed to fetch languages',
            details: error.message
        });
    }
});

// Speech to Text (placeholder - would use a speech recognition API)
app.post('/api/speech-to-text', async (req, res) => {
    try {
        const { audio, language } = req.body;
        
        // This is a placeholder. In a real implementation, you would:
        // 1. Save the audio data to a temporary file
        // 2. Send it to a speech recognition API (Google, AWS, Azure, etc.)
        // 3. Return the transcription
        
        res.status(501).json({
            error: 'Speech to text not implemented on server',
            message: 'Use client-side speech recognition instead'
        });
        
    } catch (error) {
        console.error('Speech to text error:', error);
        res.status(500).json({
            error: 'Speech to text failed',
            details: error.message
        });
    }
});

// Bing Translation
app.post('/api/translate/bing', async (req, res) => {
    try {
        const { text, from, to } = req.body;
        const apiKey = process.env.BING_API_KEY || req.body.api_key;
        
        if (!apiKey) {
            return res.status(400).json({ 
                error: 'Bing Translator API key is required' 
            });
        }
        
        if (!text) {
            return res.status(400).json({ 
                error: 'Text to translate is required' 
            });
        }
        
        // Azure region (using global as default)
        const region = 'global';
        const endpoint = 'https://api.cognitive.microsofttranslator.com';
        
        const response = await axios.post(
            `${endpoint}/translate?api-version=3.0&from=${from || 'de'}&to=${to || 'en'}`,
            [{ text: text }],
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': apiKey,
                    'Ocp-Apim-Subscription-Region': region,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        if (response.data && response.data.length > 0 && response.data[0].translations) {
            res.json({
                translation: response.data[0].translations[0].text,
                source: 'bing',
                success: true
            });
        } else {
            res.status(400).json({
                error: 'Translation failed',
                details: response.data
            });
        }
        
    } catch (error) {
        console.error('Bing translation error:', error);
        res.status(500).json({
            error: 'Translation failed',
            details: error.message
        });
    }
});

// Mistral AI Translation (Vokabelheft A.I.)
app.post('/api/translate/mistral', async (req, res) => {
    try {
        const { text, source_lang, target_lang } = req.body;
        const apiKey = process.env.MISTRAL_API_KEY || req.body.api_key;
        
        if (!apiKey) {
            return res.status(400).json({ 
                error: 'Mistral API key is required' 
            });
        }
        
        if (!text) {
            return res.status(400).json({ 
                error: 'Text to translate is required' 
            });
        }
        
        // Language mapping for the prompt
        const languageMap = {
            'DE': 'German', 'EN': 'English', 'FR': 'French', 'ES': 'Spanish',
            'IT': 'Italian', 'NL': 'Dutch', 'PL': 'Polish', 'RU': 'Russian',
            'PT': 'Portuguese', 'JA': 'Japanese', 'ZH': 'Chinese'
        };
        
        const sourceLanguage = languageMap[source_lang] || source_lang || 'German';
        const targetLanguage = languageMap[target_lang] || target_lang || 'English';
        
        const translationPrompt = `You are a professional translator. Please translate the following text from ${sourceLanguage} to ${targetLanguage}. Only provide the translation, without any additional text, explanations, or formatting. The text to translate is: "${text}"`;
        
        const response = await axios.post(
            'https://api.mistral.ai/v1/chat/completions',
            {
                model: 'mistral-tiny',
                messages: [{ role: 'user', content: translationPrompt }],
                temperature: 0.1,
                max_tokens: 200
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        );
        
        if (response.data.choices && response.data.choices.length > 0) {
            const translation = response.data.choices[0].message.content.trim();
            res.json({
                translation: translation.replace(/^['"]|['"]$/g, ''),
                source: 'mistral',
                success: true
            });
        } else {
            res.status(400).json({
                error: 'Translation failed',
                details: response.data
            });
        }
        
    } catch (error) {
        console.error('Mistral translation error:', error);
        res.status(500).json({
            error: 'Translation failed',
            details: error.message
        });
    }
});

// ===== Vocabulary Management Routes =====

// Get all vocabulary
app.get('/api/vocabulary', (req, res) => {
    // In a real implementation, this would fetch from a database
    // For now, we'll just serve the static HTML file
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Save vocabulary (placeholder)
app.post('/api/vocabulary', (req, res) => {
    // This would save to a database in a real implementation
    res.json({
        success: true,
        message: 'Vocabulary saved (placeholder)'
    });
});

// ===== Serve the main page for all other routes =====
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ===== Error Handling =====
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ===== Start Server =====
app.listen(PORT, () => {
    console.log(`✅ Vokabelheft server running on port ${PORT}`);
    console.log(`🌐 Open your browser to: http://localhost:${PORT}`);
    
    if (!process.env.DEEPL_API_KEY) {
        console.log('⚠️  Warning: DeepL API key not found in environment variables.');
        console.log('   Set DEEPL_API_KEY in your .env file for translation functionality.');
    }
    
    if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
        console.log('ℹ️  Info: Google Translate API key not found.');
        console.log('   Google translation will use DeepL as fallback.');
    }
});

// Handle process termination gracefully
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

module.exports = app;