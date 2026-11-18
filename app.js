// ===== Vokabelheft - Main Application JavaScript =====

// Application state
const AppState = {
    vocabulary: [],
    currentRecording: null,
    currentLanguage: 'german', // 'german' or 'english'
    mediaRecorder: null,
    audioChunks: [],
    isProcessing: false,
    languagesSwapped: false,
    apiKeys: {
        deepl: '',
        google: '',
        bing: '',
        mistral: ''
    },
    darkMode: false,
    language: 'de', // 'en' for English, 'de' for German
    activePage: 'vocabulary'
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
        clearInputsBtn: 'Clear inputs',
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
        clearInputsBtn: 'Eingaben leeren',
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

const siteTranslations = {
    de: {
        navLabel: 'Hauptnavigation',
        brandLabel: 'Vokabelheft Startseite',
        brandSubtitle: 'Lernbereich',
        workspaceLabel: 'Arbeitsbereich',
        vocabularyNav: 'Vokabeln',
        settingsNav: 'Einstellungen',
        preferencesLabel: 'Einstellungen',
        toggleTheme: 'Darstellung umschalten',
        toggleLanguage: 'Sprache wechseln',
        darkMode: 'Dunkles Design',
        lightModeLabel: 'Helles Design',
        languageSwitch: 'English',
        sidebarFootnote: 'Ein ruhiger Ort, um deine Sprachkenntnisse zu erweitern.',
        learningSpace: 'LERNBEREICH',
        export: 'Exportieren',
        import: 'Importieren',
        personalDictionary: 'DEIN PERSÖNLICHES WÖRTERBUCH',
        buildVocabulary: 'Baue deinen Wortschatz auf',
        workspaceIntro: 'Schlage Wörter nach, füge sie deiner Sammlung hinzu und lerne in deinem Tempo weiter.',
        swapLanguages: 'Deutsch und Englisch tauschen',
        translatorLabel: 'Wortübersetzer',
        quickLookup: 'Schnellsuche',
        quickLookupIntro: 'Durchsuche das Offline-Wörterbuch oder übersetze mit einem Anbieter.',
        offlineDictionary: 'Offline-Wörterbuch',
        german: 'Deutsch',
        english: 'Englisch',
        germanText: 'Deutscher Text',
        englishText: 'Englischer Text',
        speak: 'Sprechen',
        stop: 'Stopp',
        search: 'Suchen',
        translate: 'Übersetzen',
        providerLabel: 'Mit einem Anbieter übersetzen',
        useService: 'Anbieter verwenden',
        wholeWordHint: 'Die Suche findet exakte Wörter im lokalen Wörterbuch.',
        addVocab: 'Zu Vokabeln hinzufügen',
        clearInputs: 'Eingaben leeren',
        yourCollection: 'DEINE SAMMLUNG',
        vocabList: 'Vokabelliste',
        manageEntries: 'Einträge verwalten',
        actions: 'Aktionen',
        personalize: 'ARBEITSBEREICH ANPASSEN',
        settingsIntro: 'Verwalte Übersetzungsdienste und bearbeite deine gespeicherten Vokabeln.',
        translationServices: 'ÜBERSETZUNGSDIENSTE',
        apiKeys: 'API-Schlüssel',
        apiKeyIntro: 'Schlüssel werden in diesem Browser gespeichert und nur an den ausgewählten Dienst gesendet.',
        deeplKey: 'DeepL-API-Schlüssel',
        deeplDesc: 'Gib deinen DeepL-Schlüssel ein, um DeepL-Übersetzungen zu aktivieren.',
        deeplPlaceholder: 'DeepL-API-Schlüssel eingeben',
        googleKey: 'Google-Übersetzungs-API-Schlüssel',
        googleDesc: 'Verbinde Google Cloud Translation für Online-Übersetzungen.',
        googlePlaceholder: 'Google-API-Schlüssel eingeben',
        bingKey: 'Bing-Übersetzungs-API-Schlüssel',
        bingDesc: 'Verwende einen Azure-Translator-Schlüssel. Lege die Region in der Serverumgebung fest.',
        bingPlaceholder: 'Bing-API-Schlüssel eingeben',
        mistralKey: 'Mistral-API-Schlüssel',
        mistralDesc: 'Aktiviere KI-gestützte Übersetzungen mit Mistral.',
        mistralPlaceholder: 'Mistral-API-Schlüssel eingeben',
        saveKey: 'Schlüssel speichern',
        defaultsTitle: 'Standardeinstellungen',
        defaultsEyebrow: 'DARSTELLUNG & SPRACHE',
        defaultsIntro: 'Diese Auswahl wird beim nächsten Öffnen der App verwendet.',
        defaultMode: 'Standarddarstellung',
        lightMode: 'Hell',
        darkModeOption: 'Dunkel',
        defaultLanguage: 'Standardsprache',
        manageVocab: 'Vokabeln verwalten',
        manageVocabIntro: 'Füge Wörter hinzu oder bearbeite und lösche vorhandene Einträge.',
        germanWord: 'Deutsches Wort',
        englishWord: 'Englisches Wort',
        addEntry: 'Eintrag hinzufügen',
        save: 'Speichern',
        delete: 'Löschen',
        noEntriesShort: 'Noch keine Vokabeleinträge vorhanden.',
        searchAction: 'Suchen',
        edit: 'Bearbeiten',
        deleteAction: 'Löschen'
    },
    en: {
        navLabel: 'Main navigation',
        brandLabel: 'Vokabelheft home',
        brandSubtitle: 'Vocabulary workspace',
        workspaceLabel: 'Workspace',
        vocabularyNav: 'Vocabulary',
        settingsNav: 'Settings',
        preferencesLabel: 'Preferences',
        toggleTheme: 'Toggle appearance',
        toggleLanguage: 'Switch language',
        darkMode: 'Dark mode',
        lightModeLabel: 'Light mode',
        languageSwitch: 'Deutsch',
        sidebarFootnote: 'A calm space to build your language skills.',
        learningSpace: 'LEARNING SPACE',
        export: 'Export',
        import: 'Import',
        personalDictionary: 'YOUR PERSONAL DICTIONARY',
        buildVocabulary: 'Build your vocabulary',
        workspaceIntro: 'Look up a word, add it to your collection, and keep learning at your own pace.',
        swapLanguages: 'Switch German and English',
        translatorLabel: 'Word translator',
        quickLookup: 'Quick lookup',
        quickLookupIntro: 'Search your offline dictionary or translate with a provider.',
        offlineDictionary: 'Offline dictionary',
        german: 'German',
        english: 'English',
        germanText: 'German text',
        englishText: 'English text',
        speak: 'Speak',
        stop: 'Stop',
        search: 'Search',
        translate: 'Translate',
        providerLabel: 'Translate with a provider',
        useService: 'Use a service',
        wholeWordHint: 'Search finds exact words in the local dictionary.',
        addVocab: 'Add to vocabulary',
        clearInputs: 'Clear inputs',
        yourCollection: 'YOUR COLLECTION',
        vocabList: 'Vocabulary list',
        manageEntries: 'Manage entries',
        actions: 'Actions',
        personalize: 'PERSONALIZE YOUR WORKSPACE',
        settingsIntro: 'Manage translation services and edit your saved vocabulary.',
        translationServices: 'TRANSLATION SERVICES',
        apiKeys: 'API keys',
        apiKeyIntro: 'Keys are saved in this browser and sent only to the selected service.',
        deeplKey: 'DeepL API key',
        deeplDesc: 'Enter your DeepL key to enable DeepL translations.',
        deeplPlaceholder: 'Enter DeepL API key',
        googleKey: 'Google Translate API key',
        googleDesc: 'Connect Google Cloud Translation for hosted translations.',
        googlePlaceholder: 'Enter Google API key',
        bingKey: 'Bing Translator API key',
        bingDesc: 'Use an Azure Translator key. Set the region in your server environment.',
        bingPlaceholder: 'Enter Bing API key',
        mistralKey: 'Mistral API key',
        mistralDesc: 'Enable AI-powered translations with Mistral.',
        mistralPlaceholder: 'Enter Mistral API key',
        saveKey: 'Save key',
        defaultsTitle: 'Default preferences',
        defaultsEyebrow: 'APPEARANCE & LANGUAGE',
        defaultsIntro: 'These choices will be used the next time you open the app.',
        defaultMode: 'Default appearance',
        lightMode: 'Light',
        darkModeOption: 'Dark',
        defaultLanguage: 'Default language',
        manageVocab: 'Manage vocabulary',
        manageVocabIntro: 'Add, edit, or delete saved vocabulary entries.',
        germanWord: 'German word',
        englishWord: 'English word',
        addEntry: 'Add entry',
        save: 'Save',
        delete: 'Delete',
        noEntriesShort: 'No vocabulary entries yet.',
        searchAction: 'Search',
        edit: 'Edit',
        deleteAction: 'Delete'
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

function ui(key) {
    return siteTranslations[AppState.language][key] || key;
}

function applySiteTranslations() {
    document.documentElement.lang = AppState.language;
    document.title = AppState.language === 'de'
        ? 'Vokabelheft'
        : 'Vokabelheft | Vocabulary Notebook';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if (siteTranslations[AppState.language][key]) {
            element.textContent = siteTranslations[AppState.language][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        if (siteTranslations[AppState.language][key]) {
            element.placeholder = siteTranslations[AppState.language][key];
        }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.dataset.i18nAria;
        if (siteTranslations[AppState.language][key]) {
            element.setAttribute('aria-label', siteTranslations[AppState.language][key]);
        }
    });
    const languageLabel = elements.languageBtn?.querySelector('span:last-child');
    if (languageLabel) languageLabel.textContent = ui('languageSwitch');
}

// Helper function to update UI language
function updateLanguageUI() {
    applySiteTranslations();

    // Update all UI elements with current language
    updateLanguageDirectionUI();

    // Update button texts
    if (elements.addVocabBtn) elements.addVocabBtn.innerHTML = '<span class="btn-icon">➕</span> ' + t('addVocabBtn');
    if (elements.saveBtn) elements.saveBtn.innerHTML = '<span class="btn-icon">💾</span> ' + t('saveBtn');
    if (elements.loadBtn) elements.loadBtn.innerHTML = '<span class="btn-icon">📂</span> ' + t('loadBtn');
    if (elements.clearBtn) elements.clearBtn.innerHTML = '<span class="btn-icon">×</span> ' + t('clearInputsBtn');

    // Update toggle buttons
    if (elements.darkModeBtn) elements.darkModeBtn.title = t('darkModeBtn');
    if (elements.languageBtn) elements.languageBtn.title = t('languageBtn');
    if (elements.languageBtn) elements.languageBtn.setAttribute('aria-label', ui('toggleLanguage'));

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
    const currentPageTitle = document.getElementById('currentPageTitle');
    if (currentPageTitle) currentPageTitle.textContent = AppState.activePage === 'settings' ? ui('settingsNav') : ui('vocabularyNav');
    renderVocabulary();
    if (AppState.activePage === 'settings') renderSettingsList();
}

// Update vocabulary count with current language
function updateVocabularyCount() {
    elements.vocabCount.textContent = `${AppState.vocabulary.length} ${t('vocabCount')}`;
    const sidebarCount = document.getElementById('sidebarVocabCount');
    if (sidebarCount) sidebarCount.textContent = AppState.vocabulary.length;
}

function getInputForLanguage(language) {
    const germanInput = AppState.languagesSwapped ? elements.englishInput : elements.germanInput;
    const englishInput = AppState.languagesSwapped ? elements.germanInput : elements.englishInput;
    return language === 'german' || language === 'de' ? germanInput : englishInput;
}

function getStatusForLanguage(language) {
    const germanStatus = AppState.languagesSwapped ? elements.englishStatus : elements.germanStatus;
    const englishStatus = AppState.languagesSwapped ? elements.germanStatus : elements.englishStatus;
    return language === 'german' || language === 'de' ? germanStatus : englishStatus;
}

function getRecordingButtons(language) {
    const useLeftColumn = language === 'german' ? !AppState.languagesSwapped : AppState.languagesSwapped;
    return useLeftColumn
        ? { record: elements.recordGermanBtn, stop: elements.stopGermanBtn }
        : { record: elements.recordEnglishBtn, stop: elements.stopEnglishBtn };
}

function getLanguageForSlot(slot) {
    if (slot === 'german') return AppState.languagesSwapped ? 'en' : 'de';
    return AppState.languagesSwapped ? 'de' : 'en';
}

function updateLanguageDirectionUI() {
    const label = language => language === 'de' ? t('germanColumn') : t('englishColumn');
    const leftLanguage = getLanguageForSlot('german');
    const rightLanguage = getLanguageForSlot('english');
    const leftHeading = document.getElementById('leftLanguageHeading');
    const rightHeading = document.getElementById('rightLanguageHeading');
    const swapButton = document.getElementById('swapLanguagesBtn');

    if (leftHeading) leftHeading.textContent = label(leftLanguage);
    if (rightHeading) rightHeading.textContent = label(rightLanguage);
    if (elements.germanInput) {
        elements.germanInput.placeholder = `${label(leftLanguage)}...`;
        elements.germanInput.setAttribute('aria-label', ui(leftLanguage === 'de' ? 'germanText' : 'englishText'));
    }
    if (elements.englishInput) {
        elements.englishInput.placeholder = `${label(rightLanguage)}...`;
        elements.englishInput.setAttribute('aria-label', ui(rightLanguage === 'de' ? 'germanText' : 'englishText'));
    }
    const leftDot = document.getElementById('leftLanguageDot');
    const rightDot = document.getElementById('rightLanguageDot');
    if (leftDot) {
        leftDot.classList.toggle('german-dot', leftLanguage === 'de');
        leftDot.classList.toggle('english-dot', leftLanguage === 'en');
    }
    if (rightDot) {
        rightDot.classList.toggle('german-dot', rightLanguage === 'de');
        rightDot.classList.toggle('english-dot', rightLanguage === 'en');
    }
    if (swapButton) {
        swapButton.innerHTML = `<span aria-hidden="true">⇄</span> ${label(leftLanguage)} ↔ ${label(rightLanguage)}`;
        swapButton.setAttribute('aria-label', ui('swapLanguages'));
        swapButton.setAttribute('aria-pressed', String(AppState.languagesSwapped));
    }
}

// ===== Initialization =====
function init() {
    setupEventListeners();
    loadApiKeys();
    loadPreferences();
    renderVocabulary();
    checkSpeechRecognitionSupport();
    checkMicrophoneSupport();
    
    // Load saved vocabulary from localStorage if exists
    loadVocabularyFromStorage();
    showAppPage('vocabulary', false);
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Attach event listeners only if the elements exist (prevents errors when index.html has different markup)
    if (elements.recordGermanBtn) elements.recordGermanBtn.addEventListener('click', () => startRecording(getLanguageForSlot('german') === 'de' ? 'german' : 'english'));
    if (elements.stopGermanBtn) elements.stopGermanBtn.addEventListener('click', () => stopRecording(getLanguageForSlot('german') === 'de' ? 'german' : 'english'));
    if (elements.recordEnglishBtn) elements.recordEnglishBtn.addEventListener('click', () => startRecording(getLanguageForSlot('english') === 'de' ? 'german' : 'english'));
    if (elements.stopEnglishBtn) elements.stopEnglishBtn.addEventListener('click', () => stopRecording(getLanguageForSlot('english') === 'de' ? 'german' : 'english'));

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

    if (elements.germanInput) elements.germanInput.addEventListener('input', () => updateStatus(getLanguageForSlot('german') === 'de' ? 'german' : 'english'));
    if (elements.englishInput) elements.englishInput.addEventListener('input', () => updateStatus(getLanguageForSlot('english') === 'de' ? 'german' : 'english'));

    // Keyboard shortcuts (always attach)
    document.addEventListener('keydown', handleKeyboardShortcuts);

    if (elements.darkModeBtn) elements.darkModeBtn.addEventListener('click', toggleDarkMode);
    if (elements.languageBtn) elements.languageBtn.addEventListener('click', toggleLanguage);
    const defaultModeSelect = document.getElementById('defaultModeSelect');
    const defaultLanguageSelect = document.getElementById('defaultLanguageSelect');
    if (defaultModeSelect) defaultModeSelect.addEventListener('change', saveDefaultPreferences);
    if (defaultLanguageSelect) defaultLanguageSelect.addEventListener('change', saveDefaultPreferences);
    const swapLanguagesButton = document.getElementById('swapLanguagesBtn');
    if (swapLanguagesButton) swapLanguagesButton.addEventListener('click', swapInputs);

    [
        ['translateDeEnDeepL', 'deepl', 'german'],
        ['translateEnDeDeepL', 'deepl', 'english'],
        ['translateDeEnGoogle', 'google', 'german'],
        ['translateEnDeGoogle', 'google', 'english'],
        ['translateDeEnBing', 'bing', 'german'],
        ['translateEnDeBing', 'bing', 'english'],
        ['translateDeEnMistral', 'mistral', 'german'],
        ['translateEnDeMistral', 'mistral', 'english']
    ].forEach(([id, provider, sourceLang]) => {
        const button = document.getElementById(id);
        if (button) button.addEventListener('click', () => runProviderTranslate(provider, getLanguageForSlot(sourceLang)));
    });

    [
        ['translateDeEnGoogleInline', 'de', true],
        ['translateEnDeGoogleInline', 'en', true],
        ['searchDeInline', 'de', false],
        ['searchEnInline', 'en', false]
    ].forEach(([id, sourceLang, checkVocabularyFirst]) => {
        const button = document.getElementById(id);
        if (button) {
            const slot = sourceLang === 'de' ? 'german' : 'english';
            button.addEventListener('click', () => runInlineTranslation(getLanguageForSlot(slot), checkVocabularyFirst));
        }
    });

    if (elements.correctionModal) {
        const content = elements.correctionModal.querySelector('.modal-content');
        if (content) content.addEventListener('click', (e) => e.stopPropagation());
        elements.correctionModal.addEventListener('click', closeCorrectionModal);
    }
}

// Toggle dark mode
function toggleDarkMode() {
    AppState.darkMode = !AppState.darkMode;
    document.body.classList.toggle('dark-mode', AppState.darkMode);
    updateDarkModeUI();
    
    // Save preference
    localStorage.setItem('darkMode', String(AppState.darkMode));
    showToast(AppState.darkMode ? (AppState.language === 'de' ? 'Dark Mode aktiviert' : 'Dark mode enabled') : (AppState.language === 'de' ? 'Light Mode aktiviert' : 'Light mode enabled'), 'info');
}

function updateDarkModeUI() {
    if (!elements.darkModeBtn) return;

    elements.darkModeBtn.innerHTML = AppState.darkMode
        ? `<span aria-hidden="true">☀</span><span>${ui('lightModeLabel')}</span>`
        : `<span aria-hidden="true">◐</span><span>${ui('darkMode')}</span>`;
    elements.darkModeBtn.title = ui('toggleTheme');
    elements.darkModeBtn.setAttribute('aria-label', ui('toggleTheme'));
    elements.darkModeBtn.setAttribute('aria-pressed', String(AppState.darkMode));
}

// Toggle language
function toggleLanguage() {
    AppState.language = AppState.language === 'en' ? 'de' : 'en';
    
    // Save preference
    localStorage.setItem('language', AppState.language);
    
    // Update UI
    updateLanguageUI();
    updateDarkModeUI();
    
    // Show message in new language
    showToast(AppState.language === 'en' ? 'Language changed to English.' : 'Sprache auf Deutsch umgestellt.', 'info');
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

function loadPreferences() {
    let defaults = {};
    try {
        const storedDefaults = localStorage.getItem('vokabelheft_defaults');
        if (storedDefaults) {
            const parsedDefaults = JSON.parse(storedDefaults);
            if (parsedDefaults && typeof parsedDefaults === 'object' && !Array.isArray(parsedDefaults)) {
                defaults = parsedDefaults;
            }
        }
    } catch (error) {
        console.error('Could not load default preferences:', error);
        showToast(AppState.language === 'de'
            ? 'Standardeinstellungen konnten nicht geladen werden.'
            : 'Could not load default preferences.', 'error');
    }

    AppState.darkMode = typeof defaults.darkMode === 'boolean'
        ? defaults.darkMode
        : false;
    document.body.classList.toggle('dark-mode', AppState.darkMode);
    
    AppState.language = defaults.language === 'de' || defaults.language === 'en'
        ? defaults.language
        : 'de';

    const defaultModeSelect = document.getElementById('defaultModeSelect');
    const defaultLanguageSelect = document.getElementById('defaultLanguageSelect');
    if (defaultModeSelect) defaultModeSelect.value = typeof defaults.darkMode === 'boolean'
        ? (defaults.darkMode ? 'dark' : 'light')
        : 'light';
    if (defaultLanguageSelect) defaultLanguageSelect.value = defaults.language || 'de';
    
    // Update UI based on loaded preferences
    updateLanguageUI();
    updateDarkModeUI();
}

function saveDefaultPreferences() {
    const mode = document.getElementById('defaultModeSelect')?.value;
    const language = document.getElementById('defaultLanguageSelect')?.value;
    if (!['light', 'dark'].includes(mode) || !['de', 'en'].includes(language)) {
        showToast(AppState.language === 'de'
            ? 'Ungültige Standardeinstellung.'
            : 'Invalid default preference.', 'error');
        return;
    }

    const defaults = { darkMode: mode === 'dark', language };
    try {
        localStorage.setItem('vokabelheft_defaults', JSON.stringify(defaults));
    } catch (error) {
        console.error('Could not save default preferences:', error);
        showToast(AppState.language === 'de'
            ? 'Standardeinstellungen konnten nicht gespeichert werden.'
            : 'Could not save default preferences.', 'error');
        return;
    }

    AppState.darkMode = defaults.darkMode;
    AppState.language = defaults.language;
    document.body.classList.toggle('dark-mode', AppState.darkMode);
    localStorage.setItem('darkMode', String(AppState.darkMode));
    localStorage.setItem('language', AppState.language);
    updateLanguageUI();
    updateDarkModeUI();
    showToast(AppState.language === 'de'
        ? 'Standardsprache und Darstellung gespeichert.'
        : 'Default language and appearance saved.', 'success');
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
        const inputElement = getInputForLanguage(language);
        const buttons = getRecordingButtons(language);
        
        updateStatus(language, 'error', `Error: ${event.error}`);
        inputElement.parentElement.classList.remove('recording');
        buttons.record.classList.remove('hidden');
        buttons.stop.classList.add('hidden');
    };
    
    recognition.onresult = (event) => {
        const language = AppState.currentLanguage;
        const inputElement = getInputForLanguage(language);
        const transcript = event.results[0][0].transcript.trim().replace(/\.+$/, '').trim();
        const buttons = getRecordingButtons(language);

        inputElement.value = transcript;
        
        updateStatus(language, 'success', 'Transcription complete');
        inputElement.parentElement.classList.remove('recording');
        
        buttons.record.classList.remove('hidden');
        buttons.stop.classList.add('hidden');
        
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
        const inputElement = getInputForLanguage(language);
        
        inputElement.parentElement.classList.add('recording');
        updateStatus(language, 'recording', 'Recording... Speak now');
        
        const buttons = getRecordingButtons(language);
        buttons.record.classList.add('hidden');
        buttons.stop.classList.remove('hidden');
        
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
        
        const inputElement = getInputForLanguage(language);
        
        inputElement.parentElement.classList.remove('recording');
        updateStatus(language, '', '');
        
        const buttons = getRecordingButtons(language);
        buttons.record.classList.remove('hidden');
        buttons.stop.classList.add('hidden');
        
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
        getInputForLanguage('german').value = correctedText;
    } else {
        getInputForLanguage('english').value = correctedText;
    }
    
    updateStatus(currentCorrectionLanguage, 'success', 'Correction applied');
    closeCorrectionModal();
    showToast('Correction applied successfully!', 'success');
}

// ===== Status Updates =====
function updateStatus(language, type = '', message = '') {
    const statusElement = getStatusForLanguage(language);
    
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
    const leftText = elements.germanInput.value.trim();
    const rightText = elements.englishInput.value.trim();
    const service = elements.translationService?.value || 'local';
    
    let sourceLang, targetLang, textToTranslate;
    
    if (leftText && !rightText) {
        sourceLang = getLanguageForSlot('german').toUpperCase();
        targetLang = sourceLang === 'DE' ? 'EN' : 'DE';
        textToTranslate = leftText;
    } else if (rightText && !leftText) {
        sourceLang = getLanguageForSlot('english').toUpperCase();
        targetLang = sourceLang === 'DE' ? 'EN' : 'DE';
        textToTranslate = rightText;
    } else if (leftText && rightText) {
        const leftLanguage = getLanguageForSlot('german');
        const choice = confirm(`Both fields have text. Translate ${leftLanguage === 'de' ? 'German to English' : 'English to German'}? (Click OK for the left field, Cancel for the right field)`);
        if (choice) {
            sourceLang = leftLanguage.toUpperCase();
            textToTranslate = leftText;
        } else {
            sourceLang = getLanguageForSlot('english').toUpperCase();
            textToTranslate = rightText;
        }
        targetLang = sourceLang === 'DE' ? 'EN' : 'DE';
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
        
        if (service === 'local') {
            translation = await translateWithLocalDictionary(textToTranslate, sourceLang, targetLang);
        } else if (service === 'vokabelheft-ai' || service === 'mistral') {
            translation = await translateWithVokabelheftAI(textToTranslate, sourceLang, targetLang);
        } else if (service === 'deepl') {
            translation = await translateWithDeepL(textToTranslate, sourceLang, targetLang);
        } else if (service === 'google') {
            translation = await translateWithGoogle(textToTranslate, sourceLang, targetLang);
        } else if (service === 'bing') {
            translation = await translateWithBing(textToTranslate, sourceLang, targetLang);
        } else {
            throw new Error(`Unknown translation service: ${service}`);
        }
        
        if (translation) {
            const targetLanguage = targetLang === 'EN' ? 'english' : 'german';
            getInputForLanguage(targetLanguage).value = translation;
            updateStatus(targetLanguage, 'success', 'Translation complete');
            showToast('Translation completed!', 'success');
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

// ===== Swap Functionality =====
function swapInputs() {
    const temp = elements.germanInput.value;
    elements.germanInput.value = elements.englishInput.value;
    elements.englishInput.value = temp;
    
    // Swap status
    const germanStatus = elements.germanStatus.textContent;
    const englishStatus = elements.englishStatus.textContent;
    const germanStatusClass = elements.germanStatus.className;
    const englishStatusClass = elements.englishStatus.className;
    elements.germanStatus.textContent = englishStatus;
    elements.englishStatus.textContent = germanStatus;
    elements.germanStatus.className = englishStatusClass;
    elements.englishStatus.className = germanStatusClass;
    AppState.languagesSwapped = !AppState.languagesSwapped;
    updateLanguageDirectionUI();
    showToast(AppState.language === 'de' ? 'Sprachen getauscht.' : 'Languages switched.', 'info');
}

// ===== Vocabulary Management =====
function addToVocabulary() {
    const germanText = getInputForLanguage('german').value.trim();
    const englishText = getInputForLanguage('english').value.trim();
    
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
    
    updateVocabularyCount();
    if (AppState.activePage === 'settings') renderSettingsList();
    
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
                <button class="action-btn search" onclick="searchVocabularyEntry(${item.id})" title="${ui('searchAction')}">
                    <span>🔎</span> ${ui('searchAction')}
                </button>
                <button class="action-btn edit" onclick="editVocabularyEntry(${item.id})" title="${ui('edit')}">
                    <span>✏️</span> ${ui('edit')}
                </button>
                <button class="action-btn delete" onclick="deleteVocabularyEntry(${item.id})" title="${ui('deleteAction')}">
                    <span>🗑️</span> ${ui('deleteAction')}
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
        getInputForLanguage('german').value = entry.german;
        runInlineTranslation('de', false);
    } else if (entry.english && entry.english.trim()) {
        getInputForLanguage('english').value = entry.english;
        runInlineTranslation('en', false);
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

function translateFromVocabularyOrGoogle(text, sourceLang) {
    const cleanText = (text || '').trim();
    if (!cleanText) {
        showToast('Please enter text to translate', 'warning');
        return null;
    }
    const targetField = sourceLang === 'de'
        ? getInputForLanguage('english')
        : getInputForLanguage('german');
    const result = lookupTranslateFromVocabulary(cleanText, sourceLang);

    if (result !== null) {
        targetField.value = result;
        return result;
    }

    return runInlineTranslation(sourceLang, false);
}

function editVocabularyEntry(id) {
    const entry = AppState.vocabulary.find(item => item.id === id);
    if (!entry) return;
    
    // Fill inputs with entry data
    getInputForLanguage('german').value = entry.german || '';
    getInputForLanguage('english').value = entry.english || '';
    
    // Remove old entry
    deleteVocabularyEntry(id, false);
    
    // Focus on the empty field if there is one, otherwise focus on German
    if (!entry.german && entry.english) {
        getInputForLanguage('german').focus();
        showToast(t('toastEditEnglish'), 'info');
    } else if (!entry.english && entry.german) {
        getInputForLanguage('english').focus();
        showToast(t('toastEditGerman'), 'info');
    } else {
        getInputForLanguage('german').focus();
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
    
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = icons[type] || 'ℹ️';
    const messageElement = document.createElement('span');
    messageElement.className = 'toast-message';
    messageElement.textContent = String(message);
    const closeButton = document.createElement('button');
    closeButton.className = 'toast-close';
    closeButton.type = 'button';
    closeButton.textContent = '×';
    toast.append(icon, messageElement, closeButton);
    
    elements.toastContainer.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideIn 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
    
    // Close button
    closeButton.addEventListener('click', () => {
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

function showAppPage(page, focusHeading = true) {
    const pageElement = document.querySelector(`[data-page="${page}"]`);
    if (!pageElement) return;

    AppState.activePage = page;
    document.querySelectorAll('.page-view').forEach(view => {
        view.hidden = view !== pageElement;
    });
    document.querySelectorAll('[data-page-link]').forEach(link => {
        const active = link.dataset.pageLink === page;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });

    const title = document.getElementById('currentPageTitle');
    if (title) title.textContent = page === 'settings' ? ui('settingsNav') : ui('vocabularyNav');

    if (page === 'settings') {
        Object.entries(apiKeyInputIds).forEach(([provider, inputId]) => {
            const input = document.getElementById(inputId);
            if (input) input.value = AppState.apiKeys[provider];
        });
        renderSettingsList();
    }

    if (focusHeading) {
        const heading = pageElement.querySelector('h1');
        if (heading) heading.focus({ preventScroll: true });
    }
}

const apiKeyStorageKey = 'vokabelheft_api_keys';
const apiKeyInputIds = {
    deepl: 'deeplApiKeyInput',
    google: 'googleApiKeyInput',
    bing: 'bingApiKeyInput',
    mistral: 'mistralApiKeyInput'
};

function loadApiKeys() {
    try {
        const savedKeys = localStorage.getItem(apiKeyStorageKey);
        if (!savedKeys) return;

        const parsedKeys = JSON.parse(savedKeys);
        Object.keys(apiKeyInputIds).forEach(provider => {
            const key = parsedKeys[provider];
            if (typeof key === 'string') AppState.apiKeys[provider] = key;
        });
    } catch (error) {
        console.error('Could not load saved API keys:', error);
        showToast('Saved API keys could not be loaded from this browser.', 'error');
    }
}

function saveApiKey(provider) {
    const inputId = apiKeyInputIds[provider];
    const input = inputId && document.getElementById(inputId);
    if (!input) {
        showToast(AppState.language === 'de' ? 'Unbekannter Übersetzungsdienst.' : 'Unknown translation service.', 'error');
        return;
    }

    const key = input.value.trim();
    const updatedKeys = { ...AppState.apiKeys, [provider]: key };
    try {
        localStorage.setItem(apiKeyStorageKey, JSON.stringify(updatedKeys));
    } catch (error) {
        console.error('Could not save API key:', error);
        showToast(AppState.language === 'de'
            ? 'Der API-Schlüssel konnte in diesem Browser nicht gespeichert werden.'
            : 'API key could not be saved in this browser.', 'error');
        return;
    }

    AppState.apiKeys[provider] = key;
    showToast(AppState.language === 'de'
        ? `${provider}-API-Schlüssel wurde in diesem Browser gespeichert.`
        : `${provider} API key saved in this browser.`, 'success');
}

function renderSettingsList() {
    const tbody = document.getElementById('settingsVocabBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (AppState.vocabulary.length === 0) {
        tbody.innerHTML = `<tr><td class="no-entries" colspan="3">${ui('noEntriesShort')}</td></tr>`;
        return;
    }
    AppState.vocabulary.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input data-id="${item.id}" class="settings-german" value="${escapeHtml(item.german || '')}" aria-label="${ui('germanWord')}" /></td>
            <td><input data-id="${item.id}" class="settings-english" value="${escapeHtml(item.english || '')}" aria-label="${ui('englishWord')}" /></td>
            <td>
                <button class="btn btn-secondary" data-action="save" data-id="${item.id}" type="button">${ui('save')}</button>
                <button class="action-btn delete" data-action="delete" data-id="${item.id}" type="button">${ui('delete')}</button>
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
            if (!entry || !germanInput || !englishInput) return;
            entry.german = germanInput.value.trim();
            entry.english = englishInput.value.trim();
            saveVocabularyToStorage();
            renderVocabulary();
            showToast(AppState.language === 'de' ? 'Eintrag aktualisiert.' : 'Entry updated.', 'success');
        });
    });

    tbody.querySelectorAll('button[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            deleteVocabularyEntry(id, true);
        });
    });
}

function settingsAddEntry() {
    const g = document.getElementById('settingsGermanInput').value.trim();
    const e = document.getElementById('settingsEnglishInput').value.trim();
    if (!g && !e) {
        showToast(AppState.language === 'de'
            ? 'Bitte gib einen deutschen oder englischen Text ein.'
            : 'Please enter German or English text.', 'warning');
        return;
    }
    AppState.vocabulary.push({ id: Date.now(), german: g, english: e, createdAt: new Date().toISOString() });
    saveVocabularyToStorage();
    renderVocabulary();
    document.getElementById('settingsGermanInput').value = '';
    document.getElementById('settingsEnglishInput').value = '';
    showToast(AppState.language === 'de' ? 'Eintrag hinzugefügt.' : 'Entry added.', 'success');
}

document.addEventListener('click', (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target) return;
    const pageLink = target.closest('[data-page-link]');
    if (pageLink) showAppPage(pageLink.dataset.pageLink);
    if (target.closest('#settingsAddBtn')) settingsAddEntry();
    const saveKeyButton = target.closest('[data-save-api-key]');
    if (saveKeyButton) saveApiKey(saveKeyButton.dataset.saveApiKey);
});

async function postTranslationRequest(provider, payload) {
    if (provider !== 'local' && AppState.apiKeys[provider]) {
        payload.api_key = AppState.apiKeys[provider];
    }
    const response = await fetch(`/api/translate/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success === false) {
        const message = data.details ? `${data.error}: ${data.details}` : data.error;
        throw new Error(message || `${provider} translation failed`);
    }
    if (typeof data.translation !== 'string' || !data.translation.trim()) {
        throw new Error(`${provider} returned no translation`);
    }
    return data.translation;
}

async function translateWithLocalDictionary(text, sourceLang, targetLang) {
    return postTranslationRequest('local', {
        text: text.trim(),
        source_lang: sourceLang,
        target_lang: targetLang
    });
}

async function translateWithDeepL(text, sourceLang, targetLang) {
    return postTranslationRequest('deepl', {
        text,
        source_lang: sourceLang.toUpperCase(),
        target_lang: targetLang.toUpperCase()
    });
}

async function translateWithGoogle(text, sourceLang, targetLang) {
    return postTranslationRequest('google', {
        text,
        source: sourceLang.toLowerCase(),
        target: targetLang.toLowerCase()
    });
}

async function translateWithBing(text, sourceLang, targetLang) {
    return postTranslationRequest('bing', {
        text,
        from: sourceLang.toLowerCase(),
        to: targetLang.toLowerCase()
    });
}

async function translateWithVokabelheftAI(text, sourceLang, targetLang) {
    return postTranslationRequest('mistral', {
        text,
        source_lang: sourceLang.toUpperCase(),
        target_lang: targetLang.toUpperCase()
    });
}

async function runProviderTranslate(provider, sourceLang) {
    const isGerman = sourceLang === 'de';
    const input = getInputForLanguage(sourceLang);
    const target = getInputForLanguage(isGerman ? 'english' : 'german');
    const text = input.value.trim();
    if (!text) {
        showToast(isGerman ? 'No German text' : 'No English text', 'warning');
        return;
    }

    const providers = {
        deepl: translateWithDeepL,
        google: translateWithGoogle,
        bing: translateWithBing,
        mistral: translateWithVokabelheftAI
    };
    showLoading('Translating...');
    try {
        target.value = await providers[provider](text, sourceLang, isGerman ? 'en' : 'de');
        showToast(`${provider} translation completed.`, 'success');
    } catch (error) {
        console.error(`${provider} translation error:`, error);
        showToast(error.message, 'error');
    } finally {
        hideLoading();
    }
}

async function runInlineTranslation(sourceLang, checkVocabularyFirst) {
    const isGerman = sourceLang === 'de';
    const input = getInputForLanguage(sourceLang);
    const target = getInputForLanguage(isGerman ? 'english' : 'german');
    const text = input.value.trim();
    if (!text) {
        showToast(isGerman ? 'No German text' : 'No English text', 'warning');
        return;
    }

    if (checkVocabularyFirst) {
        const knownTranslation = lookupTranslateFromVocabulary(text, sourceLang);
        if (knownTranslation) {
            target.value = knownTranslation;
            return;
        }
    }

    showLoading('Searching local dictionary...');
    try {
        target.value = await translateWithLocalDictionary(text, sourceLang, isGerman ? 'en' : 'de');
        showToast('Local dictionary search completed.', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        hideLoading();
    }
}