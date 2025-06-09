import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import ResponseDisplay from './ResponseDisplay';
import Spinner from './Spinner';
import Toast from './Toast';
import SearchHistory from './SearchHistory';
import AdvancedFilters from './AdvancedFilters';
import SearchResults from './SearchResults';

function App() {
  const translations = {
    en: {
      response: 'Response',
      placeholder: 'Ask something...',
      search: 'Search',
      clear: 'Clear',
      copy: 'Copy',
      clearHistory: 'Clear History',
      emptyQuery: '⚠️ Please enter a query before searching',
      themeLight: 'Light',
      themeDark: 'Dark',
    },
    ar: {
      response: 'الإجابة',
      placeholder: 'اسأل شيئًا...',
      search: 'بحث',
      clear: 'مسح',
      copy: 'نسخ',
      clearHistory: 'مسح السجل',
      emptyQuery: '⚠️ الرجاء كتابة استعلام قبل البحث',
      themeLight: 'فاتح',
      themeDark: 'داكن',
    },
    pl: {
      response: 'Odpowiedź',
      placeholder: 'Zadaj pytanie...',
      search: 'Szukaj',
      clear: 'Wyczyść',
      copy: 'Kopiuj',
      clearHistory: 'Wyczyść historię',
      emptyQuery: '⚠️ Wprowadź zapytanie przed wyszukiwaniem',
      themeLight: 'Jasny',
      themeDark: 'Ciemny',
    }
  };

  const languageNames = {
    all: 'All Languages (Auto)',
    en: 'English',
    pl: 'Polski',
    ar: 'العربية',
  };

  const supportedLangs = Object.keys(translations);

  const getDefaultLang = () => {
    const browserLang = navigator.language.split('-')[0];
    return supportedLangs.includes(browserLang) ? browserLang : 'en';
  };

  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('lang') || 'all');
  const lang = selectedLang === 'all' ? getDefaultLang() : selectedLang;
  const [theme, setTheme] = useState('light');
  const [response, setResponse] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(null);
  const [results, setResults] = useState([]); // ⬅️ نتائج البحث الكاملة
  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem('lang', selectedLang);
  }, [selectedLang]);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark transition' : 'transition';
    inputRef.current?.focus();
  }, [theme]);

  const t = translations[lang];

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setToastMessage(t.emptyQuery);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    setLoading(true);
    setResponse('');
    setDisplayedText('');
    setUploadedFileName('');
    setResults([]);

    try {
      const res = await fetch(`http://localhost:8000/search/api_search?q=${encodeURIComponent(query)}&lang=${lang}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
        setHistory((prev) => [query, ...prev.filter((item) => item !== query)]);
      } else {
        setResults([]);
        setResponse('❌ لا توجد نتائج');
      }
    } catch {
      setResults([]);
      setResponse('❌ حدث خطأ أثناء الاتصال بـ Django');
    }

    setLoading(false);
  };

  const handleInputClear = () => {
    setResponse('');
    setDisplayedText('');
    setUploadedFileName('');
    setResults([]);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    setUploadedFileName(file.name);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData
      });
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    let i = 0;
    if (!loading && response) {
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + response[i]);
        i++;
        if (i >= response.length) clearInterval(timer);
      }, 30);
      return () => clearInterval(timer);
    }
  }, [response, loading]);

  return (
    <div className="container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <img src="./neuro-logo.svg" alt="NeuroDoc Logo" className="logo" />

      <div className="top-controls">
        <div className="selector-group">
          <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className="button">
            <option value="all">All Languages (Auto)</option>
            {supportedLangs.map((code) => (
              <option key={code} value={code}>
                {languageNames[code] || code.toUpperCase()}
              </option>
            ))}
          </select>

          <select value={theme} onChange={(e) => setTheme(e.target.value)} className="button">
            <option value="light">{t.themeLight}</option>
            <option value="dark">{t.themeDark}</option>
          </select>
        </div>

        <SearchBar
          onSearch={(query) => handleSearch(query)}
          onClear={handleInputClear}
          onFileUpload={handleFileUpload}
          placeholder={t.placeholder}
          searchLabel={t.search}
          clearLabel={t.clear}
          inputRef={inputRef}
          lang={lang}
          onToggleFilters={() => setShowFilters(prev => !prev)}
        />
      </div>

      <AdvancedFilters
        visible={showFilters}
        onSearch={(f) => {
          setFilters(f);
          if (inputRef.current?.value) {
            handleSearch(inputRef.current.value);
          }
        }}
      />

      <SearchHistory
        items={history}
        onSelect={(q) => handleSearch(q)}
        onRemove={(item) => setHistory(history.filter(i => i !== item))}
      />

      {loading ? (
        <Spinner />
      ) : results.length > 0 ? (
        <SearchResults results={results} />
      ) : (
        <ResponseDisplay response={displayedText} label={t.response} />
      )}

      {uploadedFileName && !loading && (
        <div className="file-name">📄 Uploaded File: {uploadedFileName}</div>
      )}

      <div className="button-group horizontal">
        <button
          type="button"
          onClick={() => {
            const text = document.getElementById('response-box')?.innerText;
            if (text) navigator.clipboard.writeText(text);
          }}
          className="button copy"
        >
          {t.copy}
        </button>
        <button onClick={() => setHistory([])} className="button clear">
          {t.clearHistory}
        </button>
      </div>

      <Toast message={toastMessage} visible={showToast} />
    </div>
  );
}

export default App;
