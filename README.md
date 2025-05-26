# Mostr

Smart Moderation for the Nostr Protocol.

---

## ✨ Features

* ✅ **Event Classification Engine**
  Categorize events as `SAFE`, `WARNING`, or `HARMFUL` with detailed labels like `SPAM`, `INFORMATIVE`, `OFFENSIVE`, and more.

* 🤖 **AI-Powered Moderation**
  Use LLMs or custom rules to assess content safety, language, sentiment, or compliance.

* 🔧 **Extensible Prompt System**
  Build structured prompts dynamically for use with OpenAI, Anthropic, or local models.

* 🧠 **Pluggable Analysis Modules**
  Easily integrate NLP tools, toxicity scoring, or language detection.

* 🌐 **Relay + Client Friendly**
  Works with relays for moderation pipelines, or clients for in-app safety.

---

## 🛠️ Installation

```bash
git clone https://github.com/ZigBalthazar/mostr.git
cd mostr
npm install
```

---

## 🚀 Usage

 <!-- TODO ::: -->

---

## 📖 Labels & Statuses

**Statuses:**

* `SAFE`
* `WARNING`
* `HARMFUL`

**Labels:**

```json
[
  "OK", "INFORMATIVE", "FRIENDLY", "OFFENSIVE", "SPAM", "MISLEADING",
  "SENSITIVE", "PROFANITY", "HATEFUL", "VIOLENT", "SEXUAL", "SELF_HARM",
  "DANGEROUS", "NSFW", "AI_GENERATED", "UNVERIFIED", "LANGUAGE_UNKNOWN"
]
```

---

## 📚 Roadmap

* [ ] Language detection integration
* [ ] Local model support (e.g., Ollama, Llama.cpp)
* [ ] NIP-75 moderation guidelines
* [ ] Real-time webhook + relay middleware
* [ ] DVM

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests.

---

## 📄 License

MIT
