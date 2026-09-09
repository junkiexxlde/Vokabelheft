// ===== Vokabelheft - Main Application JavaScript =====

// Application state
const AppState = {
    vocabulary: [],
    currentRecording: null,
    currentLanguage: 'german', // 'german' or 'english'
    mediaRecorder: null,
    audioChunks: [],
    isProcessing: false,
    config: {
        deeplApiKey: '',
        googleApiKey: '',
        bingApiKey: '',
        mistralApiKey: ''
    },
    darkMode: false,
    language: 'en' // 'en' for English, 'de' for German
};

// Language data
const translations = {
    en: {
        appTitle: 'Vokabelheft | Vocabulary Notebook',
        subtitle: 'German ↔ English Learning Tool',
        germanColumn: 'German',
        englishColumn: 'English',
        recordBtn: 'Record',
        stopBtn: 'Stop',
        translateBtn: 'Translate',
        swapBtn: 'Swap',
        addVocabBtn: 'Add to Vocabulary',
        saveBtn: 'Save Vocabulary',
        loadBtn: 'Load Vocabulary',
        clearBtn: 'Clear All',
        vocabTitle: 'Your Vocabulary List',
        vocabCount: 'entries',
        noEntries: 'No vocabulary entries yet. Add your first word!',
        editBtn: 'Edit',
        deleteBtn: 'Delete',
        saveBtnText: 'Save',
        loadBtnText: 'Load',
        clearBtnText: 'Clear All',
        darkModeBtn: 'Toggle Dark Mode',
        languageBtn: 'Toggle Language',
        toastAddedComplete: 'Added complete vocabulary entry!',
        toastAddedGerman: 'Added German word. Edit later to add English translation.',
        toastAddedEnglish: 'Added English word. Edit later to add German translation.',
        toastEditComplete: 'Editing vocabulary entry. Make changes and click "Add to Vocabulary"',
        toastEditGerman: 'Add English translation for this German word and click "Add to Vocabulary"',
        toastEditEnglish: 'Add German translation for this English word and click "Add to Vocabulary"',
        pleaseEnterWord: 'Please enter at least one word',
        entryExists: 'This vocabulary entry already exists!',
        germanExists: 'This German word is already in your vocabulary!',
        englishExists: 'This English word is already in your vocabulary!',
        toastVocabSaved: 'Vocabulary saved to file!',
        toastVocabLoaded: 'vocabulary entries loaded!',
        toastVocabCleared: 'All vocabulary entries cleared!',
        toastCorrectionApplied: 'Correction applied successfully!',
        toastTranslating: 'Translating...',
        toastTranslationComplete: 'Translation completed!',
        statusRecording: 'Recording... Speak now',
        statusProcessing: 'Processing...',
        statusSuccess: 'Success',
        statusError: 'Error',
        correctionModalTitle: 'Correct Transcription',
        correctionOriginal: 'Original:',
        correctionPlaceholder: 'Enter corrected text...',
        cancelBtn: 'Cancel',
        applyBtn: 'Apply Correction'
    },
    de: {
        appTitle: 'Vokabelheft | Vokabelheft',
        subtitle: 'Deutsch ↔ Englisch Lernhilfe',
        germanColumn: 'Deutsch',
        englishColumn: 'Englisch',
        recordBtn: 'Aufnehmen',
        stopBtn: 'Stoppen',
        translateBtn: 'Übersetzen',
        swapBtn: 'Tauschen',
        addVocabBtn: 'Zu Vokabeln hinzufügen',
        saveBtn: 'Vokabeln speichern',
        loadBtn: 'Vokabeln laden',
        clearBtn: 'Alles löschen',
        vocabTitle: 'Ihre Vokabelliste',
        vocabCount: 'Einträge',
        noEntries: 'Noch keine Vokabeleinträge. Fügen Sie Ihr erstes Wort hinzu!',
        editBtn: 'Bearbeiten',
        deleteBtn: 'Löschen',
        saveBtnText: 'Speichern',
        loadBtnText: 'Laden',
        clearBtnText: 'Alles löschen',
        darkModeBtn: 'Dark Mode umschalten',
        languageBtn: 'Sprache wechseln',
        toastAddedComplete: 'Vollständiger Vokabeleintrag hinzugefügt!',
        toastAddedGerman: 'Deutsches Wort hinzugefügt. Später englische Übersetzung ergänzen.',
        toastAddedEnglish: 'Englisches Wort hinzugefügt. Später deutsche Übersetzung ergänzen.',
        toastEditComplete: 'Vokabeleintrag bearbeiten. Änderungen vornehmen und auf "Zu Vokabeln hinzufügen" klicken',
        toastEditGerman: 'Fügen Sie die englische Übersetzung für dieses deutsche Wort hinzu und klicken Sie auf "Zu Vokabeln hinzufügen"',
        toastEditEnglish: 'Fügen Sie die deutsche Übersetzung für dieses englische Wort hinzu und klicken Sie auf "Zu Vokabeln hinzufügen"',
        pleaseEnterWord: 'Bitte geben Sie mindestens ein Wort ein',
        entryExists: 'Dieser Vokabeleintrag existiert bereits!',
        germanExists: 'Dieses deutsche Wort ist bereits in Ihrem Vokabelheft!',
        englishExists: 'Dieses englische Wort ist bereits in Ihrem Vokabelheft!',
        toastVocabSaved: 'Vokabeln in Datei gespeichert!',
        toastVocabLoaded: 'Vokabeleinträge geladen!',
        toastVocabCleared: 'Alle Vokabeleinträge gelöscht!',
        toastCorrectionApplied: 'Korrektur erfolgreich angewendet!',
        toastTranslating: 'Übersetzen...',
        toastTranslationComplete: 'Übersetzung abgeschlossen!',
        statusRecording: 'Aufnahme... Bitte sprechen',
        statusProcessing: 'Verarbeitung...',
        statusSuccess: 'Erfolg',
        statusError: 'Fehler',
        correctionModalTitle: 'Transkription korrigieren',
        correctionOriginal: 'Original:',
        correctionPlaceholder: 'Korrigierten Text eingeben...',
        cancelBtn: 'Abbrechen',
        applyBtn: 'Korrektur anwenden'
    }
};

// DOM Elements
const elements = {
    // Input elements
    germanInput: document.getElementById('germanInput'),
    englishInput: document.getElementById('englishInput'),
    germanStatus: document.getElementById('germanStatus'),
    englishStatus: document.getElementById('englishStatus'),
    
    // Recording buttons
    recordGermanBtn: document.getElementById('recordGermanBtn'),
    stopGermanBtn: document.getElementById('stopGermanBtn'),
    recordEnglishBtn: document.getElementById('recordEnglishBtn'),
    stopEnglishBtn: document.getElementById('stopEnglishBtn'),
    
    // Translation controls
    translateBtn: document.getElementById('translateBtn'),
    swapBtn: document.getElementById('swapBtn'),
    translationService: document.getElementById('translationService'),
    
    // Vocabulary controls
    addVocabBtn: document.getElementById('addVocabBtn'),
    vocabularyTableBody: document.getElementById('vocabularyTableBody'),
    vocabCount: document.getElementById('vocabCount'),
    
    // File operations
    saveBtn: document.getElementById('saveBtn'),
    loadBtn: document.getElementById('loadBtn'),
    clearBtn: document.getElementById('clearBtn'),
    fileInput: document.getElementById('fileInput'),
    
    // Modal
    correctionModal: document.getElementById('correctionModal'),
    originalText: document.getElementById('originalText'),
    correctedText: document.getElementById('correctedText'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    cancelCorrectionBtn: document.getElementById('cancelCorrectionBtn'),
    applyCorrectionBtn: document.getElementById('applyCorrectionBtn'),
    
    // Overlay
    loadingOverlay: document.getElementById('loadingOverlay'),
    loadingText: document.getElementById('loadingText'),
    
    // Toast
    toastContainer: document.getElementById('toastContainer'),
    
    // Canvas
    audioCanvas: document.getElementById('audioCanvas'),
    audioCtx: null,
    
    // Toggle buttons
    darkModeBtn: document.getElementById('darkModeBtn'),
    languageBtn: document.getElementById('languageBtn')
};

// Helper function to get current translation
function t(key) {
    return translations[AppState.language][key] || key;
}

// Helper function to update UI language
function updateLanguageUI() {
    // Update all UI elements with current language
    if (elements.germanInput) elements.germanInput.placeholder = t('germanColumn') + '...';
    if (elements.englishInput) elements.englishInput.placeholder = t('englishColumn') + '...';

    // Update button texts
    if (elements.addVocabBtn) elements.addVocabBtn.innerHTML = '<span class="btn-icon">➕</span> ' + t('addVocabBtn');
    if (elements.saveBtn) elements.saveBtn.innerHTML = '<span class="btn-icon">💾</span> ' + t('saveBtn');
    if (elements.loadBtn) elements.loadBtn.innerHTML = '<span class="btn-icon">📂</span> ' + t('loadBtn');
    if (elements.clearBtn) elements.clearBtn.innerHTML = '<span class="btn-icon">🗑️</span> ' + t('clearBtn');

    // Update toggle buttons
    if (elements.darkModeBtn) elements.darkModeBtn.title = t('darkModeBtn');
    if (elements.languageBtn) elements.languageBtn.title = t('languageBtn');

    // Update headers (guard selectors which may not exist)
    const germanTitleFlag = document.querySelector('.german-column .column-title .flag-emoji');
    const germanTitleText = document.querySelector('.german-column .column-title span:not(.flag-emoji)');
    const englishTitleFlag = document.querySelector('.english-column .column-title .flag-emoji');
    const englishTitleText = document.querySelector('.english-column .column-title span:not(.flag-emoji)');
    if (germanTitleFlag) germanTitleFlag.textContent = '🇩🇪';
    if (germanTitleText) germanTitleText.textContent = t('germanColumn');
    if (englishTitleFlag) englishTitleFlag.textContent = '🇬🇧';
    if (englishTitleText) englishTitleText.textContent = t('englishColumn');

    const vocabTitle = document.querySelector('.vocabulary-title');
    if (vocabTitle) vocabTitle.textContent = t('vocabTitle');

    // Update action buttons in vocabulary table
    const editButtons = document.querySelectorAll('.action-btn.edit');
    editButtons.forEach(btn => {
        btn.innerHTML = '<span>✏️</span> ' + t('editBtn');
    });

    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    deleteButtons.forEach(btn => {
        btn.innerHTML = '<span>🗑️</span> ' + t('deleteBtn');
    });

    // Update modal buttons
    if (elements.cancelCorrectionBtn) elements.cancelCorrectionBtn.textContent = t('cancelBtn');
    if (elements.applyCorrectionBtn) elements.applyCorrectionBtn.textContent = t('applyBtn');
    const modalTitle = document.querySelector('.modal-title');
    if (modalTitle) modalTitle.textContent = t('correctionModalTitle');
    const originalTextEl = document.querySelector('.original-text');
    if (originalTextEl) originalTextEl.textContent = t('correctionOriginal') + ' ';
    if (elements.correctedText) elements.correctedText.placeholder = t('correctionPlaceholder');
    
    // Update toast messages will use current language automatically
    updateVocabularyCount();
}

// Update vocabulary count with current language
function updateVocabularyCount() {
    elements.vocabCount.textContent = `${AppState.vocabulary.length} ${t('vocabCount')}`;
}

// ===== Initialization =====
function init() {
    setupEventListeners();
    loadConfig();
    loadPreferences();
    renderVocabulary();
    checkSpeechRecognitionSupport();
    checkMicrophoneSupport();
    
    // Load saved vocabulary from localStorage if exists
    loadVocabularyFromStorage();
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Attach event listeners only if the elements exist (prevents errors when index.html has different markup)
    if (elements.recordGermanBtn) elements.recordGermanBtn.addEventListener('click', () => startRecording('german'));
    if (elements.stopGermanBtn) elements.stopGermanBtn.addEventListener('click', () => stopRecording('german'));
    if (elements.recordEnglishBtn) elements.recordEnglishBtn.addEventListener('click', () => startRecording('english'));
    if (elements.stopEnglishBtn) elements.stopEnglishBtn.addEventListener('click', () => stopRecording('english'));

    if (elements.translateBtn) elements.translateBtn.addEventListener('click', translateText);
    if (elements.swapBtn) elements.swapBtn.addEventListener('click', swapInputs);

    if (elements.addVocabBtn) elements.addVocabBtn.addEventListener('click', addToVocabulary);

    if (elements.saveBtn) elements.saveBtn.addEventListener('click', saveVocabulary);
    if (elements.loadBtn && elements.fileInput) elements.loadBtn.addEventListener('click', () => elements.fileInput.click());
    if (elements.clearBtn) elements.clearBtn.addEventListener('click', clearVocabulary);
    if (elements.fileInput) elements.fileInput.addEventListener('change', loadVocabularyFromFile);

    if (elements.closeModalBtn) elements.closeModalBtn.addEventListener('click', closeCorrectionModal);
    if (elements.cancelCorrectionBtn) elements.cancelCorrectionBtn.addEventListener('click', closeCorrectionModal);
    if (elements.applyCorrectionBtn) elements.applyCorrectionBtn.addEventListener('click', applyCorrection);

    if (elements.germanInput) elements.germanInput.addEventListener('input', () => updateStatus('german'));
    if (elements.englishInput) elements.englishInput.addEventListener('input', () => updateStatus('english'));

    // Keyboard shortcuts (always attach)
    document.addEventListener('keydown', handleKeyboardShortcuts);

    if (elements.darkModeBtn) elements.darkModeBtn.addEventListener('click', toggleDarkMode);
    if (elements.languageBtn) elements.languageBtn.addEventListener('click', toggleLanguage);

    if (elements.correctionModal) {
        const content = elements.correctionModal.querySelector('.modal-content');
        if (content) content.addEventListener('click', (e) => e.stopPropagation());
        elements.correctionModal.addEventListener('click', closeCorrectionModal);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    AppState.darkMode = !AppState.darkMode;
    document.body.classList.toggle('dark-mode');
    
    // Update button icon
    if (AppState.darkMode) {
        elements.darkModeBtn.innerHTML = '<span class="toggle-icon">☀️</span>';
        elements.darkModeBtn.title = (AppState.language === 'de' ? 'Dark' : 'Light') + ' Mode';
    } else {
        elements.darkModeBtn.innerHTML = '<span class="toggle-icon">🌙</span>';
        elements.darkModeBtn.title = (AppState.language === 'de' ? 'Light' : 'Dark') + ' Mode';
    }
    
    // Save preference
    localStorage.setItem('darkMode', AppState.darkMode);
    showToast(AppState.darkMode ? (AppState.language === 'de' ? 'Dark Mode aktiviert' : 'Dark mode enabled') : (AppState.language === 'de' ? 'Light Mode aktiviert' : 'Light mode enabled'), 'info');
}

// Toggle language
function toggleLanguage() {
    const oldLanguage = AppState.language;
    AppState.language = AppState.language === 'en' ? 'de' : 'en';
    
    // Save preference
    localStorage.setItem('language', AppState.language);
    
    // Update UI
    updateLanguageUI();
    
    // Show message in new language
    const languageName = AppState.language === 'en' ? 'English' : 'Deutsch';
    showToast(`Sprache/Language switched to ${languageName}`, 'info');
}

// ===== Keyboard Shortcuts =====
function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + Enter to add to vocabulary
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        addToVocabulary();
    }
    
    // Ctrl/Cmd + T to translate
    if ((e.ctrlKey || e.metaKey) && e.key === 't' && !e.altKey) {
        e.preventDefault();
        translateText();
    }
    
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveVocabulary();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeCorrectionModal();
    }
}

// ===== Configuration =====
function loadConfig() {
    // Try to load API keys from localStorage
    AppState.config.deeplApiKey = localStorage.getItem('deeplApiKey') || '';
    // Use provided Google API key as default if none saved
    AppState.config.googleApiKey = localStorage.getItem('googleApiKey') || 'AIzaSyDSfSkNh7tGb9CQKXlPtcRvpItIufgegsE'.replace('AIzaSyDSfSkNh7tGb9CQKXlPtcRvpItIufgegsE','AIzaSyDSfSkNh7tGb9CQKXlPtcRvpItIufgegsE');
    AppState.config.bingApiKey = localStorage.getItem('bingApiKey') || '';
    AppState.config.mistralApiKey = localStorage.getItem('mistralApiKey') || '';
}

function loadPreferences() {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        AppState.darkMode = true;
        document.body.classList.add('dark-mode');
        if (elements.darkModeBtn) elements.darkModeBtn.innerHTML = '<span class="toggle-icon">☀️</span>';
    }
    
    // Load language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'de' || savedLanguage === 'en') {
        AppState.language = savedLanguage;
    }
    
    // Update UI based on loaded preferences
    updateLanguageUI();
}

// ===== Speech Recognition =====
let recognition = null;

function checkSpeechRecognitionSupport() {
    if ('webkitSpeechRecognition' in window) {
        // Chrome, Edge, Safari
        recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
        // Firefox
        recognition = new SpeechRecognition();
    } else {
        showToast('Speech recognition not supported in your browser. Try Chrome, Edge, or Firefox.', 'error');
        disableRecordingButtons();
        return false;
    }
    
    // Configure speech recognition
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'de-DE'; // Default to German
    
    recognition.onstart = () => {
        console.log('Speech recognition started');
    };
    
    recognition.onend = () => {
        console.log('Speech recognition ended');
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        const language = AppState.currentLanguage;
        const statusElement = language === 'german' ? elements.germanStatus : elements.englishStatus;
        const inputElement = language === 'german' ? elements.germanInput : elements.englishInput;
        
        updateStatus(language, 'error', `Error: ${event.error}`);
        inputElement.parentElement.classList.remove('recording');
        
        if (language === 'german') {
            elements.recordGermanBtn.classList.remove('hidden');
            elements.stopGermanBtn.classList.add('hidden');
        } else {
            elements.recordEnglishBtn.classList.remove('hidden');
            elements.stopEnglishBtn.classList.add('hidden');
        }
    };
    
    recognition.onresult = (event) => {
        const language = AppState.currentLanguage;
        const inputElement = language === 'german' ? elements.germanInput : elements.englishInput;
        const statusElement = language === 'german' ? elements.germanStatus : elements.englishStatus;
        
        const transcript = event.results[0][0].transcript;
        inputElement.value = transcript;
        
        updateStatus(language, 'success', 'Transcription complete');
        inputElement.parentElement.classList.remove('recording');
        
        // Show correction option if transcript might be incorrect
        if (language === 'german') {
            elements.recordGermanBtn.classList.remove('hidden');
            elements.stopGermanBtn.classList.add('hidden');
        } else {
            elements.recordEnglishBtn.classList.remove('hidden');
            elements.stopEnglishBtn.classList.add('hidden');
        }
        
        // Ask if user wants to correct the transcription
        setTimeout(() => {
            showCorrectionPrompt(transcript, language);
        }, 500);
    };
    
    return true;
}

function checkMicrophoneSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('Microphone access not supported in your browser.', 'error');
        disableRecordingButtons();
        return false;
    }
    return true;
}

function disableRecordingButtons() {
    elements.recordGermanBtn.disabled = true;
    elements.recordEnglishBtn.disabled = true;
    elements.recordGermanBtn.style.opacity = '0.5';
    elements.recordEnglishBtn.style.opacity = '0.5';
}

function startRecording(language) {
    AppState.currentLanguage = language;
    
    // Set recognition language
    recognition.lang = language === 'german' ? 'de-DE' : 'en-US';
    
    try {
        // Show recording state
        const inputElement = language === 'german' ? elements.germanInput : elements.englishInput;
        const statusElement = language === 'german' ? elements.germanStatus : elements.englishStatus;
        
        inputElement.parentElement.classList.add('recording');
        updateStatus(language, 'recording', 'Recording... Speak now');
        
        if (language === 'german') {
            elements.recordGermanBtn.classList.add('hidden');
            elements.stopGermanBtn.classList.remove('hidden');
        } else {
            elements.recordEnglishBtn.classList.add('hidden');
            elements.stopEnglishBtn.classList.remove('hidden');
        }
        
        // Clear previous input
        inputElement.value = '';
        
        // Start recording
        recognition.start();
        
    } catch (error) {
        console.error('Error starting recording:', error);
        showToast('Error starting recording: ' + error.message, 'error');
        stopRecording(language);
    }
}

function stopRecording(language) {
    try {
        recognition.stop();
        
        const inputElement = language === 'german' ? elements.germanInput : elements.englishInput;
        const statusElement = language === 'german' ? elements.germanStatus : elements.englishStatus;
        
        inputElement.parentElement.classList.remove('recording');
        updateStatus(language, '', '');
        
        if (language === 'german') {
            elements.recordGermanBtn.classList.remove('hidden');
            elements.stopGermanBtn.classList.add('hidden');
        } else {
            elements.recordEnglishBtn.classList.remove('hidden');
            elements.stopEnglishBtn.classList.add('hidden');
        }
        
    } catch (error) {
        console.error('Error stopping recording:', error);
    }
}

function showCorrectionPrompt(originalText, language) {
    // Only show correction prompt if the transcription seems uncertain
    // For now, we'll show it for all transcriptions
    const needsCorrection = confirm(`Transcription: "${originalText}"
Would you like to correct this transcription?`);
    
    if (needsCorrection) {
        showCorrectionModal(originalText, language);
    }
}

// ===== Correction Modal =====
let currentCorrectionLanguage = '';

function showCorrectionModal(originalText, language) {
    currentCorrectionLanguage = language;
    elements.originalText.textContent = originalText;
    elements.correctedText.value = originalText;
    elements.correctionModal.classList.remove('hidden');
    elements.correctedText.focus();
}

function closeCorrectionModal() {
    elements.correctionModal.classList.add('hidden');
    currentCorrectionLanguage = '';
}

function applyCorrection() {
    const correctedText = elements.correctedText.value.trim();
    if (!correctedText) {
        showToast('Please enter a correction', 'error');
        return;
    }
    
    if (currentCorrectionLanguage === 'german') {
        elements.germanInput.value = correctedText;
    } else {
        elements.englishInput.value = correctedText;
    }
    
    updateStatus(currentCorrectionLanguage, 'success', 'Correction applied');
    closeCorrectionModal();
    showToast('Correction applied successfully!', 'success');
}

// ===== Status Updates =====
function updateStatus(language, type = '', message = '') {
    const statusElement = language === 'german' ? elements.germanStatus : elements.englishStatus;
    
    // Remove all classes
    statusElement.className = 'input-status';
    
    // Add specific class if type is provided
    if (type) {
        statusElement.classList.add(type);
    }
    
    statusElement.textContent = message;
}

// ===== Translation =====
async function translateText() {
    const germanText = elements.germanInput.value.trim();
    const englishText = elements.englishInput.value.trim();
    const service = elements.translationService.value;
    
    // Determine source and target
    let sourceLang, targetLang, textToTranslate;
    
    if (germanText && !englishText) {
        // German to English
        sourceLang = 'DE';
        targetLang = 'EN';
        textToTranslate = germanText;
    } else if (englishText && !germanText) {
        // English to German
        sourceLang = 'EN';
        targetLang = 'DE';
        textToTranslate = englishText;
    } else if (germanText && englishText) {
        // Both have text, ask which to translate
        const choice = confirm('Both fields have text. Translate German to English? (Click OK for German→English, Cancel for English→German)');
        if (choice) {
            sourceLang = 'DE';
            targetLang = 'EN';
            textToTranslate = germanText;
        } else {
            sourceLang = 'EN';
            targetLang = 'DE';
            textToTranslate = englishText;
        }
    } else {
        showToast('Please enter text to translate', 'error');
        return;
    }
    
    if (!textToTranslate) {
        showToast('No text to translate', 'error');
        return;
    }
    
    // Show loading state
    showLoading('Translating...');
    AppState.isProcessing = true;
    
    try {
        let translation = '';
        
        if (service === 'vokabelheft-ai') {
            translation = await translateWithVokabelheftAI(textToTranslate, sourceLang, targetLang);
        } else if (service === 'deepl') {
            translation = await translateWithDeepL(textToTranslate, sourceLang, targetLang);
        } else if (service === 'google') {
            translation = await translateWithGoogle(textToTranslate, sourceLang, targetLang);
        } else if (service === 'bing') {
            translation = await translateWithBing(textToTranslate, sourceLang, targetLang);
        } else {
            translation = await translateWithDeepL(textToTranslate, sourceLang, targetLang);
        }
        
        if (translation) {
            if (targetLang === 'EN') {
                elements.englishInput.value = translation;
                updateStatus('english', 'success', 'Translation complete');
            } else {
                elements.germanInput.value = translation;
                updateStatus('german', 'success', 'Translation complete');
            }
            showToast('Translation completed!', 'success');
        } else if (service === 'google') {
            showToast('Google Translate was opened in a new tab.', 'info');
        } else {
            showToast('Translation failed. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Translation error:', error);
        showToast('Translation error: ' + error.message, 'error');
    } finally {
        hideLoading();
        AppState.isProcessing = false;
    }
}

async function translateWithDeepL(text, sourceLang, targetLang) {
    // Use DeepL API only for provider buttons. No prompt here: caller decides how to handle missing key.
    const apiKey = AppState.config.deeplApiKey;
    
    if (!apiKey) {
        throw new Error('DeepL API key is required');
    }
    
    // Save the key for future use
    if (!AppState.config.deeplApiKey) {
        AppState.config.deeplApiKey = apiKey;
        localStorage.setItem('deeplApiKey', apiKey);
    }
    
    const url = 'https://api-free.deepl.com/v2/translate';
    const params = new URLSearchParams({
        auth_key: apiKey,
        text: text,
        source_lang: sourceLang,
        target_lang: targetLang
    });
    
    try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();
        
        if (data.translations && data.translations.length > 0) {
            return data.translations[0].text;
        } else {
            throw new Error(data.message || 'Translation failed');
        }
    } catch (error) {
        console.error('DeepL API error:', error);
        throw error;
    }
}

async function translateWithGoogle(text, sourceLang, targetLang) {
    const cleanText = (text || '').trim();
    if (!cleanText) {
        throw new Error('No text to translate');
    }

    const sourceCode = (sourceLang || 'de').toLowerCase();
    const targetCode = (targetLang || 'en').toLowerCase();
    const apiKey = AppState.config.googleApiKey;

    if (!apiKey) {
        throw new Error('Google API key is required');
    }

    const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: cleanText,
            source: sourceCode,
            target: targetCode,
            format: 'text'
        })
    });

    if (!response.ok) {
        throw new Error('Google Translate request failed');
    }

    const data = await response.json();
    const translated = data?.data?.translations?.[0]?.translatedText;

    if (!translated) {
        throw new Error('Google Translate returned no result');
    }

    return translated;
}

async function translateWithBing(text, sourceLang, targetLang) {
    // Bing Translator API (Azure Cognitive Services)
    const apiKey = AppState.config.bingApiKey;
    
    if (!apiKey) {
        throw new Error('Bing Translator API key is required');
    }
    
    if (!AppState.config.bingApiKey) {
        AppState.config.bingApiKey = apiKey;
        localStorage.setItem('bingApiKey', apiKey);
    }
    
    // Azure region (using global as default)
    const region = 'global';
    const endpoint = `https://api.cognitive.microsofttranslator.com`;
    
    try {
        const response = await fetch(`${endpoint}/translate?api-version=3.0&from=${sourceLang.toLowerCase()}&to=${targetLang.toLowerCase()}`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Ocp-Apim-Subscription-Region': region,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([{ text: text }])
        });
        
        const data = await response.json();
        
        if (data && data.length > 0 && data[0].translations && data[0].translations.length > 0) {
            return data[0].translations[0].text;
        } else {
            throw new Error(data.error?.message || 'Translation failed');
        }
    } catch (error) {
        console.error('Bing Translator API error:', error);
        // Fallback to Vokabelheft A.I. if Bing fails
        showToast('Bing Translator API failed. Trying Vokabelheft A.I....', 'warning');
        return translateWithVokabelheftAI(text, sourceLang, targetLang);
    }
}

async function translateWithVokabelheftAI(text, sourceLang, targetLang) {
    // Vokabelheft A.I. - Simple AI-powered translator using Mistral
    const apiKey = AppState.config.mistralApiKey;
    
    if (!apiKey) {
        throw new Error('Mistral API key is required for Vokabelheft A.I.');
    }
    
    if (!AppState.config.mistralApiKey) {
        AppState.config.mistralApiKey = apiKey;
        localStorage.setItem('mistralApiKey', apiKey);
    }
    
    // Convert language codes to language names for the prompt
    const languageMap = {
        'DE': 'German',
        'EN': 'English',
        'FR': 'French',
        'ES': 'Spanish',
        'IT': 'Italian',
        'NL': 'Dutch',
        'PL': 'Polish',
        'RU': 'Russian',
        'PT': 'Portuguese',
        'JA': 'Japanese',
        'ZH': 'Chinese'
    };
    
    const sourceLanguage = languageMap[sourceLang] || sourceLang;
    const targetLanguage = languageMap[targetLang] || targetLang;
    
    const translationPrompt = `You are a professional translator. Please translate the following text from ${sourceLanguage} to ${targetLanguage}. Only provide the translation, without any additional text, explanations, or formatting. The text to translate is: "${text}"`;
    
    try {
        // Use Mistral's API
        const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'mistral-tiny',
                messages: [
                    {
                        role: 'user',
                        content: translationPrompt
                    }
                ],
                temperature: 0.1,
                max_tokens: 200
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            const translation = data.choices[0].message.content.trim();
            
            // Remove any quotes or formatting that might have been added
            return translation.replace(/^['""]|['""]$/g, '');
        } else {
            throw new Error(data.error?.message || 'Translation failed');
        }
    } catch (error) {
        console.error('Mistral API error:', error);
        // Fallback to DeepL if Mistral fails
        showToast('Vokabelheft A.I. failed. Trying DeepL...', 'warning');
        return translateWithDeepL(text, sourceLang, targetLang);
    }
}

// ===== Swap Functionality =====
function swapInputs() {
    const temp = elements.germanInput.value;
    elements.germanInput.value = elements.englishInput.value;
    elements.englishInput.value = temp;
    
    // Swap status
    const germanStatus = elements.germanStatus.textContent;
    const englishStatus = elements.englishStatus.textContent;
    elements.germanStatus.textContent = englishStatus;
    elements.englishStatus.textContent = germanStatus;
    
    showToast('Inputs swapped!', 'info');
}

// ===== Vocabulary Management =====
function addToVocabulary() {
    const germanText = elements.germanInput.value.trim();
    const englishText = elements.englishInput.value.trim();
    
    if (!germanText && !englishText) {
        showToast(t('Please enter at least one word'), 'error');
        return;
    }
    
    // Only check for duplicates if both fields have content
    // If only one field has content, always allow adding
    if (germanText && englishText) {
        const exists = AppState.vocabulary.some(
            item => item.german === germanText && item.english === englishText
        );
        
        if (exists) {
            showToast(t('This vocabulary entry already exists!'), 'warning');
            return;
        }
    } else if (germanText) {
        // Check if a German-only entry with this text already exists
        const exists = AppState.vocabulary.some(
            item => item.german === germanText && !item.english
        );
        if (exists) {
            showToast(t('This German word is already in your vocabulary!'), 'warning');
            return;
        }
    } else if (englishText) {
        // Check if an English-only entry with this text already exists
        const exists = AppState.vocabulary.some(
            item => item.english === englishText && !item.german
        );
        if (exists) {
            showToast(t('This English word is already in your vocabulary!'), 'warning');
            return;
        }
    }
    
    // Add to vocabulary
    AppState.vocabulary.push({
        id: Date.now(),
        german: germanText,
        english: englishText,
        createdAt: new Date().toISOString()
    });
    
    // Clear inputs
    elements.germanInput.value = '';
    elements.englishInput.value = '';
    updateStatus('german', '', '');
    updateStatus('english', '', '');
    
    // Save to localStorage
    saveVocabularyToStorage();
    
    // Render vocabulary list
    renderVocabulary();
    
    // Custom toast message based on what was added
    if (germanText && englishText) {
        showToast(t('toastAddedComplete'), 'success');
    } else if (germanText) {
        showToast(t('toastAddedGerman'), 'success');
    } else {
        showToast(t('toastAddedEnglish'), 'success');
    }
}

function renderVocabulary() {
    const tbody = elements.vocabularyTableBody;
    tbody.innerHTML = '';
    
    // Update count
    elements.vocabCount.textContent = `${AppState.vocabulary.length} entries`;
    
    if (AppState.vocabulary.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="no-entries">
                    <div class="no-entries-content">
                        <span class="no-entries-icon">📝</span>
                        <p>${t('noEntries')}</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Create a sorted copy (German first, fallback to English)
    const sorted = [...AppState.vocabulary].sort((a, b) => {
        const aKey = (a.german && a.german.trim()) ? a.german : (a.english || '');
        const bKey = (b.german && b.german.trim()) ? b.german : (b.english || '');
        return aKey.toLowerCase().localeCompare(bKey.toLowerCase(), undefined, { sensitivity: 'base' });
    });

    sorted.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.id = item.id;

        row.innerHTML = `
            <td class="german-cell">${escapeHtml(item.german) || '<span class="empty-placeholder">—</span>'}</td>
            <td class="english-cell">${escapeHtml(item.english) || '<span class="empty-placeholder">—</span>'}</td>
            <td class="actions-cell">
                <button class="action-btn search" onclick="searchVocabularyEntry(${item.id})" title="Search">
                    <span>🔎</span> Search
                </button>
                <button class="action-btn edit" onclick="editVocabularyEntry(${item.id})" title="Edit">
                    <span>✏️</span> Edit
                </button>
                <button class="action-btn delete" onclick="deleteVocabularyEntry(${item.id})" title="Delete">
                    <span>🗑️</span> Delete
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Open Google Translate web page for a vocabulary entry
function searchVocabularyEntry(id) {
    const entry = AppState.vocabulary.find(it => it.id === id);
    if (!entry) return;
    if (entry.german && entry.german.trim()) {
        openGoogleTranslate(entry.german, 'de', 'en');
    } else if (entry.english && entry.english.trim()) {
        openGoogleTranslate(entry.english, 'en', 'de');
    } else {
        showToast('No text to search', 'warning');
    }
}

// Lookup a translation from the local vocabulary store
function lookupTranslateFromVocabulary(text, sourceLang) {
    if (!text || !text.trim()) return null;
    const q = text.trim().toLowerCase();
    // Exact match first
    if (sourceLang.toLowerCase() === 'de') {
        let match = AppState.vocabulary.find(it => (it.german || '').toLowerCase() === q);
        if (match) return match.english || '';

        // Prefix match
        match = AppState.vocabulary.find(it => (it.german || '').toLowerCase().startsWith(q));
        if (match) return match.english || '';

        // Substring match
        match = AppState.vocabulary.find(it => (it.german || '').toLowerCase().includes(q));
        if (match) return match.english || '';
    } else if (sourceLang.toLowerCase() === 'en') {
        let match = AppState.vocabulary.find(it => (it.english || '').toLowerCase() === q);
        if (match) return match.german || '';

        // Prefix match
        match = AppState.vocabulary.find(it => (it.english || '').toLowerCase().startsWith(q));
        if (match) return match.german || '';

        // Substring match
        match = AppState.vocabulary.find(it => (it.english || '').toLowerCase().includes(q));
        if (match) return match.german || '';
    }

    // No match found
    return null;
}

function openGoogleTranslate(text, sourceLang, targetLang) {
    const q = encodeURIComponent(text.trim());
    const url = `https://translate.google.com/?sl=${sourceLang.toLowerCase()}&tl=${targetLang.toLowerCase()}&text=${q}&op=translate`;
    window.open(url, '_blank');
}

function translateFromVocabularyOrGoogle(text, sourceLang) {
    const cleanText = (text || '').trim();
    if (!cleanText) {
        showToast('Please enter text to translate', 'warning');
        return null;
    }

    const targetField = sourceLang === 'de' ? elements.englishInput : elements.germanInput;
    const targetLang = sourceLang === 'de' ? 'en' : 'de';
    const result = lookupTranslateFromVocabulary(cleanText, sourceLang);

    if (result !== null) {
        targetField.value = result;
        return result;
    }

    targetField.value = 'no match';<
    openGoogleTranslate(cleanText, sourceLang, targetLang);
    return null;
}

function editVocabularyEntry(id) {
    const entry = AppState.vocabulary.find(item => item.id === id);
    if (!entry) return;
    
    // Fill inputs with entry data
    elements.germanInput.value = entry.german || '';
    elements.englishInput.value = entry.english || '';
    
    // Remove old entry
    deleteVocabularyEntry(id, false);
    
    // Focus on the empty field if there is one, otherwise focus on German
    if (!entry.german && entry.english) {
        elements.germanInput.focus();
        showToast(t('toastEditEnglish'), 'info');
    } else if (!entry.english && entry.german) {
        elements.englishInput.focus();
        showToast(t('toastEditGerman'), 'info');
    } else {
        elements.germanInput.focus();
        showToast(t('toastEditComplete'), 'info');
    }
}

function deleteVocabularyEntry(id, showToastFlag = true) {
    const index = AppState.vocabulary.findIndex(item => item.id === id);
    if (index === -1) return;
    
    AppState.vocabulary.splice(index, 1);
    saveVocabularyToStorage();
    renderVocabulary();
    
    if (showToastFlag) {
        showToast('Vocabulary entry deleted!', 'success');
    }
}

// ===== Storage Functions =====
function saveVocabularyToStorage() {
    try {
        localStorage.setItem('vokabelheft_vocabulary', JSON.stringify(AppState.vocabulary));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadVocabularyFromStorage() {
    try {
        const saved = localStorage.getItem('vokabelheft_vocabulary');
        if (saved) {
            AppState.vocabulary = JSON.parse(saved);
            renderVocabulary();
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

// ===== File Operations =====
function saveVocabulary() {
    if (AppState.vocabulary.length === 0) {
        showToast('No vocabulary to save', 'warning');
        return;
    }
    
    const data = JSON.stringify({
        savedAt: new Date().toISOString(),
        vocabulary: AppState.vocabulary
    }, null, 2);
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `vokabelheft_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Vocabulary saved to file!', 'success');
}

function loadVocabularyFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            // Accept formats: { vocabulary: [...] } or an array [...]
            let imported = [];
            if (Array.isArray(data)) imported = data;
            else if (data && Array.isArray(data.vocabulary)) imported = data.vocabulary;
            else {
                showToast('Incompatible file format: expected array or { vocabulary: [...] }', 'error');
                elements.fileInput.value = '';
                return;
            }

            // Normalize and filter compatible entries
            const normalized = [];
            for (const item of imported) {
                if (!item || typeof item !== 'object') continue;
                const german = (item.german || item.de || item.DE || '').toString().trim();
                const english = (item.english || item.en || item.EN || '').toString().trim();
                // Only accept entries that have at least one non-empty side
                if (!german && !english) continue;
                normalized.push({ german, english });
            }

            if (normalized.length === 0) {
                showToast('No compatible vocabulary entries found in file', 'warning');
                elements.fileInput.value = '';
                return;
            }

            // Deduplicate imported entries (by german+english)
            const uniqueImported = [];
            const seenImported = new Set();
            for (const it of normalized) {
                const key = `${it.german.toLowerCase()}||${it.english.toLowerCase()}`;
                if (!seenImported.has(key)) {
                    seenImported.add(key);
                    uniqueImported.push(it);
                }
            }

            // Merge into existing vocabulary, skipping duplicates
            let added = 0;
            let skipped = 0;
            for (const it of uniqueImported) {
                const exists = AppState.vocabulary.some(v => ((v.german || '').toLowerCase() === it.german.toLowerCase() && (v.english || '').toLowerCase() === it.english.toLowerCase()));
                if (exists) {
                    skipped += 1;
                    continue;
                }
                AppState.vocabulary.push({ id: Date.now() + Math.floor(Math.random()*1000), german: it.german, english: it.english, createdAt: new Date().toISOString() });
                added += 1;
            }

            saveVocabularyToStorage();
            renderVocabulary();

            // Clear file input
            elements.fileInput.value = '';

            showToast(`Import complete: ${added} added, ${skipped} skipped (duplicates).`, 'success');
        } catch (error) {
            showToast('Error loading file: Invalid JSON or format', 'error');
            console.error('File loading error:', error);
        }
    };
    reader.onerror = () => {
        showToast('Error reading file', 'error');
    };

    reader.readAsText(file);
}

function clearVocabulary() {
    // Clear only the input text fields (German and English) and statuses
    if (elements.germanInput) elements.germanInput.value = '';
    if (elements.englishInput) elements.englishInput.value = '';
    if (elements.germanStatus) elements.germanStatus.textContent = '';
    if (elements.englishStatus) elements.englishStatus.textContent = '';
    showToast('Inputs cleared', 'info');
}

// ===== Loading Overlay =====
function showLoading(message = 'Processing...') {
    elements.loadingText.textContent = message;
    elements.loadingOverlay.classList.remove('hidden');
}

function hideLoading() {
    elements.loadingOverlay.classList.add('hidden');
}

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    if (!elements.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideIn 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.animation = 'toastSlideIn 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

// ===== Utility Functions =====
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', init);

// Make functions globally available for inline event handlers
window.editVocabularyEntry = editVocabularyEntry;
window.deleteVocabularyEntry = deleteVocabularyEntry;
// Expose translation helper functions for inline handlers
window.translateWithGoogle = translateWithGoogle;
window.translateWithDeepL = translateWithDeepL;
window.translateWithBing = translateWithBing;
window.translateWithVokabelheftAI = translateWithVokabelheftAI;
window.lookupTranslateFromVocabulary = lookupTranslateFromVocabulary;
window.translateFromVocabularyOrGoogle = translateFromVocabularyOrGoogle;

// Settings modal functions
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    modal.style.display = 'flex';
    renderSettingsList();
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    modal.style.display = 'none';
}

function renderSettingsList() {
    const tbody = document.getElementById('settingsVocabBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    AppState.vocabulary.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding:6px;border:1px solid #e5e7eb;"><input data-id="${item.id}" class="settings-german" value="${escapeHtml(item.german || '')}" style="width:100%;padding:6px;border:1px solid #ddd;border-radius:4px;" /></td>
            <td style="padding:6px;border:1px solid #e5e7eb;"><input data-id="${item.id}" class="settings-english" value="${escapeHtml(item.english || '')}" style="width:100%;padding:6px;border:1px solid #ddd;border-radius:4px;" /></td>
            <td style="padding:6px;border:1px solid #e5e7eb;text-align:center;">
                <button class="btn" data-action="save" data-id="${item.id}">Save</button>
                <button class="btn" data-action="delete" data-id="${item.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Attach handlers
    tbody.querySelectorAll('button[data-action="save"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            const germanInput = tbody.querySelector(`input.settings-german[data-id="${id}"]`);
            const englishInput = tbody.querySelector(`input.settings-english[data-id="${id}"]`);
            const entry = AppState.vocabulary.find(it => it.id === id);
            if (!entry) return;
            entry.german = germanInput.value.trim();
            entry.english = englishInput.value.trim();
            saveVocabularyToStorage();
            renderVocabulary();
            renderSettingsList();
            showToast('Entry updated', 'success');
        });
    });

    tbody.querySelectorAll('button[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            deleteVocabularyEntry(id, true);
            renderSettingsList();
        });
    });
}

function settingsAddEntry() {
    const g = document.getElementById('settingsGermanInput').value.trim();
    const e = document.getElementById('settingsEnglishInput').value.trim();
    if (!g && !e) {
        showToast('Please enter German or English text', 'warning');
        return;
    }
    AppState.vocabulary.push({ id: Date.now(), german: g, english: e, createdAt: new Date().toISOString() });
    saveVocabularyToStorage();
    renderVocabulary();
    renderSettingsList();
    document.getElementById('settingsGermanInput').value = '';
    document.getElementById('settingsEnglishInput').value = '';
    showToast('Entry added', 'success');
}

// Wire settings modal buttons (if present)
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'settingsBtn') openSettingsModal();
    if (e.target && e.target.id === 'settingsCloseBtn') closeSettingsModal();
    if (e.target && e.target.id === 'settingsAddBtn') settingsAddEntry();
});