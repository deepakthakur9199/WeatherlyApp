import React, { useState } from 'react';
import { Key, CheckCircle, XCircle, Loader2, ExternalLink } from 'lucide-react';

const ApiKeyTester = ({ onApiKeyValid }) => {
  const [apiKey, setApiKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState(null);

  const testApiKey = async () => {
    if (!apiKey.trim()) {
      setResult({ success: false, message: 'Please enter an API key' });
      return;
    }

    setTesting(true);
    setResult(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey.trim()}&q=London&aqi=no`
      );
      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: `✅ API Key is valid! Weather data for ${data.location.name}, ${data.location.country}: ${Math.round(data.current.temp_c)}°C, ${data.current.condition.text}`
        });
        if (onApiKeyValid) {
          onApiKeyValid(apiKey.trim());
        }
      } else {
        let errorMessage = `❌ API Key test failed`;
        if (data.error) {
          errorMessage += `: ${data.error.message}`;
          if (data.error.code === 2006) {
            errorMessage += '\n\nThis API key is invalid. Please check your WeatherAPI.com dashboard.';
          } else if (data.error.code === 2007) {
            errorMessage += '\n\nAPI key quota exceeded. Please check your account limits.';
          }
        }
        setResult({ success: false, message: errorMessage });
      }
    } catch (error) {
      setResult({
        success: false,
        message: `❌ Network error: ${error.message}`
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Key className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">API Key Configuration</h2>
        <p className="text-white/80">
          Test or update your WeatherAPI.com API key
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="bg-white/5 rounded-2xl p-4">
          <h3 className="text-white font-semibold mb-2">How to get your API key:</h3>
          <ol className="text-white/80 text-sm space-y-1 list-decimal list-inside">
            <li>
              Visit{' '}
              <a
                href="https://www.weatherapi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline inline-flex items-center gap-1"
              >
                WeatherAPI.com
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>Sign up for a free account</li>
            <li>Go to your dashboard and copy your API key</li>
            <li>Paste it below to test</li>
          </ol>
        </div>

        <div>
          <label htmlFor="apiKey" className="block text-white font-medium mb-2">
            Enter your WeatherAPI key:
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your WeatherAPI.com API key here..."
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={testing}
          />
        </div>

        <button
          onClick={testApiKey}
          disabled={testing || !apiKey.trim()}
          className="w-full bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-gray-500/20 disabled:cursor-not-allowed border border-blue-500/30 rounded-xl py-3 text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
        >
          {testing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Testing API Key...
            </>
          ) : (
            <>
              <Key className="w-5 h-5" />
              Test API Key
            </>
          )}
        </button>
      </div>

      {result && (
        <div
          className={`p-4 rounded-xl border ${
            result.success
              ? 'bg-green-500/10 border-green-500/30 text-green-100'
              : 'bg-red-500/10 border-red-500/30 text-red-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p className="text-sm whitespace-pre-line">{result.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyTester;